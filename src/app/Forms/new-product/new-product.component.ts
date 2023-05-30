import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef }        from '@angular/material/dialog';
import { InventoryServiceService }              from '../../warehouse/services/inventory-service.service'
import { NgForm }                               from '@angular/forms';
import { formTransaction }                      from '../models/form-transaction.model'
import {TransactionService}                     from '../Services/Transaction/transaction.service'

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  @ViewChild('myForm')myForm!: NgForm;
  manufacturers: string[] = [];
  manufacturerSelectedflag: boolean = false;

  constructor(private inventoryService: InventoryServiceService){}

  ngOnInit(): void {
    this.manufacturers = this.inventoryService.getManufacturers();
  }

  manufacturerSelected(){
    if(this.myForm.control.value['existingManufacturer'] !== '')
      this.manufacturerSelectedflag = true;
    else
      this.manufacturerSelectedflag = false;
  }

  onSubmit(form: NgForm) {
    let data: { manufacturer: string, product: string}  
    
    let prod = form.controls['product'].value
    let man: string;

    if (this.manufacturerSelectedflag)
      man = form.controls['existingManufacturer'].value
    else
      man =form.controls['manufacturer'].value
    
      this.inventoryService.createNewProductAndManufacturer(data = {manufacturer: man, product: prod})
  }
}
