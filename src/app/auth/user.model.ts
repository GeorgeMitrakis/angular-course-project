import { UserRole } from './user-role.enum';

export abstract class User{
    constructor(private _role:UserRole){}
    get role(){
        return this._role;
    }
}

export class AdminUser extends User{
    constructor(){
        super(UserRole.Admin);
    }
}

export class SimpleUser extends User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ){
        super(UserRole.Simple);
    }

    get token(): string | null {
        if(!this._tokenExpirationDate || this.isUserTokenExpired()){
            return null;
        }
        return this._token;
    }

    get tokenExpirationDate(): Date{
        return this._tokenExpirationDate;
    }

    isUserTokenExpired(): boolean {
        return (new Date() > this._tokenExpirationDate);
    }

}

export class GuestUser extends User{
    constructor(){
        super(UserRole.Guest);
    }
}