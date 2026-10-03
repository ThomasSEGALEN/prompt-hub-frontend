import { Component, signal, WritableSignal } from '@angular/core'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isDark: WritableSignal<boolean> = signal(false)

  toggleDarkMode(): void {
    this.isDark.update((value) => !value)
    document.documentElement.classList.toggle('app-dark', this.isDark())
  }
}
