import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.errorMessage = 'No registered user found. Please register first.';
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email && user.password === password) {
      this.authService.login(user.name); // ✅ trigger navbar update
      alert(`Welcome back, ${user.name}!`);
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
