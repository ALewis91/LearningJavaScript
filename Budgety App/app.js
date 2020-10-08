// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome * 100));
        } else {
            this.percentage = -1; 
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
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

        deleteItem: function (type, id) {

            var IDs = budgetData.allItems[type].map(function(current, index, array) {
                return current.id;
            });

            index = IDs.indexOf(id);

            // If the id was found in the array of IDs, remove the item at the index of the id
            if (index !== -1) {
                budgetData.allItems[type].splice(index, 1);
            }
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

        calculatePercentages: function() {

            budgetData.allItems['exp'].forEach(function(current) {
                current.calculatePercentage(budgetData.totals.inc);
            });
        },

        getPercentages: function() {
            var allPercentages = budgetData.allItems.exp.map(function(current) {
                return current.getPercentage();
            });
            return allPercentages;
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
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        var numSplit, integer, decimal, numCommas;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        integer = numSplit[0];
        decimal = numSplit[1];

        numCommas = Math.floor((integer.length - 1) / 3) ;
        num = "";

        for (var i = 0; i < numCommas; i++) {
            num = (',' + integer.substring(integer.length - ((i + 1) * 3),integer.length - (i * 3)) + num);
        }

        num = integer.substring(0, integer.length - numCommas * 3) + num;

        return (type === 'exp' ? '-' : '+') + ' ' + num + '.' + decimal;
    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace placeholder text with some actual data
            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%description%', item.description);
            newHtml = newHtml.replace('%value%', formatNumber(item.value, type));

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

        deleteListItem: function(selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },

        displayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget >= 0 ? 'inc' : 'exp');
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---'
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);


            nodeListForEach(fields, function(current, index) {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';           
                }
            });
        },

        displayDate: function() {
            
            var now, year, month, months;

            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;

        },

        changedType: function() {

            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' + 
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');

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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtlr.changedType)
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

    var updatePercentages = function() {

        // 1. CalculatePercentages
        budgetCtlr.calculatePercentages();

        // 2. Read percentages from the budget controller
        var percentages = budgetCtlr.getPercentages();

        // 3. Update UI with the new percentages
        UICtlr.displayPercentages(percentages);
    }

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

            // 6. Calculate and update percentages
            updatePercentages();
        }

    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            // Extract the item type and unique  ID from the DOM string
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the budget structure
            budgetCtlr.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UICtlr.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
    };

    return {
        init: function() {
            console.log('Application has started.');
            UICtlr.displayDate();
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