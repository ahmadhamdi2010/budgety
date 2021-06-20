var UIController = (function(){


    


})();

var budgetController = (function(){

    

})();

var controller = (function(UICtrl,budgetCtrl){

    var addItem = function(){

        // get the inout data
        //add the item to budget controller 
        //add the item to ui 
        // calculate the budget 
        // display budget on UI 

    }

    document.querySelector('.add__btn').addEventListener('click',addItem);
    
    document.addEventListener('keypress',function(event){
        if(event.key=='Enter'){
            addItem();
        };
    });

})(UIController,budgetController);