import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/member.model';
import { MemberService } from 'src/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-article-affect',
  templateUrl: './article-affect.component.html',
  styleUrls: ['./article-affect.component.css']
})
export class ArticleAffectComponent implements OnInit {

  selectedValue: string="";
  Members: Member[]=[];
  currentItemId:string="";
  item:any;

  
  constructor(private memberService : MemberService, private activatedRoute :ActivatedRoute, private articleService : ArticleService,private router : Router) { }

  ngOnInit(): void {
    this.memberService.GetAllmembers().then(data => this.Members=data)
    }

add():void{
  this.currentItemId=this.activatedRoute.snapshot.params.id;
  if(!! this.currentItemId){
    this.articleService.getArticleById(this.currentItemId).then( item => 
      {this.item=item ;
       this.item.auteur=this.selectedValue;
       console.log(this.item.auteur, this.item.id );
       this.articleService.addArticleToMember(this.item).then 
       (()=> this.router.navigate(['/articles']))
      });}
}
}