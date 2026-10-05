import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  linkedSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag'
import { TextareaModule } from 'primeng/textarea'
import { from } from 'rxjs'
import { AuthService } from '../../auth/auth-service'
import { PromptService } from '../prompt-service'
import { Prompt } from '../prompt.model'

@Component({
  selector: 'app-prompt-card',
  imports: [ButtonModule, CardModule, RouterLink, TagModule, TextareaModule],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  messageService: MessageService = inject(MessageService)
  router: Router = inject(Router)
  authService: AuthService = inject(AuthService)
  promptService: PromptService = inject(PromptService)

  prompt: InputSignal<Prompt> = input.required<Prompt>()
  score: WritableSignal<number> = linkedSignal(() => this.prompt().score)
  userVote: WritableSignal<'up' | 'down' | null> = linkedSignal(() =>
    this.authService.currentUser() ? this.prompt().userVote : null,
  )
  canEdit: Signal<boolean | undefined> = computed(() => {
    const currentUser = this.authService.currentUser()
    return currentUser && this.prompt().author.id === currentUser.id
  })
  voting: WritableSignal<boolean> = signal(false)

  copyToClipboard(): void {
    from(navigator.clipboard.writeText(this.prompt().content)).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copied',
        detail: 'Prompt copied to the clipboard',
      })
    })
  }

  upvote(): void {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth'])
      return
    }

    this.voting.set(true)
    this.promptService.upvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
      this.score.set(updatedPrompt.score)
      this.userVote.set(updatedPrompt.userVote)
      this.voting.set(false)
    })
  }

  downvote(): void {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth'])
      return
    }

    this.voting.set(true)
    this.promptService.downvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
      this.score.set(updatedPrompt.score)
      this.userVote.set(updatedPrompt.userVote)
      this.voting.set(false)
    })
  }
}
