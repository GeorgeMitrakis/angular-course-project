export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ){}

    get token(): string | null {
        if(!this._tokenExpirationDate || this.isUserTokenExpired()){
            return null;
        }
        return this._token;
    }

    isUserTokenExpired(): boolean {
        return (new Date() > this._tokenExpirationDate)
    }

}