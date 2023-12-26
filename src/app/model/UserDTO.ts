import { CarDTO } from "./CarDTO";

export class UserDTO{

    id!:number;	
    firstName:string = '';
    lastName:string = '';
    email:string = '';
    birthday!:Date;
    login:string = '';
    password:string = '';
    phone:string = '';
    cars:CarDTO []= [];
}