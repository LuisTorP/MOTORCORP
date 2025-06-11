import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  private userService = inject(UserService);

  ngOnInit(): void {
    // this.userService.loadSeed();
    // this.productService.loadSeed();
  }
}
