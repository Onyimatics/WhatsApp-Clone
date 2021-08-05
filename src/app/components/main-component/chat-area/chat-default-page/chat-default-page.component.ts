import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-default-page',
  templateUrl: './chat-default-page.component.html',
  styleUrls: ['./chat-default-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDefaultPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
