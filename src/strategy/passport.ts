// import passport from 'passport';

export class Cpassport {
    
    public passport: any;
  
    constructor(cPassport: any) {
        if (!this.passport) {
            this.passport = cPassport;
        } else {
            return this.passport;
        }
    }    
  
    get() {
      return this.passport;
    }
  }
  