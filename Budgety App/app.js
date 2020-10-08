// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var budgetData = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type) {
        var sum = 0;

        budgetData.allItems[type].forEach(function(current, index, array) {
            sum += current.value;
        });

        budgetData.totals[type] = sum;
    };

    return {
        addItem: function(type, desc, val) {
            
            var newItem;
            var ID;

            // Create new ID based on ID of last ID of same type
            if (budgetData.allItems[type].length > 0)
                ID = budgetData.allItems[type][budgetData.allItems[type].length - 1].id + 1;
            else
                ID = 0;

            // Create a new item based on the type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            // Push the new item to the array of the correct type
            budgetData.allItems[type].push(newItem);

            // Return the new item
            return newItem;
        },

        calculateBudget: function() {

            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate the budget: income - expenses
            budgetData.budget = budgetData.totals.inc - budgetData.totals.exp;

            // Calculate the percentage of income spent
            if (budgetData.totals.inc > 0) {
                budgetData.percentage = Math.round((budgetData.totals.exp / budgetData.totals.inc) * 100);
            } else {
                budgetData.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: budgetData.budget,
                totalInc: budgetData.totals.inc,
                totalExp: budgetData.totals.exp,
                percentage: budgetData.percentage
            };
        }
    };

})();


// UI CONTROLLER
var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // Will be "inc" for income or "exp" for expense
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        getDOMStrings: function() {
            return DOMStrings;
        },

        addListItem: function(item, type) {

            var html, newHtml, element;

            // Create HTML string with placeholder text

            if (type === 'inc') {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace placeholder text with some actual data
            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%description%', item.description);
            newHtml = newHtml.replace('%value%', item.value);

            // Insert the HTML into the DOM

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
            } else if (type === 'exp') {
                element = DOMStrings.expenseContainer;
            }

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function() {
            var fields, fieldsArray;

            fields  = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue); 

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
            
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---'
            }
        }
    }

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtlr, UICtlr) {

    var setupEventListeners = function() {
        var DOM = UICtlr.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if(event.key === 'Enter') {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {
        var budget;

        // 1. Calculate budget
        budgetCtlr.calculateBudget();

        // 2. Return the budget
        budget = budgetCtlr.getBudget();

        // 3. Display budget on the UI
        UICtlr.displayBudget(budget);
    };


    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UICtlr.getInput(); 

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add item to budget controller
            newItem = budgetCtlr.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtlr.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtlr.clearFields();

            // 5. Update budget
            updateBudget();
        }

    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
            UICtlr.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
        }
    };



})(budgetController, UIController);

controller.init();