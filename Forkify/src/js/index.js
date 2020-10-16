import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import List from './models/List';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import Likes from './models/Likes';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {
};

// Search Controller

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();;  //TODO

    if (query) {
        // 2. Create new search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput(); // clears search field
        searchView.clearResults(); // clears recipes returned from previous search
        renderLoader(elements.searchResult);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            //console.log(state.search.result);
            searchView.renderResults(state.search.result);
            
        } catch(error) {
            alert('No recipes were found :(!');
        }
        clearLoader();
    }
};

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault(); // prevents page from automatically reloading
    controlSearch();
});


elements.searchResultsPages.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults(); // clears recipes returned from previous search
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * Recipe Controller
 */
const controlRecipe = async () => {

    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create a new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate time and servings
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Render the recipe
            clearLoader();
            if (!state.likes) state.likes = new Likes();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            console.log('Error processing recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * Ingredient List Controller
 */
const controlList = () => {
    // Create a new list if there is none yet
    if (!state.list) {
        state.list = new List();
    }

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(ingredient => {
        const item = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
        listView.renderItem(item);
    });
}

/**
 * Recipe Controller
 */

const controlLike = () => {
    // Create a new likes list if there is none yet

    const currentID = state.recipe.id;

    // User has not liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID, 
            state.recipe.title, 
            state.recipe.author, 
            state.recipe.img
        );


        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

    // User has liked current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }   
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// Handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *' )) {
        // Decrease button is clicked
        if (state.recipe.servings > 1)
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
    } else if (event.target.matches('.btn-increase, .btn-increase *' )) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.retrieveData();

    // Toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

// Handling delete and update list item events 
elements.shopping.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;
    // Handle delete button
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        // Handle count update
    } else if (event.target.matches('.shopping__count-value')) {
        const val = parseFloat(event.target.value, 10);
        state.list.updateCount(id, val);
    }
});
