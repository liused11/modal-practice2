import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
// import { MainPage } from '../main/main.page';
import { Page3 } from '../page3/pageThree';
@Component({
  selector: 'app-modal',
  templateUrl: './nextPage.html',
  styleUrls: ['./nextPage.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class nextPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async GotoPage3(): Promise<void> {
    const modal = await this.modalController.create({
      component: Page3,
      cssClass: 'modal-fullscreen',
      showBackdrop: false,
      // componentProps: { row },
    });
    await modal.present();
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
