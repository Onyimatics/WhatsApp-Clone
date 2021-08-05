import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponentComponent} from "./components/main-component/main-component.component";
import {ChatRoomComponent} from "./components/main-component/chat-area/chat-room/chat-room.component";
import {ChatDefaultPageComponent} from "./components/main-component/chat-area/chat-default-page/chat-default-page.component";
import {LoginComponent} from "./components/login/login.component";
import {ChatGuard} from './guards/chat.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponentComponent,
    children: [
      {
        path: 'room/:id',
        component: ChatRoomComponent
      },
      {
        path: '',
        component: ChatDefaultPageComponent
      }
    ],
    canActivate: [ChatGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
