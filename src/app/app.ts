import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ToastModule } from 'primeng/toast'
import { Navbar } from './navbar/navbar'

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
