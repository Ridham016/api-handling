import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCallsService } from 'src/service/api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {
  listdata:any[]=[];
  page=1;


  constructor(
    private http:HttpClient,
    private api:ApiCallsService,
    private router:Router
  ) {}

  ngOnInit() {
    this.loadData();

  }
  async loadData(loadMore=false) {
    if(loadMore){
      this.page=this.page+1;
    }
    this.api.showLoader();
    (await this.api.getUser(this.page)).subscribe(res  =>{
      console.log('result: ',res);
      this.listdata=[...this.listdata,...res];
      console.log(this.listdata);
      this.api.hideLoader();

    });
  }
 async onLogout(){
  this.router.navigate(['welcome']);
 }
}
