import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sfeir-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
  @ViewChild('text') textRef: ElementRef;
  @Output() message: EventEmitter<string>;
  @Output() file: EventEmitter<any>;

  blobUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.message = new EventEmitter<string>();
    this.file = new EventEmitter<string>();
  }

  ngOnInit() {}

  send(text) {
    this.message.emit(text);
    this.textRef.nativeElement.value = '';
    this.blobUrl = null;
  }

  onFileSelected(changeEvent) {
    changeEvent.stopPropagation();
    changeEvent.preventDefault();

    const file = changeEvent.target.files[0];
    this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(file)
    );

    const metadata = {
      contentType: file.type
    };
    this.file.emit({
      file,
      metadata
    });
  }
}
