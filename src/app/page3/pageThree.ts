import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
// import { MainPage } from '../main/main.page';
@Component({
  selector: 'app-modal',
  templateUrl: './pageThree.html',
  styleUrls: ['./pageThree.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class Page3 implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async onCancel() {
    let topModal = await this.modalController.getTop();
    while (topModal) {
      await this.modalController.dismiss();
      topModal = await this.modalController.getTop();
    }
  }
}
