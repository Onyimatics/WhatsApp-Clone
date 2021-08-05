import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainComponentComponent} from './components/main-component/main-component.component';
import {SidebarComponent} from './components/main-component/sidebar/sidebar.component';
import {SidebarContentComponent} from './components/main-component/sidebar/sidebar-content/sidebar-content.component';
import {ChatAreaComponent} from './components/main-component/chat-area/chat-area.component';
import {ChatDefaultPageComponent} from './components/main-component/chat-area/chat-default-page/chat-default-page.component';
import {ChatRoomComponent} from './components/main-component/chat-area/chat-room/chat-room.component';
import {MaterialModule} from './shared/material.module';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    SidebarComponent,
    SidebarContentComponent,
    ChatAreaComponent,
    ChatDefaultPageComponent,
    ChatRoomComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
