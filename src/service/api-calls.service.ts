import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  baseUrl='https://reqres.in/api/users/';
  imgUrl='https://reqres.in/img/faces/';
  l: any;
  constructor(
    private http:HttpClient,
    private loadingController: LoadingController
    ) {}

  async createUser(name:string,job:string){
    return this.http.post(this.baseUrl,{name:name,job:job});
  }
  async getUser(offset=1){
    return this.http.get(this.baseUrl+'?page='+offset).pipe(
      map((result)=>{
        this.l= result;
        return this.l['data'];
      })
    )
   }
   async showLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration:3000
    });
    await loading.present();
  }
  async hideLoader() {
    const loading = await this.loadingController.getTop();
    if (loading) {
      await loading.dismiss();
    }
  }
  async deleteUser(id:number){
    return this.http.delete(this.baseUrl+id);
  }
  async updateUser(name:string,job:string,id:number){
    return this.http.put(this.baseUrl+id,{name:name,job:job});
  }
}
