import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CommonService} from '../../../services/common.service';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatAreaComponent implements OnInit, OnDestroy {

  @Input() randomSeed: string = '';
  subscription: Subscription | undefined;
  paramValue: string | undefined;
  roomName: string | undefined;

  constructor(
    private commonService: CommonService,
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.commonService.pathParam
      .subscribe(data => {
        this.paramValue = data;
        console.log('ParamValue', this.paramValue);
      });
  }

  formSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const {message} = form.value;
    form.resetForm();

    this.afs.collection('rooms').doc(this.paramValue).collection('messages').add({
      message,
      user_id: this.commonService.getUser().uid,
      name: this.commonService.getUser().displayName,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  ngOnDestroy() {
  }

  chatData(e: any) {
    if(e.chatData !== undefined) {
      e.chatData.subscribe((roomName: string) => {
        this.roomName = roomName;
        this.cdr.detectChanges();
      })
    }
  }
}
