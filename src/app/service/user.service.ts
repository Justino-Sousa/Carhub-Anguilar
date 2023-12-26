import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from '../model/UserDTO';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = environment.userUrl;

  private userSubject = new BehaviorSubject<UserDTO | null>(null)

  constructor(
    private http:HttpClient, 
    private tokenService: TokenService,
    ) { 
      if(this.tokenService.hasToken()){
        this.decodeJWT();
      }
    }


  decodeJWT(){
     const token = this.tokenService.getToken();
     const user = jwtDecode(token) as UserDTO;
     this.userSubject.next(user)
  }

  returnUser(){
    return this.userSubject.asObservable();
  }

  salvarToken(token:string): void{
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout(){
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogued(){
    return this.tokenService.hasToken();
  }

  findAllUsers():Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(this.url);
  }

  save(obj:UserDTO):Observable<UserDTO>{
    return  this.http.post<UserDTO>(this.url,obj);
  }

  update(obj:UserDTO):Observable<UserDTO>{
    return  this.http.put<UserDTO>(this.url+"/" + obj.id ,obj);
  }

  delete(id:number):Observable<string>{
    return this.http.delete<string>(this.url+"/" + id);
  }
}
