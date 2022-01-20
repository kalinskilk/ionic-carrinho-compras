import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async presentAlertConfirm(
    messageHeader: string,
    message: string
  ): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: messageHeader,
        message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'Ok',
            id: 'confirm-button',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async presentToast(message: string, time = 1000) {
    const toast = await this.toastController.create({
      message,
      duration: time,
      color: 'success',
    });
    toast.present();
  }
}
