import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiCallsService } from 'src/service/api-calls.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  id!: number;
  name!: string
  job!: string;
  createdAt!: string;
  l:any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private api:ApiCallsService,
    private alertCtrl: AlertController,
    private router:Router
    ) {

  }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.queryParams['id'];
    this.name=this.activatedRoute.snapshot.queryParams['name'];
    this.job=this.activatedRoute.snapshot.queryParams['job'];
    this.createdAt=this.activatedRoute.snapshot.queryParams['cA'];
    const date = new Date(this.createdAt);
    const dateString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    this.createdAt=dateString;
  }

    async onUpdate(){
      this.presentAlert(this.id);

    }
    async onDelete(){

      this.presentDeleteConfirm(this.id);
    }

    async presentDeleteConfirm(id:any) {
      const alert = await this.alertCtrl.create({
        header: 'Confirm',
        message: 'Are you sure you want to delete this item?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Delete',
            handler: async () => {
              console.log('Confirm Okay');
              this.api.showLoader();
              (await this.api.deleteUser(id)).subscribe(data=>{
                this.router.navigate(['welcome']);
              });
            }
          }
        ]
      });

      await alert.present();
    }


    async presentAlert(id:number) {

      const alert = await this.alertCtrl.create({
        header: 'Please enter your info',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Update',
            handler: async (data) => {
              console.log('Confirm Okay',data);
              this.api.showLoader();
              (await this.api.updateUser(data.name,data.job,id)).subscribe(response=>{
                this.l=response;
                this.name=data.name;
                this.job=data.job;
                this.createdAt=this.l['updatedAt'];
                const date = new Date(this.createdAt);
                const dateString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                  this.createdAt=dateString;
                console.log(this.createdAt);
              });

            }
          }
        ],
        inputs: [
          {
            name:'name',
            placeholder: 'Name',
          },
          {
            name:'job',
            placeholder: 'Job'
          },
        ],
      });

      await alert.present();
    }
}
