export class SettingsModule {
    // set federal tax rate
    fedTaxRate: number = 0.06
    // set state tax rate
    stateTaxRate: number = 0.01
    // markup window
    markupFloor: number = 6;
    markupCeiling: number = 12;
    
    



    /****************    DO NOT MODIFY ANY CODE BELOW THIS LINE **************/
    
    returnMarkupRate() {
        return this.markupRate
    }








    markupRate: number = 0.10;
    
}