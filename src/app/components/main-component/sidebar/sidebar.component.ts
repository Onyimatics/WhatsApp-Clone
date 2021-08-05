import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {CommonService, RoomData} from '../../../services/common.service';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage: string = '';
  subscription: Subscription[] = [];

  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private afs: AngularFirestore,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {

    // Generate 20 random values and store them in the randomSeed array
    this.randomSeed = Array.from({length: 20}, () => Math.floor(Math.random() * 14578976));

    //  Fetching data from firestore
    this.subscription.push(this.afs.collection('rooms').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {
              id: a.payload.doc.id,
              // @ts-ignore
              ...a.payload.doc.data()
            };
          });
        })
      ).subscribe((rooms: RoomData[]) => {
        this.roomData = rooms;
        this.cdr.detectChanges();
      }));
  }

  onFormSubmit(form: NgForm): void {
    const {search} = form.value;
    console.log(search);

    if (form.invalid) {
      return;
    }

    this.afs.collection<RoomData>('rooms')
      .valueChanges()
      .pipe(
        map((data: RoomData[]) => data.map(s => s.name?.toLowerCase() === form.value.search?.toLowerCase()))
      )
      .subscribe(dataValue => {
        dataValue = dataValue.filter(s => s === true);

        if (dataValue.length > 0) {
          alert('Sorry, room already present');
          return;
        } else {
          if (form.value.search !== null) {
            this.afs.collection('rooms').add({
              name: form.value.search
            });
          } else {
            return;
          }
          form.resetForm();
        }
      });


  }

  logOut() {
    this.commonService.logout();
  }

  ngOnDestroy() {
    this.subscription.map(s => s.unsubscribe());
  }

  seedData(e: string): void {
    this.seedValue.emit(e);
  }
}
