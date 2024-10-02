

// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){

})(); 


// Санхүүтэй ажиллах контроллер
var financeController = (function(){

})(); 


// Програмд холбогч котроллер
var appController = (function(){

    var ctrlAddItem = function(){
        console.log("enter");
    };

    document.querySelector('.add__btn').addEventListener('click', function(){
        // оруулах өгөгдөлийг олж авах
        ctrlAddItem();
        // олж авсан өгөгдөлөө санхүүгийн конироллер дамжуулна

        // олж авсан өгөгдөлийг веб дээрх тохирох хэсэгт гаргана

        // эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.

    })

    document.addEventListener('keypress', function(event){
        if(event.keyCode == 13){
            ctrlAddItem();
        }
    })
})(uiController, financeController); 