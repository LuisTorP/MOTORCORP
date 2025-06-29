import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../../products/services/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../../../../shared/services/storage.service';
import { APP_ROUTES } from '../../../../../routes.constant';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'login-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private userService = inject(UserService);

  routes = APP_ROUTES;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    // this.userService.loadSeed();
    // this.productService.loadSeed();
  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched;
      return;
    }
    const { email, password } = this.loginForm.value;
    const user = (await this.userService.getUser(
      email!.trim(),
      password!.trim()
    )) as User;
    if (!user) return;
    this.authService.login(user);
    this.router.navigateByUrl(this.routes.client.home.root);
  }
}
