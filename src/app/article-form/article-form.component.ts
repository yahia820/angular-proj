import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article.model';
import { ArticleService } from 'src/services/article.service';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  form : any;
  currentItemId : string="";
  currentItem : any;
  constructor(private articleservice : ArticleService,private router : Router,private activatedRoute :ActivatedRoute) { }

  isFormInEditMode():boolean{

    return (!!this.currentItemId);
  }
  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId)
    {//Edit
      this.articleservice.getArticleById(this.currentItemId).then(
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
        titre : new FormControl (item?.titre, [Validators.required]),
        type : new FormControl (item?.type, [Validators.required]),
        dateApparition : new FormControl (item?.dateApparition, [Validators.required]),
        lien : new FormControl (item?.lien, [Validators.required]),
        sourcePdf : new FormControl (item?.sourcePdf, [Validators.required]),
          
      }
    )
  }

  onSubmit():void{
    console.log(this.form.value);
    const ArticleToSave ={...this.currentItem,...this.form.value}
    this.articleservice.SaveArticle(ArticleToSave).then
    (()=>this.router.navigate(['articles/']))
  }
}
