import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../routes.constant';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  routes = APP_ROUTES;
}
