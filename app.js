var UIController = (function(){

    var DOMStrings = {
        typeField : '.add__type',
        descriptionField : '.add__description',
        valueField : '.add__value',
        addBtn : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list',
        budgetVal : '.budget__value',
        incomeVal : '.budget__income--value',
        expenseVal : '.budget__expenses--value',
        expensePercent : '.budget__expenses--percentage',
        container : '.container',
        percentLabel : '.item__percentage'
    }

    return {
        getInput : function(){

            return {
                type : document.querySelector(DOMStrings.typeField).value,
                description : document.querySelector(DOMStrings.descriptionField).value,
                value : parseFloat(document.querySelector(DOMStrings.valueField).value) 
            }
            
    
        },
        listItemAdder : function(obj,type){
            var html, newHtml, element;

            if (type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }else if(type === 'inc'){

                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml)

        },
        fieldsClear : function(){

            var fields = document.querySelectorAll(DOMStrings.valueField + ', ' + DOMStrings.descriptionField);

            var fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(field => {
                field.value = '';
            });

            fieldsArray[0].focus();

        },
        deleteItem: function(id){
            console.log('#' + id);
            document.querySelector('#' + id).remove();
        
        },
        displayBudget : function(obj){

            document.querySelector(DOMStrings.budgetVal).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeVal).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseVal).textContent = obj.totalExp;
            document.querySelector(DOMStrings.expensePercent).textContent = obj.percentage + '%';


        },
        displayPercent: function(allPercents){
            var html = document.querySelectorAll(DOMStrings.percentLabel);

            listForEach = function ( list, callBack){
                for (let i = 0; i < list.length; i++) {
                    callBack(list[i], i);
                    
                }
            }

            listForEach(html, function (current, index){

                if(allPercents[index]>0){
                    current.textContent = allPercents[index] + '%';
                }else {
                    current.textContent = '-';

                }
            });
        },

        getDOMStrings : function(){
            return DOMStrings;
        }
    };


})();

var budgetController = (function(){

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calcTotal = function(type){
        var sum = 0;

        data.allItem[type].forEach(item => {
            sum = item.value + sum;
        });
        data.totals[type]= sum ; 
    }

    var data = {
        allItem :{
            exp :[],
            inc :[]
        },
        totals:{
            exp :0,
            inc :0
        },
        budget:0,
        percentage:-1
    }
    Expense.prototype.calcPercent = function(totalIncome){

        if(totalIncome>0){
            this.percentage = Math.round((this.value / totalIncome)*100);
        }else{
            this.percentage = -1;

        }
    }

    Expense.prototype.getPercent = function(){
        return this.percentage;
    }
    return {
        addItem : function(type,desc,value){
            
            var newItem, ID;


            if(data.allItem[type].length > 0 ){
                ID = data.allItem[type][data.allItem[type].length -1].id + 1;
            }else{
                ID=0;
            }
        

            

            if(type==='exp'){

                newItem = new Expense(ID,desc,value);

            }else if(type==='inc'){

                newItem = new Income(ID,desc,value);

            }

            data.allItem[type].push(newItem);
            return newItem;
        },
        calcBudget : function(){
            calcTotal('exp');
            calcTotal('inc');
            data.budget = data.totals.inc-data.totals.exp;
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc )* 100);
            }else{
                data.percentage = -1;
            }
        },
        calcPercentage : function(){
            
            data.allItem.exp.forEach(item => {
                item.calcPercent(data.totals.inc);
            });
        },
        getPercentages: function(){
            
            var allPercent = data.allItem.exp.map(function(currentItem){

                return currentItem.getPercent();

            });

            return allPercent;

        },
        getBudget : function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        deleteItem: function(type,theId){
            
            console.log('got to the BC delete function')

            var allIds = []

            data.allItem[type].forEach(item => {
                allIds.push(item.id)
            });
            
            // var ids = data.allItem[type].map(function(current){
            //     return current.inId;
            // });

            console.log(' theId is ' + theId + ' all Ids is ' + allIds + ' the type is ' + type )

            var index = allIds.indexOf(theId);

            console.log('the index is ' + index)

            if (index !== -1){
                data.allItem[type].splice(index, 1);
            }
        },
        testing: function(){
            console.log(data);
        }
    }

})();

var controller = (function(UICtrl,budgetCtrl){


    var eventListenerSetup = function(){

        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.addBtn).addEventListener('click',addItem);

        document.addEventListener('keypress',function(event){
            if(event.key=='Enter'){
                addItem();
            };
        });

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

    }

    var updateBudget = function(){
        budgetController.calcBudget();
        var budgetData = budgetController.getBudget();
        UIController.displayBudget(budgetData);
    }

    var updatePercentages = function(){

        budgetController.calcPercentage();
        var percentages = budgetController.getPercentages()
        console.log(percentages);

        UIController.displayPercent(percentages);



    };

    var addItem = function(){

        // get the inout data

        var inputData = UICtrl.getInput();
        console.log(inputData);

        if(inputData.value !== 0 && !isNaN(inputData.value)){

             //add the item to budget controller 
            var addedItem = budgetController.addItem(inputData.type,inputData.description,inputData.value);
            //add the item to ui 

            UICtrl.listItemAdder(addedItem , inputData.type);

            UIController.fieldsClear();


            // calculate and Update the budget 
            updateBudget();

            updatePercentages();
        }


    };

    var ctrlDeleteItem = function(event){
        var fullId = event.path[4].id
        console.log(fullId);
        var splitData = fullId.split('-');
        console.log(splitData);
        var type = splitData[0];
        var id = parseInt(splitData[1]);

        budgetController.deleteItem(type,id);

        UIController.deleteItem(fullId);
        updateBudget();

        updatePercentages();
    };

    return {
        init : function(){
            console.log('the app has been initialized !');
            eventListenerSetup();
            UIController.displayBudget({
                
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    };

    
    

})(UIController,budgetController);

controller.init();