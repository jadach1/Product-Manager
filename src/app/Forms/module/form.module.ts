import { NgModule } from '@angular/core';
import { PicksReturnsComponent } from '../picks-returns/picks-returns.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { messageCenterComponent } from '../Messages/message-pop-up-tab.component';
import { OperatorComponent } from '../picks-returns/Operator/operator/operator.component';

import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PicksReturnsComponent,
    messageCenterComponent,
    NewProductComponent,
    OperatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  exports: [],
})
export class customFormModule {}
