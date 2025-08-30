import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-example',
  templateUrl: './modal-example.page.html',
  styleUrls: ['./modal-example.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ModalExamplePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
