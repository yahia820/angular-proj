import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Article } from 'src/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public tab:Article[]=GLOBAL._DB.articles;
  constructor (private httpClient : HttpClient){}
  SaveArticle(article: any) : Promise <Article>{
  // return this.httpClient.post<Member>
  // ('linkToRestAPI', member).ToPromise();
  const articleToSave = {
  id : article.id ?? Math.ceil(Math.random()*10000).toString(),
  CreateDate : article.CreateDate ?? new Date().toISOString(),
  ...article
  };

  this.tab= [articleToSave, ...this.tab.filter(
    item => item.id!==article.id)]

  return new Promise ( resolve => resolve(articleToSave))
  };

  getArticleById(id:any): Promise <Article>
  {
    return new Promise (resolve => resolve (
    this.tab.filter(item=>item.id==id) [0] ?? null));
  }
  
  
  addArticleToMember(item1 :any) :Promise <void>
  {
    this.tab=[item1,...this.tab.filter(item => item.id!==item1.id)];
    return new Promise( resolve =>resolve() )
  }
  RemoveArticleById(id:String):Promise<void>{
    // this.httpClient.delete<void> ('linkToRestAPI', member)
    // .toPromise;
    this.tab = this.tab.filter(item=> item.id!==id)
    return new Promise (resolve => resolve());
  }
  GetAllarticles() : Promise <Article[]>
  {
    //return this.httpClient.get<Member[] ('linkToRestAPI').toPromise;>
    return new Promise( resolve => resolve(this.tab));
  }
}
