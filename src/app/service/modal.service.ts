import { Injectable, Type } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalOpen = false;
  private registry = new Map<string, Type<any>>();

  constructor(
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * ลงทะเบียน modal component
   */
  register(modalName: string, component: Type<any>) {
    this.registry.set(modalName, component);
  }

  /**
   * ฟัง query param modal=xxx แล้วเปิด
   */
  watchQueryParam() {
    this.route.queryParams.subscribe(params => {
      const modalName = params['modal'];
      if (modalName && !this.modalOpen && this.registry.has(modalName)) {
        this.openModal(modalName, false);
      }
    });
  }

  /**
   * เปิด modal ตามชื่อที่ลงทะเบียนไว้
   */
  async openModal(
    modalName: string,
    changeURL: boolean = true,
    props: any = {},
    cssClass: string | string[] = 'default-modal'
  ) {
    if (this.modalOpen) return;
    const component = this.registry.get(modalName);
    if (!component) {
      console.error(`Modal "${modalName}" ยังไม่ได้ลงทะเบียน`);
      return;
    }

    this.modalOpen = true;

    if (changeURL) {
      this.router.navigate([], {
        queryParams: { modal: modalName },
        queryParamsHandling: 'merge'
      });
    }

    const modal = await this.modalController.create({
      component,
      componentProps: props,
      cssClass // 👈 กำหนด class ได้ตรงนี้
    });

    await modal.present();
    await modal.onWillDismiss();

    // clear query param
    this.router.navigate([], {
      queryParams: { modal: null },
      queryParamsHandling: 'merge'
    });

    this.modalOpen = false;
  }

}
