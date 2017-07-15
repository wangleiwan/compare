/**
 * Global Util Functions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

const UTIL: any = {
  getCorrectFontSizeForScreen(PixelRatio: any, screenWidth: number, screenHeight: number, currentFont: number) {
    const float2int = (value: number) => {
      return value | 0;
    }

    let devRatio = PixelRatio.get();
    let factor = (((screenWidth*devRatio)/320)+((screenHeight*devRatio)/640))/2.0;
    let maxFontDifferFactor = 5; //the maximum pixels of font size we can go up or down
    // console.log("The factor is: "+factor);
    if(factor<=1){
      return currentFont-float2int(maxFontDifferFactor*0.3);
    }else if((factor>=1) && (factor<=1.6)){
      return currentFont-float2int(maxFontDifferFactor*0.1);
    }else if((factor>=1.6) && (factor<=2)){
      return currentFont;
    }else if((factor>=2) && (factor<=3)){
      return currentFont+float2int(maxFontDifferFactor*0.65);
    }else if (factor>=3){
      return currentFont+float2int(maxFontDifferFactor);
    }
  },
  
  /**
    * Test if Obj is empty
    */
  objIsEmpty(obj: any) {
    for(let prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  },

  /**
    * Convert Obj to Arr
    */
  objToArr(obj: object) {
    return Object.keys(obj).map(function(k) { return obj[k] });
  },

  /**
    * Get First Item in Object
    */
  firstIndexInObj(obj: any) {
    for (let a in obj) return a;
  },

  /**
   * Validate email
   */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  /**
   * Validate phone
   */
  validatePhone(phone) {
    // todo: implement validation requirements for phone number based on app requirements.
    return true;
  },

  validateName(name) {
    // todo: implement validation requirements for phone number based on app requirements.
    return true;
  },

  /**
   * Convert phone number +11234567890 to 1 (123) 456 7890
   * @param phoneNumber 
   */
  formatPhoneNumber(phoneNumber) {
    let number = phoneNumber.toString().substring(phoneNumber.indexOf('+')+1);
    number = number.substring(0,1) + ' (' + number.substring(1,4) + ') ' + 
             number.substring(4,7) + ' ' + number.substring(7);
    return number;
  }
};

/* Export ==================================================================== */
export default UTIL;
export const details = {
  title: 'UTIL'
};
