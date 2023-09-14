import { Token } from "../Token";

export class LoginUser{
    email:string = "";
    password:string = "";
}

export class LoginUserResponse{
    message:string = "";
    succeded:boolean = false;
    token: Token = new Token; 
}