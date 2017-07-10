import { ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sfeir-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

  @Input() model: any = {};

  @Input() display: any = 'row';

  @ViewChild('scrollerRef') scrollerRef: ElementRef;
  
  constructor() {
  }

  ngOnInit() {
    this.scrollerRef.nativeElement.scrollIntoView(true);
  }

}
