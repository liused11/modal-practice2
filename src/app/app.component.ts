import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { RegisterComponent } from './pages/register/register.component';
import { ModalService } from './service/modal.service';
import { Register2Component } from './pages/register2/register2.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    // ลงทะเบียน modal ที่มีในระบบ
    this.modalService.register('register', RegisterComponent);
    this.modalService.register('login', Register2Component);

    // ให้ service คอยฟัง query param modal=xxx
    this.modalService.watchQueryParam();
  }
}