import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.scss'
})
export class ClientLayout {

}
