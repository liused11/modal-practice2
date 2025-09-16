import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { ModalService } from 'src/app/service/modal.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCard
  ]
})
export class ProjectPage implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    // ให้ service จัดการ query param เอง
    //   this.modalService.watchQueryParam('register', RegisterComponent);
  }

  openRegister() {
    this.modalService.openModal('register', true, { message: 'From HomePage' });
  }

  openLogin() {
    this.modalService.openModal('login', true, { from: 'HomePage' });
  }
}