import { Routes } from '@angular/router'
import { PromptForm } from './prompts/prompt-form/prompt-form'
import { PromptList } from './prompts/prompt-list/prompt-list'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'prompts',
    pathMatch: 'full',
  },
  {
    path: 'prompts',
    component: PromptList,
  },
  {
    path: 'prompts/create',
    component: PromptForm,
  },
  {
    path: 'prompts/:promptId/update',
    component: PromptForm,
  },
]
