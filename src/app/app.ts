import { Component } from '@angular/core'
import { Navbar } from './navbar/navbar'
import { PromptList } from './prompts/prompt-list/prompt-list'

@Component({
  selector: 'app-root',
  imports: [Navbar, PromptList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
