import { Component, OnDestroy } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import {PicksReturnsComponent} from '../../Forms/picks-returns/picks-returns.component'
import { NewProductComponent } from 'src/app/Forms/new-product/new-product.component';
import { ProjectService } from 'src/app/projects/services/project.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy{

  isMenuCollapsed: boolean = true;

  // Controls for the active projects table
   activeProjects: boolean = true;
   buttonTitle = "Hide Table";

  //New Project Event Listener.  When activated, it will reload the projects table
   newProjectListener: Subscription = this.pS.newProjectSubject.subscribe( {next: value => this.reloadTable()});

  constructor(public dialog: MatDialog, private pS: ProjectService){

  }
  ngOnDestroy(): void {
    this.newProjectListener.unsubscribe()
  }


  openTransactionDialog(selection: string): void {
    const dialogRef = this.dialog.open(PicksReturnsComponent,
                                      {data: {selector: selection}})
      dialogRef.afterClosed().subscribe( result => {
      })
  }

  openNewProductDialog(): void {
    const dialogRef = this.dialog.open(NewProductComponent)
      dialogRef.afterClosed().subscribe( result => {
      })
  }

  // Hides or Displays the active prorjects table
  toggleProjects() {
    this.activeProjects = !this.activeProjects;
    this.buttonTitle === "Hide Table" ? this.buttonTitle = "Show Table" : this.buttonTitle = "Hide Table";
  }

  //When creating a new project we will reload the table
  reloadTable() {
    this.activeProjects = false;
    setTimeout( ()=> {
      this.activeProjects = true, 500
    });
  }
}
