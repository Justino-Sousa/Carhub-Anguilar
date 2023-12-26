import { UserDTO } from "./UserDTO";

export class CarDTO {
    id!:number;
    year!: number;
    licensePlate: string = '';
    model:string = '';
    color: string = '';
    user!:UserDTO;
}   