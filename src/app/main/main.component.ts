import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CarDTO } from '../model/CarDTO';
import { UserDTO } from '../model/UserDTO';
import { CarService } from '../service/car.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private carService:CarService){}

  hastoken = this.tokenService.hasToken();

  user = new UserDTO();
  car = new CarDTO();

  hasUser = false;

  //Bottons visibility
  btnSave:Boolean = true;
  btnSaveCar:Boolean = true;
  userCarinfo:Boolean = true;

  //Table visibility
  table:Boolean = true; 
  tableCar:Boolean = true; 

  users:UserDTO[] = [];
  cars:CarDTO[] = [];
  userCar = new CarDTO();

    logout(){
      this.tokenService.removeToken();
      this.hastoken = false;
    }

  addCar(): void {
    this.user.cars.push(this.userCar);
  } 

  //clean form
  cleanForm(): void{
   
    this.user = new UserDTO();
    let userCar = new CarDTO();
    this.user.cars = [];
    this.user.cars.push(userCar)
  }
  
  cleanCarForm(): void{
   
    this.car = new CarDTO();
  }

  // functions *********************

  ngOnInit(): void {
    this.findAllUsers();
    this.findAllCars();
    this.addCar();
    this.getUserData();
  }

  findAllUsers():void{
    this.userService.findAllUsers()
    .subscribe(response => this.users = response);
  }

  saveUser():void{
    this.userService.save(this.user)
    .subscribe(response => {
      //save client on list
      this.users.push(response); 
      this.cleanForm();
      alert('User has been saved.');
    });
  }

  updateUser():void{
    this.userService.update(this.user)
    .subscribe(response => {

      //to get position of user  on the vector
      let position = this.users.findIndex(obj =>{
        return obj.id == response.id;
      });

      // Update user data on vector
      this.users[position] = response;

      this.cleanForm();
      this.cleanCarForm();

      this.table = true;
      this.userCarinfo = true;
      alert('User has been updated.');


    })
  }

  removeUser():void{
    this.userService.delete(this.user.id)
    .subscribe(response => {

      //to get position of user  on the vector
      let position = this.users.findIndex(obj =>{
        return obj.id == this.user.id;
      });

      this.users.splice(position, 1);
      this.cleanForm();

      this.table = true;
      this.btnSave = true;
      this.userCarinfo = true;
      alert('User has been removed.');

    })
  }

  callofUser():void{
    this.cleanForm();
    this.table = true;
    this.btnSave = true;
    this.userCarinfo = true;
  }

  findUser(position:number):void{
    this.user = this.users[position];
    this.btnSave = false;
    this.table = false;
    this.userCarinfo = false;
  }

  getUserData(){
    if(this.hasUser){
     this.userService.returnUser().pipe(
       map(user => user as UserDTO)
     )  .subscribe((user: UserDTO) => {
        console.log(user);
    });
    }
  }


  findAllCars():void{
    this.carService.findAllCars(this.tokenService.getToken())
    .subscribe(response => this.cars = response);
  }

  saveCar():void{
    this.carService.save(this.car, this.tokenService.getToken())
    .subscribe(response => {
      this.cars.push(response); 
      this.cleanCarForm();
      alert('User has been saved.');
    });
  }

  updateCar():void{
    this.carService.update(this.car, this.tokenService.getToken())
    .subscribe(response => {

      //to get position of user  on the vector
      let position = this.cars.findIndex(obj =>{
        return obj.id == response.id;
      });

      // Update user data on vector
      this.cars[position] = response;

      this.cleanCarForm();

      this.tableCar = true;
      alert('User has been updated.');


    })
  }


  removeCar():void{
    this.carService.delete(this.car.id, this.tokenService.getToken())
    .subscribe(response => {

      //to get position of user  on the vector
      let position = this.cars.findIndex(obj =>{
        return obj.id == this.car.id;
      });

      this.cars.splice(position, 1);
      this.cleanCarForm();

      this.tableCar = true;
      this.btnSaveCar = true;
      alert('Car has been removed.');
    })
  }

  callofCar():void{
    this.cleanCarForm();
    this.tableCar = true;
    this.btnSaveCar = true;
  }

  findCar(position:number):void{
    this.car = this.cars[position];
    this.btnSaveCar = false;
    this.tableCar = false;
  }
  
}
