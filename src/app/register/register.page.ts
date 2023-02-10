import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiCallsService } from 'src/service/api-calls.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name!: string;
job!: string;
  l: any;

  constructor(
    public modalCtrl: ModalController,
    private api:ApiCallsService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  async onSubmit(){
    this.api.showLoader();
    (await this.api.createUser(this.name, this.job)).subscribe(response=>{
      this.l=response;
      if(this.l){
        this.navigate();
        this.dismiss();
        }
    });
  }
    navigate(){
      this.router.navigate(['userprofile'], {
        queryParams: {
          id:this.l.id,
          name:this.l.name,
          job:this.l.job,
          cA:this.l.createdAt,
        }
      });
    }


  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

}
