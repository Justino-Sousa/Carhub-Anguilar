// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

interface AuthResponse{
    token:string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private userService: UserService) {}

  autentication(login: string, password: string):
   Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`,
     {login, password},
     {observe: 'response'}).pipe(
       tap((response) => {
        const authtoken = response.body?.token  || '';
        this.userService.salvarToken(authtoken)
       })
       )
  }

}
