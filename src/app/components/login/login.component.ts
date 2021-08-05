import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.commonService.loginWithGoogle();
  }

  ngOnDestroy() {
  }

}
