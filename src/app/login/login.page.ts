import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  listdata:any;
  username:string|any;
  password:string|any;

  constructor(
    public modalCtrl: ModalController,
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.username=='admin' && this.password=='admin12345'){
    this.router.navigate(['userlist']);
  }
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
