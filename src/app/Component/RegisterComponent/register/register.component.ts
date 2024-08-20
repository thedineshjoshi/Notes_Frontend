import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../../../Service/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  userRegistrationForm: FormGroup;

  isFieldInvalid(field: string): boolean {
    const control = this.userRegistrationForm.get(field);
    return !!(control && !control.valid && control.touched);
  }
  
  

  constructor(private apicallService: ApiCallService, private router: Router, private formBuilder: FormBuilder) {
    this.userRegistrationForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      UserName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      PasswordHash: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).+$')
      ]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('PasswordHash');
    const confirmPassword = control.get('ConfirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  register() {
    if (this.userRegistrationForm.valid) {
      let userData = this.userRegistrationForm.value;

      this.apicallService.registerUser(userData).subscribe(
        res => {
          alert("Registered Successfully");
          this.router.navigateByUrl("");
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.userRegistrationForm.markAllAsTouched();
    }
  }
}
