import { Injectable } from '@angular/core';
import {
  ActionSheetButton,
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
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

  async presentToast(message: string, time = 1000, color = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: time,
      color,
    });
    toast.present();
  }

  async presentActionSheet(params: {
    header: string;
    subHeader?: string;
    useButtonNo?: boolean;
  }): Promise<boolean> {
    const buttons: ActionSheetButton[] = [
      {
        text: 'Sim',
        role: 'destructive',
        data: {
          action: 'delete',
        },
      },

      {
        text: 'Cancelar',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];

    if (params.useButtonNo) {
      buttons.push({
        text: 'Não',
        data: {
          action: 'share',
        },
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: params.header,
      mode: 'ios',
      subHeader: params.subHeader,
      buttons,
      cssClass: 'custom-action-sheet',
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    return result.data.action === 'delete' ? true : false;
  }
}
