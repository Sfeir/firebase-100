import { Message } from './../_shared/message.class';
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "sfeir-chat-list",
  templateUrl: "./chat-list.component.html",
  styleUrls: ["./chat-list.component.scss"]
})
export class ChatListComponent implements OnInit {
  
  @Input() messageList: Message[] = [];

  @Input() user: any;

  constructor() {}

  ngOnInit() {}

  displayMode(item) {
    if (this.user && this.user.email === item.user.email) {
      return 'row-reverse';
    }
    else {
      return 'row';
    }
  }

  trackByFn(index, obj: Message) {
    return obj.date;
  }
}
