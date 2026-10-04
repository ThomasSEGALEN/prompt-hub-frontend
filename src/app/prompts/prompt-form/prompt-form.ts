import { Component, effect, inject, input, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
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
    ReactiveFormsModule,
    SelectModule,
    TextareaModule,
    RouterLink,
  ],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  router: Router = inject(Router)
  promptService: PromptService = inject(PromptService)
  categoryService: CategoryService = inject(CategoryService)

  promptId = input<number>()

  categories: Signal<Category[]> = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  })

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
        console.log(promptId)
        this.promptService.getPrompt(promptId).subscribe((prompt) => {
          this.form.patchValue({
            title: prompt.title,
            content: prompt.content,
            categoryId: prompt.category.id,
          })
        })
      }
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const promptId = this.promptId()
    const prompt = this.form.getRawValue()

    if (promptId) {
      this.promptService.updatePrompt(promptId, prompt).subscribe(() => {
        this.router.navigate(['/'])
      })
    } else {
      this.promptService.createPrompt(prompt).subscribe(() => {
        this.router.navigate(['/'])
      })
    }
  }

  deletePrompt(): void {
    this.promptService.deletePrompt(this.promptId()!).subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}
