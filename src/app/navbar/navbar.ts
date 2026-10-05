import { Component, effect, inject, signal, WritableSignal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { AuthService } from '../auth/auth-service'

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  router: Router = inject(Router)
  authService: AuthService = inject(AuthService)
  readonly DARK_MODE_KEY = 'dark-mode'
  isDark: WritableSignal<boolean> = signal(localStorage.getItem(this.DARK_MODE_KEY) === 'true')
  loggingOut: WritableSignal<boolean> = signal(false)

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDark())
      localStorage.setItem(this.DARK_MODE_KEY, String(this.isDark()))
    })
  }

  logout(): void {
    this.loggingOut.set(true)
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/'])
      this.loggingOut.set(false)
    })
  }
}
