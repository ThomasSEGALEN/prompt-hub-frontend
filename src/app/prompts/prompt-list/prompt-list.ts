import { Component, inject, signal, Signal, WritableSignal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ProgressSpinner } from 'primeng/progressspinner'
import { tap } from 'rxjs'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../prompt-service'
import { Prompt } from '../prompt.model'
@Component({
  selector: 'app-prompt-list',
  imports: [ProgressSpinner, PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService: PromptService = inject(PromptService)

  loading: WritableSignal<boolean> = signal(true)
  prompts: Signal<Prompt[]> = toSignal(
    this.promptService.getPrompts().pipe(tap(() => this.loading.set(false))),
    { initialValue: [] },
  )
}
