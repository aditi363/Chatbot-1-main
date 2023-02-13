const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("Welcoming"),
    PHONE: Symbol("PHONE"),
    MENU:   Symbol("Menu"),
    ITEM1:   Symbol("Item1"),
    ITEM2:  Symbol("Item2"),
    YOGURT:  Symbol("Yogurt"),
    PAYMENT: Symbol("Payment")
});

module.exports = class CuisineOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sphone="";
        this.contactNum="";
        this.rate = 0;
        this.sMenu = "";
        this.sItem1 = "";
        this.sItem2 = "";
        this.sYogurt = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.PHONE;
                aReturn.push("Welcome to Punjabi Dhaba");
                aReturn.push("Please enter your phone number");
                break;

            case OrderState.PHONE:
                this.sphone = sInput;
                var contactNum = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
                  if(!contactNum.test(this.sphone))
                    aReturn.push("This is not a valid number:");
                  else{
                    aReturn.push("Would you like Parantha for $20 or Saag for $22? ");
                    this.stateCur = OrderState.MENU;   
                  }        
                break;

        case OrderState.MENU:    
                this.sMenu = sInput; 
                if(this.sMenu.toLowerCase()== "parantha")
                {
                    aReturn.push("Which Parantha would you like Aaloo or Gobhi for $20?");
                    this.stateCur = OrderState.ITEM1;    
                }
                else if(this.sMenu.toLowerCase()== "saag")
                {
                    this.rate = $22;
                    this.stateCur = OrderState.ITEM2;
                    aReturn.push("Would you like Makki Tortila or Roti?");      
                }
                else if(this.sItem2.toLowerCase()!= "makki Tortila" && this.sItem2.toLowerCase()!="roti for $10")
                {  
                    this.rate = $10;
                    aReturn.push("Please enter valid input");  
                }      
                break;

        case OrderState.ITEM1:
                this.sItem1 = sInput;            
                if(this.sItem1.toLowerCase()!= "aaloo" && this.sItem1.toLowerCase()!= "gobhi")
                {
                    aReturn.push("Please enter Aaloo or Gobhi for $20?");  
                }
                else
                { 
                    this.rate = $20;
                    aReturn.push("Would you like Yogurt for $5?");
                    this.stateCur = OrderState.Yogurt;
                }
                break;
                case OrderState.ITEM2:
                    this.sItem2 = sInput;            
                    if(this.sItem2.toLowerCase()!= "makki Tortila" && this.sItem2.toLowerCase()!= "roti")
                    {
                        aReturn.push("Please enter either Makki Tortila or Roti"); 
                         
                    }
                    else
                    { 
                        this.rate = $20;
                        aReturn.push("Would you like Yogurt for $5?");
                        this.stateCur = OrderState.Yogurt;
                    }
                    break;


                case OrderState.sYogurt: 
                this.isDone(true);
                if(sInput.toLowerCase()== "yes")
                {
                    this.rate += 5;
                    aReturn.push("Thank you for your order of");
                    aReturn.push(`${this.sMenu} ${this.sItem1}with`);
                    aReturn.push(`Yogurt ${this.sYogurt}`);
                    aReturn.push(`Total price: $ ${this.rate}`);
                }
            
                else if (sInput.toLowerCase()== "no")
                {
                    aReturn.push("Thank-you for your order of");
                    aReturn.push(`${this.sMenu} ${this.sItem1} ${this.sItem2} `);
                    aReturn.push(`Total price: $ ${this.rate}`);
                 }
                else{
                    aReturn.push("Please enter yes or no")
                }
                aReturn.push(`Please pay for your order here`);
                    aReturn.push(`${this.sNumber}/payment/${this.sUrl}/`);  
                break;
        }
        return aReturn;
    }
    renderForm(sTitle = "-1", sAmount = "-1"){
        // your client id should be kept private
        if(sTitle != "-1"){
          this.sItem = sInput;
        }
        if(sAmount != "-1"){
          this.nOrder = this.rate;
        }
        const sClientID = process.env.SB_CLIENT_ID || 'Ac15TorUOM94LGFqqkWeXONOAFqw8aOADniCT2mA0HUmHrEitLnmNtAmtxufn3HezhEwIkPj1g8LhUiZ'
        return(`
        <!DOCTYPE html>
    
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
        </head>
        
        <body>
          <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
          <script
            src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
          </script>
          Thank you ${this.sphone} for your ${this.sMenu} order of $${this.sItem} for $${this.rate}
          <div id="paypal-button-container"></div>
         
          <script>
            paypal.Buttons({
                createOrder: function(data, actions) {
                  // This function sets up the details of the transaction, including the amount and line item details.
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: '${this.rate}'
                      }
                    }]
                  });
                },
                onApprove: function(data, actions) {
                  // This function captures the funds from the transaction.
                  return actions.order.capture().then(function(details) {
                    // This function shows a transaction success message to your buyer.
                    $.post(".", details, ()=>{
                      window.open("", "_self");
                      window.close(); 
                    });
                  });
                }
            
              }).render('#paypal-button-container');
            // This function displays Smart Payment Buttons on your web page.
          </script>
        
        </body>
            
        `);
    
      }
    }
