import axios from 'axios';
import * as config from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${config.proxy}https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15
    }

    calcServings() {
        this.servings = 4
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'pounds', 'pound', 'cups'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'lb', 'lb', 'cup', 'kg', 'g'];
        const newIngredients = this.ingredients.map(ingredient => {
            // 1. Uniform units
            let ingred = ingredient.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingred = ingred.replace(unit, unitsShort[i]);
            });

            // 2. Remove parentheses
            ingred = ingred.replace(/ *\([^)]*\) */g, " ")

            // 3. Parse into count, unit, and ingredient
            const ingredArray = ingred.split(' ');
            const unitIndex = ingredArray.findIndex(ingredElement => unitsShort.includes(ingredElement));

            let ingredObj;

            if (unitIndex > -1) {
                // There is a unit
                let count;
                const arrCount = ingredArray.slice(0, unitIndex); 
                // Ex. 4 1/2 cups, arrCount is ['4', '1/2']
                // Ex. 4 cups, arrCount is ['4']

                if (arrCount.length === 1) {
                    count = eval(ingredArray[0].replace('-', '+'));
                } else {
                    count = eval(ingredArray.slice(0, unitIndex).join('+'));
                }

                ingredObj = {
                    count,
                    unit: ingredArray[unitIndex],
                    ingredient: ingredArray.slice(unitIndex + 1).join(' ')
                };
            } else if (parseInt(ingredArray[0])) {
                // There is no unit, but a count
                ingredObj = {
                    count: parseInt(ingredArray[0]),
                    unit: '',
                    ingredient: ingredArray.slice(1).join(' ')
                };
            } else {
                // There is no unit and no number
                ingredObj = {
                    count: 1,
                    unit: '',
                    ingredient: ingred
                };
            }

            return ingredObj;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Update ingredients count
        this.ingredients.forEach(ingredient => ingredient.count *= (newServings/this.servings));

        this.servings = newServings;
    }
}