import { Component, inject, signal, WritableSignal } from '@angular/core'
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
  isDark: WritableSignal<boolean> = signal(false)

  toggleDarkMode(): void {
    this.isDark.update((value) => !value)
    document.documentElement.classList.toggle('app-dark', this.isDark())
  }

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/']))
  }
}
