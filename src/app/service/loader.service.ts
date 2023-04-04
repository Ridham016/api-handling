import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  isLoading = new Subject<boolean>();


  constructor(
    private loadingController:LoadingController
  ) {
    console.log('called!!!!');
  }

  async show() {
     this.isLoading.next(true);

      const loading =  this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        duration:3000
      });
     (await loading).present();

  }

  hide() {
     this.isLoading.next(false);
  }
}
