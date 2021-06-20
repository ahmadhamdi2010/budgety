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