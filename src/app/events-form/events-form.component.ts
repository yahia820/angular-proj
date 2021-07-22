import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/models/evenement.model';
import { EvenementService } from 'src/services/evenement.service';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  form : any;
  currentItemId : string="";
  currentItem : any;
  constructor(private eventservice : EvenementService,private router : Router,private activatedRoute :ActivatedRoute) { }

  isFormInEditMode():boolean{

    return (!!this.currentItemId);
  }
  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId)
    {//Edit
      this.eventservice.getEventById(this.currentItemId).then(
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
        Titre : new FormControl (item?.Titre, [Validators.required]),
        Date : new FormControl (item?.Date, [Validators.required]),
        Lieu : new FormControl (item?.Lieu, [Validators.required]),
  
      }
    )
  }

  onSubmit():void{
    console.log(this.form.value);
    const eventToSave ={...this.currentItem,...this.form.value}
    this.eventservice.SaveEvent(eventToSave).then
    (()=>this.router.navigate(['events/']))
  }
}
