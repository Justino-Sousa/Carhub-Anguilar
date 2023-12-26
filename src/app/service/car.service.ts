import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDTO } from '../model/CarDTO';
import { UserDTO } from '../model/UserDTO';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private url:string = environment.carUrl

  constructor(
    private http:HttpClient,
    private tokenService: TokenService,
  ) {}


  findAllCars(token:string):Observable<CarDTO[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<CarDTO[]>(`${this.url}`, {headers});
  }

  save(obj:CarDTO, token:string):Observable<CarDTO>{ 
    obj.user = new UserDTO;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<CarDTO>(`${this.url}`,obj,{headers} );
  }

  update(obj:CarDTO, token:string):Observable<CarDTO>{
    obj.user = new UserDTO;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<CarDTO>(`${this.url+'/'+obj.id}`,obj,{headers} );
  }


  delete(id:number,token:string):Observable<string>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<string>(this.url+"/" + id,{headers});
  }
}
