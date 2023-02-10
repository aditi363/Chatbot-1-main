const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("Welcoming"),
    MENU:   Symbol("Menu"),
    ITEM1:   Symbol("Item1"),
    ITEM2:  Symbol("Item2"),
    YOGURT:  Symbol("Yogurt")
});

module.exports = class CuisineOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sMenu = "";
        this.sItem1 = "";
        this.sItem2 = "";
        this.sYogurt = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.MENU;
                aReturn.push("Welcome to Punjabi Dhaba");
                aReturn.push("Would you like Parantha or Saag? ");
                
                this.stateCur = OrderState.MENU;           
                break;

        case OrderState.MENU:    
                this.sMenu = sInput; 
                if(this.sMenu== "Parantha")
                {
                    this.rate +=30;
                    aReturn.push("Which Parantha would you like Aaloo or Gobhi ?");
                    this.stateCur = OrderState.ITEM1;    
                }
                else if(this.sMenu== "Saag")
                {
                    this.rate +=22;
                    this.stateCur = OrderState.ITEM2;
                    aReturn.push("Would you like Makki Tortila or Roti?");      
                }
                else if(this.sMenu!= "Makki Tortila" && "Roti")
                {  
                    aReturn.push("Please enter valid input");  
                }      
                break;

        case OrderState.ITEM1:
                this.sType = sInput;            
                if(this.sType!= "Aaloo" && this.sType!= "Gobhi")
                {
                    aReturn.push("Please enter Aaloo or Gobhi?");  
                }
                else
                { 
                    this.rate +=20;
                    aReturn.push("Would you like Yogurt?");
                    this.stateCur = OrderState.Yogurt;
                }
                break;
                case OrderState.ITEM2:
                    this.sType = sInput;            
                    if(this.sType!= "Makki Tortila" && this.sType!= "Roti")
                    {
                        aReturn.push("Please enter either Makki Tortila or Roti"); 
                         
                    }
                    else
                    { 
                        this.rate +=20;
                        aReturn.push("Would you like Yogurt?");
                        this.stateCur = OrderState.Yogurt;
                    }
                    break;


                case OrderState.sYogurt: 
                this.isDone(true);
 
                if(sInput= "Yes")
                {
                    this.rate += 5;
                    aReturn.push("Thank you for your order of");
                    aReturn.push(`${this.sMenu} ${this.sItem1} ${this.sItem2}`);
                    aReturn.push(`Yogurt ${this.sYogurt}`);
                    aReturn.push(`Total price: $ ${this.rate}`);
                    let dt = new Date(); 
                    dt.setMinutes(dt.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${dt.toTimeString()}`);
                }
                else
                {
                    aReturn.push("Thank-you for your order of");
                    aReturn.push(`${this.sMenu} ${this.sItem1} ${this.sItem2} `);
                    aReturn.push(`Total price: $ ${this.rate}`);
                    let dt = new Date(); 
                    dt.setMinutes(dt.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${dt.toTimeString()}`);   
                }
                break;
        }
        return aReturn;
    }
    
    
}
