import { Component, effect, inject, input, signal, Signal, WritableSignal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { ProgressSpinner } from 'primeng/progressspinner'
import { SelectModule } from 'primeng/select'
import { TextareaModule } from 'primeng/textarea'
import { CategoryService } from '../category-service'
import { Category } from '../category.model'
import { PromptService } from '../prompt-service'

@Component({
  selector: 'app-prompt-form',
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    ProgressSpinner,
    ReactiveFormsModule,
    RouterLink,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  messageService: MessageService = inject(MessageService)
  router: Router = inject(Router)
  promptService: PromptService = inject(PromptService)
  categoryService: CategoryService = inject(CategoryService)

  promptId = input<number>()
  categories: Signal<Category[]> = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  })
  loading: WritableSignal<boolean> = signal(false)
  submitting: WritableSignal<boolean> = signal(false)
  deletting: WritableSignal<boolean> = signal(false)

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)],
      nonNullable: true,
    }),
    content: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    categoryId: new FormControl(-1, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
  })

  constructor() {
    effect(() => {
      const promptId = this.promptId()

      if (promptId) {
        this.loading.set(true)
        this.promptService.getPrompt(promptId).subscribe((prompt) => {
          this.form.patchValue({
            title: prompt.title,
            content: prompt.content,
            categoryId: prompt.category.id,
          })
          this.loading.set(false)
        })
      }
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const promptId = this.promptId()
    const prompt = this.form.getRawValue()
    this.submitting.set(true)

    if (promptId) {
      this.promptService.updatePrompt(promptId, prompt).subscribe(() => {
        this.router.navigate(['/'])
        this.submitting.set(false)
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Prompt updated successfully',
        })
      })
    } else {
      this.promptService.createPrompt(prompt).subscribe(() => {
        this.router.navigate(['/'])
        this.submitting.set(false)
        this.messageService.add({
          severity: 'success',
          summary: 'Created',
          detail: 'Prompt created successfully',
        })
      })
    }
  }

  deletePrompt(): void {
    this.deletting.set(true)
    this.promptService.deletePrompt(this.promptId()!).subscribe(() => {
      this.router.navigate(['/'])
      this.deletting.set(false)
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Prompt deleted successfully',
      })
    })
  }
}
