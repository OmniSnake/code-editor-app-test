import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { ApiService } from './services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, CodeEditorComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public readonly code = signal<string>('console.log("Hello, world!");');
  public readonly language = signal<string>('javascript');
  public readonly output = signal<string>('');
  public readonly error = signal<string>('');
  public readonly resultOutput = computed(() => this.error() ? this.error() : this.output());
  public taskMessage: string = 'Задача 1: Выведите на экран сообщение "Hello, world!"';

  constructor(private readonly apiService: ApiService) {}

  public run(): void {
    this.output.set('');
    this.error.set('');
    this.apiService.execute(this.language(), this.code()).then(res => {
      if (res.status === 'success') this.output.set(res.output!);
      if (res.status === 'error') this.error.set(res.error!);
    });
  }
}