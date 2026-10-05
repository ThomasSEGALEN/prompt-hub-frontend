import { Routes } from '@angular/router'
import { AuthForm } from './auth/auth-form/auth-form'
import { authGuard } from './auth/auth-guard'
import { PromptForm } from './prompts/prompt-form/prompt-form'
import { promptGuard } from './prompts/prompt-guard'
import { PromptList } from './prompts/prompt-list/prompt-list'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'prompts',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthForm,
  },
  {
    path: 'prompts',
    component: PromptList,
  },
  {
    path: 'prompts/create',
    component: PromptForm,
    canActivate: [authGuard],
  },
  {
    path: 'prompts/:promptId/update',
    component: PromptForm,
    canActivate: [authGuard, promptGuard],
  },
]
