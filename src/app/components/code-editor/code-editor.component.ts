import { Component, ElementRef, Input, OnInit, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as monaco from 'monaco-editor';

@Component({
  standalone: true,
  selector: 'app-code-editor',
  imports: [CommonModule],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, OnChanges {
  
  @ViewChild('editorContainer', {static:true}) private editorContainer!: ElementRef<HTMLDivElement>;
  @Input({required:true}) public code!: string;
  @Input({required:true}) public language!: string;
  @Output() public codeChange = new EventEmitter<string>();

  private editor!: monaco.editor.IStandaloneCodeEditor;

  public ngOnInit(): void {
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.code,
      language: this.language,
      automaticLayout: true,
      theme: 'vs-light'
    });
    this.editor.getModel()?.onDidChangeContent(() => this.codeChange.emit(this.editor.getValue()));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.editor && changes['language'] && !changes['language'].firstChange) {
      const model = this.editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, this.language);
      }
    }
  }
}