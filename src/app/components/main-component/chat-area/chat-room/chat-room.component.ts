import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {CommonService} from '../../../../services/common.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  isUser: firebase.User;
  item: any;
  messageData: any[] = [];

  @Output() chatData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef
  ) {
    this.isUser = JSON.parse(<string>localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.subscription.push(this.route.paramMap.pipe(
      map(param => param.get('id'))
    ).subscribe(routePathParam => this.commonService.updatePathParamState(routePathParam)))

    this.subscription.push(
      this.route.params.subscribe(param => {
        // To get all data matching the document id
        this.afs.collection('rooms').doc(param.id).get().subscribe(data => {
          this.item = data;
          this.chatData.emit(this.item.data().name);
          this.cdr.detectChanges();
        });

        // This is to get the messages in reverse order, that is latest on top
        this.subscription.push(this.afs.collection('rooms').doc(param.id)
          .collection('messages', ref => ref.orderBy('time', 'asc'))
          .valueChanges()
          .subscribe(messages => {
            this.messageData = messages;
            this.cdr.detectChanges();
          }))
      })
    )
  }

  ngOnDestroy() {
    this.subscription.map(s => s.unsubscribe())
  }

}
