import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/member.model';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  form : any;
  currentItemId : string="";
  currentItem : any;
  constructor(private memberservice : MemberService,private router : Router,private activatedRoute :ActivatedRoute) { }

  isFormInEditMode():boolean{

    return (!!this.currentItemId);
  }
  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId)
    {//Edit
      this.memberservice.getMemberById(this.currentItemId).then(
      item => {
        this.currentItem = item;
        this.intiForm(item);
      } );
    }
    else{this.intiForm(null)}
  }

  intiForm(item : any):void{

    this.form = new FormGroup(
      {
        cin : new FormControl (item?.cin, [Validators.required]),
        Name : new FormControl (item?.Name, [Validators.required]),
        Cv : new FormControl (item?.Cv, []),
        Type : new FormControl (item?.Type, [Validators.required]),
      }
    )
  }

  onSubmit():void{
    console.log(this.form.value);
    const memberToSave ={...this.currentItem,...this.form.value}
    this.memberservice.SaveMember(memberToSave).then
    (()=>this.router.navigate(['members/']))
  }

}
