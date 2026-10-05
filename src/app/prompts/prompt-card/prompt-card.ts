import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag'
import { TextareaModule } from 'primeng/textarea'
import { AuthService } from '../../auth/auth-service'
import { Prompt } from '../prompt.model'

@Component({
  selector: 'app-prompt-card',
  imports: [ButtonModule, CardModule, RouterLink, TagModule, TextareaModule],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  authService: AuthService = inject(AuthService)
  prompt: InputSignal<Prompt> = input.required<Prompt>()
  canEdit: Signal<boolean | undefined> = computed(() => {
    const currentUser = this.authService.currentUser()
    return currentUser && this.prompt().author.id === currentUser.id
  })

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.prompt().content)
  }
}
