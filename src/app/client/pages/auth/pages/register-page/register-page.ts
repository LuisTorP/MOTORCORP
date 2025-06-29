import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../../../routes.constant';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'register-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  routes = APP_ROUTES;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    surnames: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched;
      return;
    }
    const { name, surnames, email, password, phone, address } =
      this.registerForm.value;
    const userData: Partial<User> = {
      apellido: surnames!.trim(),
      direccion: address!.trim(),
      email: email!.trim(),
      nombre: name!.trim(),
      password: password!.trim(),
      rol: 'comprador',
      telefono: phone!.trim(),
    };
    await this.userService.registerUser(userData);
    delete userData.password;
    this.authService.login(userData as User);
    this.router.navigateByUrl(this.routes.home.root);
  }
}
