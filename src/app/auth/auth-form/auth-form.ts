import { Component, inject, signal, WritableSignal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { AuthService } from '../auth-service'

@Component({
  selector: 'app-auth-form',
  imports: [Button, Card, InputTextModule, PasswordModule, ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  router: Router = inject(Router)
  authService: AuthService = inject(AuthService)
  mode: WritableSignal<'login' | 'register'> = signal<'login' | 'register'>('login')

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
  })

  toggleMode(): void {
    this.mode.update((value) => (value === 'login' ? 'register' : 'login'))
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const { username, password } = this.form.getRawValue()

    if (this.mode() === 'login') {
      this.login(username, password)
    } else {
      this.register(username, password)
    }
  }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(() => this.router.navigate(['/']))
  }

  register(username: string, password: string): void {
    this.authService.register(username, password).subscribe(() => this.router.navigate(['/']))
  }
}
