import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Login } from '../../../Model/login.module';
import { DashboardComponent } from '../../dashboard/dashboard.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,RouterOutlet,FormsModule,DashboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private _authService:AuthService, private router:Router,private formBuilder:FormBuilder){}
  loginDetails:Login = new Login();
 registerUser()
 {
  this.router.navigate(['/register']);
 }

 login()
 {
   this._authService.login(this.loginDetails).subscribe(
     res=>{
       let token = res.token;
       if(token)
       {

         window.localStorage.setItem("token",token);
         this._authService.decodeToken();
         alert("Logged In Successfully");
         this.router.navigateByUrl("/dashboard");
       }
     },
     err=>{
          alert("User Credentials do not match... Try Again");
     }
   )
 }

}
