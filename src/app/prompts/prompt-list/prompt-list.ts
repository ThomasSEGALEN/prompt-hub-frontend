import { Component, inject, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../prompt-service'
import { Prompt } from '../prompt.model'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService: PromptService = inject(PromptService)
  prompts: Signal<Prompt[]> = toSignal(this.promptService.getPrompts(), { initialValue: [] })
}
