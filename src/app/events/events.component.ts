import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/models/article.model';
import { GLOBAL } from '../app-config';
import { EvenementService } from 'src/services/evenement.service';
import { ConfirmDialogComponent } from 'src/@root/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Evenement } from 'src/models/evenement.model';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  Source: MatTableDataSource<Evenement>;

  displayedColumns: string[] = ['id', 'Titre', 'Date', 'Lieu','Icon'];
  //Source:Member[]=[]

  constructor( private eventS:EvenementService, private dialog : MatDialog) {
    // Assign the data to the data source for the table to render
    this.Source = new MatTableDataSource(this.eventS.tab);
   }

  ngOnInit(): void {
    //this.Source=this.memberS.tab;
  }

  onRemouveAccount(id:any){
    // this.memberS.RemoveMemberById(id).then
    // (()=> this.fetchDataSource());
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      height : '200px',
      width : '300px',
    });

    dialogRef.afterClosed().pipe().subscribe(isDeleteConfirmed => {
      console.log (isDeleteConfirmed)
    if (isDeleteConfirmed){
      this.eventS.RemoveEventById(id).then(()=> this.fetchDataSource());
    }
  });
  }

  fetchDataSource() : void{
    this.eventS.GetAllevents().then
    ((data) => this.Source.data=data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Source.filter = filterValue.trim().toLowerCase();
  }
}
