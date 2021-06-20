var UIController = (function(){

    var DOMStrings = {
        typeField : '.add__type',
        descriptionField : '.add__description',
        valueField : '.add__value',
        addBtn : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list'
    }

    return {
        getInput : function(){

            return {
                type : document.querySelector(DOMStrings.typeField).value,
                description : document.querySelector(DOMStrings.descriptionField).value,
                value : document.querySelector(DOMStrings.valueField).value
            }
            
    
        },
        listItemAdder : function(obj,type){
            var html, newHtml, element;

            if (type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }else if(type === 'inc'){

                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            newHtml = html.replace('%id%',obj.ID);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml)

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
    }
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItem :{
            exp :[],
            inc :[]
        },
        totals:{
            exp :0,
            inc :0
        }
    }

    return {
        addItem : function(type,desc,value){
            
            var newItem, ID;

            data.allItem[type].length===0 ? ID=0 : ID = data.allItem[type][data.allItem[type].length -1].id + 1;

            

            if(type==='exp'){

                newItem = new Expense(ID,desc,value);

            }else if(type==='inc'){

                newItem = new Income(ID,desc,value);

            }

            data.allItem[type].push(newItem);
            return newItem;
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

    }

    var addItem = function(){

        // get the inout data

        var inputData = UICtrl.getInput();
        console.log(inputData);

        //add the item to budget controller 
        var addedItem = budgetController.addItem(inputData.type,inputData.description,inputData.value);
        //add the item to ui 

        UICtrl.listItemAdder(addedItem , inputData.type);
        // calculate the budget 
        // display budget on UI 

    };

    return {
        init : function(){
            console.log('the app has been initialized !');
            eventListenerSetup();
        }
    };

    
    

})(UIController,budgetController);

controller.init();