import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/login/auth/auth.service';
import { UserService } from '../../../service/login/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import { UserRoles } from '../../../enums/UserRole'; // Ensure this path is correct
import { UserDetailsResponseDTO } from '../../../model/user/user-details/UserDetailsResponseDTO';
import { AuthStatus } from '../../../enums/AuthStatus';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
  ],
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup | any;
  showPassword = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.valid) {
      this.pageLoader();
      this.router.navigate(['/dashboard']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getUserPermissionList() {
    this.userService.getUserPermissionList().subscribe(
      (response) => {
        if (response.status === 'OK') {
          sessionStorage.setItem('userDetails', JSON.stringify(response.data));

          const userDetails: UserDetailsResponseDTO = response.data;

          this.loading = false;

          if (userDetails.userHasApplicationScopeHasUserRole.userRole.role !== null &&
            userDetails.userHasApplicationScopeHasUserRole.userRole.role !== ''
          ) {
            this.authService.setAuthenticationStatus(AuthStatus.YES);
            this.router.navigate(['/dashboard']);
          } else {
            this.authService.setAuthenticationStatus(AuthStatus.NO);
            Swal.fire({
              title: 'Error!',
              text: 'Unauthorized Access!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Network Error.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    );
  }

  pageLoader() {
    this.loading = true;
  }

  redirectToRegister() {
    // Use the Router service to navigate to the 'referees' route
    this.router.navigate(['/register']);
  }
}
