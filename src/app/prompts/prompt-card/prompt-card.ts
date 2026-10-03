import { Component, input, InputSignal } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag'
import { TextareaModule } from 'primeng/textarea'
import { Prompt } from '../prompt.model'

@Component({
  selector: 'app-prompt-card',
  imports: [ButtonModule, CardModule, TagModule, TextareaModule],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  prompt: InputSignal<Prompt> = input.required<Prompt>()

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.prompt().content)
  }
}
