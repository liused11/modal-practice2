import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { MainPage } from '../main/main.page';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class ModalComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  async openModalInformation(): Promise<void> {
    const modal = await this.modalController.create({
      component: MainPage,
      cssClass: "modal-fullscreen",
      showBackdrop: false,
      // componentProps: { row },
    });
    await modal.present();
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
