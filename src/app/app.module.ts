import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {appRouterModule} from '../app/router/router.module';
import {customFormModule} from '../app/Forms/module/form.module'

import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home/home.component';
import { WarehouseMainTableComponent } from './warehouse/warehouse-main-table/warehouse-main-table.component';
import { ProjectMainTableComponent } from './projects/project-main-table/project-main-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WarehouseMainTableComponent,
    ProjectMainTableComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    appRouterModule,
    MatExpansionModule,
    MatCardModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbCollapseModule,
    customFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
