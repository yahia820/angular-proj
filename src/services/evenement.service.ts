import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Evenement } from 'src/models/evenement.model';
@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  public tab:Evenement[]=GLOBAL._DB.evenement;
  constructor (private httpClient : HttpClient){}
  SaveEvent(events: any) : Promise <Evenement >{
  // return this.httpClient.post<Member>
  // ('linkToRestAPI', member).ToPromise();
  const eventToSave = {
  id : events.id ?? Math.ceil(Math.random()*10000).toString(),
  CreateDate : events.CreateDate ?? new Date().toISOString(),
  ...events
  };

  this.tab= [eventToSave, ...this.tab.filter(
    item => item.id!==events.id)]

  return new Promise ( resolve => resolve(eventToSave))
  };

  getEventById(id : string) : Promise <Evenement>{
  // return this.httpClient.get<Member> ('linkToRestAPI', member)
  return new Promise(resolve => resolve (
    this.tab.filter(item => item.id=== id)[0]?? null
    ))
  }
  RemoveEventById(id:String):Promise<void>{
    // this.httpClient.delete<void> ('linkToRestAPI', member)
    // .toPromise;
    this.tab = this.tab.filter(item=> item.id!==id)
    return new Promise (resolve => resolve());
  }
  GetAllevents() : Promise <Evenement[]>
  {
    //return this.httpClient.get<Member[] ('linkToRestAPI').toPromise;>
    return new Promise( resolve => resolve(this.tab));
  }
}