import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
    ) 
    { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null,[Validators.required]],
      password: [null,[Validators.required]]
    })
  }


  login(){
    const login = this.loginForm.value.login;
    const password = this.loginForm.value.password;
  

    this.authService.autentication(login, password).subscribe({
      next: (value) =>{
        console.log('Login realizado com sucesso!', this.loginForm.value);
        this.route.navigateByUrl('/');
      }, 
      error: (err) => {
        console.log('Erro no login', err)
      }
    })

    
  }

}
