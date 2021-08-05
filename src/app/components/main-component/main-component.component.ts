import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponentComponent implements OnInit, OnDestroy {

  seedValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  seedData(e: string): void {
    this.seedValue = e;
  }

  ngOnDestroy() {
  }
}
