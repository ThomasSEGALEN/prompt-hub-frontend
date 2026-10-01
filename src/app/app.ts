import { Component } from '@angular/core';
import { PromptList } from './prompts/prompt-list/prompt-list';

@Component({
  selector: 'app-root',
  imports: [PromptList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
