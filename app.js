// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incList: '.income__list',
        expList: '.expenses__list',
    };

    return {
        getInput: function(){
            return{
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt( document.querySelector(DOMstrings.inputValue).value )
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        },

        clearFields: function(){
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            // Convert list to Array
            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el, index, Array) {
                el.value = "";
            });
            fieldsArr[0].focus();

            // for(var i = 0; i < fieldsArr.length; i++){
            //     fieldsArr[i].value = "";
            // }
            
        },




        addListItem: function(item, type){
            
            var html, art;
            if(type === "inc"){
                list = DOMstrings.incList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">+ $$VALUE$$<div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else{
                list = DOMstrings.expList;
                html = '<div class="item clearfix" id="expense-%id%"><divclass="item__description">$$DESCRIPTION$$</divclass=><div class="right clearfix"><div class="item__value">- $$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", item.value);

            document.querySelector(list).insertAdjacentHTML("beforeend", html);



        }
    };
})(); 


// Санхүүтэй ажиллах контроллер
var financeController = (function(){
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
    data.items[type].forEach(function(el){
        sum = sum + el.value;
    });

    data.totals[type] = sum;

    };

    var data = {
        items:{
            inc:[],
            exp:[],
        },
        totals: {
            inc: 0,
            exp: 0,
        },

        tusuv: 0,

        huvi: 0,
    };


    return {
        tusuvTootsooloh: function(){
            // Нийт орлогын нийлбэрийг тооцоолно
            calculateTotal("inc");

            // Нийт зарлагын нийлбэрийг тооцоолно
            calculateTotal("exp");

            // Төсөвийг шинээр тооцоолно
            data.tusuv = data.totals.inc - data.totals.exp;

            // Орлого зарлагын хувийг тооцоолно

            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);


        },

        tusviigAvah: function(){
            return{
                tusuv: data.tusuv,
                hivi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },



        addItem: function(type, desc, val){
            var item, id;

            // identification
            if(data.items[type].length === 0) id = 1;
               
            else{
                id = data.items[type][data.items[type].length - 1].id + 1;
            }


            if(type === "inc" ){
                item = new Income(id, desc, val);
            }
            else{
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;

        },
        seeData: function() {
            return data;
          }
    };
})(); 


// Програмд холбогч котроллер
var appController = (function(uiController, financeController){

    var ctrlAddItem = function(){

        // оруулах өгөгдөлийг олж авах
        var input = uiController.getInput();

        if (input.description !== "" && input.value !== ""){
             // олж авсан өгөгдөлөө санхүүгийн конироллер дамжуулна
             var item = financeController.addItem(
                input.type, 
                input.description, 
                input.value
            );
        
                
             // олж авсан өгөгдөлийг веб дээрх тохирох хэсэгт гаргана
             uiController.addListItem(item, input.type);
             uiController.clearFields();

             // эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
             financeController.tusuvTootsooloh();

             var tusuv = financeController.tusviigAvah();

            console.log(tusuv);


        }
};
        

    var setupEventlistener = function(){

        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
    
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13){
                ctrlAddItem();
            }
        });
    };

    return{
        init: function(){
            console.log("Application started...");
            setupEventlistener();
        }
    };
})(uiController, financeController); 


appController.init();