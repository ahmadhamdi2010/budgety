var UIController = (function(){

    var DOMStrings = {
        typeField : '.add__type',
        descriptionField : '.add__description',
        valueField : '.add__value',
        addBtn : '.add__btn'
    }

    return {
        getInput : function(){

            return {
                type : document.querySelector(DOMStrings.typeField).value,
                description : document.querySelector(DOMStrings.descriptionField).value,
                value : document.querySelector(DOMStrings.valueField).value
            }
            
    
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
        budgetController.addItem(inputData.type,inputData.description,inputData.value);
        //add the item to ui 
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