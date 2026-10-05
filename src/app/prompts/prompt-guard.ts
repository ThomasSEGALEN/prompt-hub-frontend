import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, map, of } from 'rxjs'
import { AuthService } from '../auth/auth-service'
import { PromptService } from './prompt-service'

export const promptGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService)
  const promptService: PromptService = inject(PromptService)

  const promptId: string = route.paramMap.get('id')!

  return promptService.getPrompt(Number(promptId)).pipe(
    map((prompt) =>
      prompt.author.id === authService.currentUser()?.id ? true : router.createUrlTree(['/']),
    ),
    catchError(() => of(router.createUrlTree(['/']))),
  )
}
