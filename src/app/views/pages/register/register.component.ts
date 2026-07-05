import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IconDirective,
  ],
})
export class RegisterComponent implements OnInit {
  loading = false;
  registerForm: FormGroup | any;
  showPassword = false;
  showRetypePassword = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.registerFormInit();
  }

  registerFormInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRetypePasswordVisibility() {
    this.showRetypePassword = !this.showRetypePassword;
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.retypePassword) {
        Swal.fire({
          title: 'Error!',
          text: 'Passwords do not match.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
      this.loading = true;
      // Mock registration submission
      setTimeout(() => {
        this.loading = false;
        Swal.fire({
          title: 'Registration Successful!',
          text: 'The recruiter profile has been created.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }, 1500);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
