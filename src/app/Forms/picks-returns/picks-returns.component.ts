import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryServiceService } from '../../warehouse/services/inventory-service.service';
import { NgForm } from '@angular/forms';
import { formTransaction } from '../models/form-transaction.model';
import { TransactionService } from '../Services/Transaction/transaction.service';
import { ProjectService } from 'src/app/projects/services/project.service';
import { MessagingService } from 'src/app/services/messaging.service';
import {
  Inventory,
  WarehouseExtension,
} from 'src/app/warehouse/model/inventory.model';

@Component({
  selector: 'app-picks-returns',
  templateUrl: './picks-returns.component.html',
  styleUrls: ['./picks-returns.component.css'],
})
export class PicksReturnsComponent implements OnInit {
  @ViewChild('myForm') signUpForm!: NgForm;
  formTransaction: formTransaction = new formTransaction();
  title = '';

  // FLAGS
  returnFlag: boolean = false; //flag to determine if this is a Return,Pick or Delivery Form
  manuFlag: boolean = false; //flag to determine if manufacturer has been selected
  locationSelected: boolean = false; //flag to detect if location is selected.  Predicate for inventoryOnHand
  productFlag: boolean = false; //displays qty

  // LISTS TO POPULATE FORM
   operators: string[]   = [];
   locationsTo: string[] = [];
   locationFrom: string[] = [];
   manufacturers: string[] = [];
   products: string[] | undefined = [];
   productQty = { full: 0, threeQuarters: 0, half: 0, part: 0};  //Quantities for existing product

  /* Inventory we have depending on where we are returning or picking from
  // Keys are Manufacturers */
   invetoryOnHand: Map<string, WarehouseExtension[] | Inventory[] > = new Map();

  constructor(
    public dialogRef: MatDialogRef<PicksReturnsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private invSer: InventoryServiceService,
    private trSer: TransactionService,
    private projServ: ProjectService,
    private msgService: MessagingService
  ) {
  }

  ngOnInit(): void {
    this.title = this.data.selector;
    this.formTransaction.transaction = this.title;
    this.operators = this.invSer.getOperatorList();
    /*if the form is a Pick, locationsTo-destination cannot contain Warehouse.
      That would make the return form redundant.
      A pick is from the Warehouse or a project TO a project, and only a project*/
    this.locationsTo = [...this.locationFrom] = [...this.projServ.getProjectLists()];
    this.setFormUp();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Populates the manufacturers list
  getManufacturers() {
    this.manufacturers = [...this.invetoryOnHand.keys()];
  }

  /*HERE WE ARE CONCERNED WHETHER THE PRODUCT IS COMING FROM
    THE WAREHOUSE OR A PROJECT.
    And what inventory is on hand at the location */
  getInventoryFromLocation() {
    const location = this.signUpForm.controls['from'].value;
    this.locationSelected = false;
    //If we dont have a location, exit
    if (location === undefined || location === '') return;

    //If we are getting products from the warehouse
    if (location === 'WAREHOUSE') {
      this.invetoryOnHand = this.invSer.getWareHouseInventory();
      this.locationSelected = true;
    } else {
    //Products form a Project
      this.invetoryOnHand = this.projServ.getProjectInventory(location);
    }

    if(this.invetoryOnHand.size > 0)
    {
      this.manufacturers = [...this.invetoryOnHand.keys()];
      this.locationSelected = true;
    }
    else{
      this.msgService.sendMessage(['no-products'])
      this.locationSelected = false;
    }
  }

  /*THIS FUNCTION WILL GET A HOST OF PRODUCTS BASED ON THE MANUFACTURER SELECTED */
  manufacturerSelected() {

    //Check to see if manufacturer has been selected
     let manufacturer = this.signUpForm.controls['manufacturer'].value;

    if (manufacturer !== '') {

       //Check to see if the manufacturer exists on the inventory
        let inventory = this.invetoryOnHand.get(manufacturer);

        // If we have no products then we will return an error
        if (inventory === undefined || inventory === null){
          this.msgService.sendMessage(['no-products']);
          this.manuFlag = false;
          return;
        }

        /*Manufacturer exists, so now we will parse through
          each inventory item and append the product name to
          our product list.  We will also save the products qty */
        else {
          inventory.forEach((element) => {
              if (element.productName !== undefined) {
                this.products?.push(element.productName);
              }
            });
          // Manufacturer has been selected
           this.manuFlag = true;
        }  // else
    }
     // If manufacturer has been deslected, set the flag to false
    else {
       this.manuFlag = false;

       //Reset Products first
        this.products = [];
    }
  }

  /*PRODUCT SELECTED.
    GENERATE THE EXISTING QUANTITIES OF THE PRODUCT WE HAVE SELECTED */
  productSelected(){
    // Returns a Map of products based on manufacturer
    const inventory = this.invetoryOnHand.get(this.formTransaction.manufacturer)

    if(inventory != undefined && inventory.length > 0){

      // Get Quantity
      let productStock = inventory.find( stock => stock.productName === this.formTransaction.product)

      // Assign product stock and productFlag to true
       if(productStock !== undefined) {
        this.productQty = productStock.quantity;
        this.productFlag = true;
       }
    }
  }

  /*DEPENDING ON WHETHER WE ARE IN RETURNS OR PICKS.
    WE WILL SET THE DESTINATION OR FROM PROPERTY
*/
  public setFormUp() {
    this.data.selector === 'Return'
      ? (this.returnFlag = true)
      : this.locationFrom.push('WAREHOUSE');
  }

  onSubmit() {
    console.log(this.signUpForm.controls['operator'])
    if(this.isValidated()){
      /*GET THE FORM READY FOR EXPORT */
      this.formTransaction.operator = this.signUpForm.controls['operator'].value;

      if (this.returnFlag) this.formTransaction.destination = 'WAREHOUSE';
      else this.formTransaction.destination = this.signUpForm.controls['destination'].value;

      this.formTransaction.where = this.signUpForm.controls['from'].value;
      this.formTransaction.date = this.signUpForm.controls['date'].value;
      // this.formTransaction.manufacturer = this.signUpForm.controls['manufacturer'].value;
      // this.formTransaction.product = this.signUpForm.controls['product'].value;

      if(this.formTransaction.where === this.formTransaction.destination){
        this.msgService.sendMessage(['location error','Operation Cancelled.  Cannot send materials from the same place we are receiving them'])
        return;
      }
      //SEND THE FORM
      this.trSer.investigateForm(this.formTransaction);
      this.msgService.sendMessage([this.title, this.formTransaction.where, this.formTransaction.destination])
      this.partialResetOfForm();
    } else {
      this.msgService.sendMessage(['quantity-error','Operation Cancelled: You are exceeding the Quantity of a given product'])
    }

  }

  partialResetOfForm() {
    this.signUpForm.controls['product'].reset();
    this.signUpForm.controls['full'].reset(0);
    this.signUpForm.controls['threeQuarters'].reset(0);
    this.signUpForm.controls['half'].reset(0);
    this.signUpForm.controls['part'].reset(0);
    this.productQty = { full: 0, threeQuarters: 0, half: 0, part: 0}
  }

  /*VALIDATES WHETHER THE QUANTITIES ARE NOT EXCEEDING CURRENT SUPPLY */
  private isValidated(): boolean {

    if(this.formTransaction.full > this.productQty.full)
      return false;
    if(this.formTransaction.tQ > this.productQty.threeQuarters)
      return false;
    if(this.formTransaction.half > this.productQty.half)
      return false;
    if(this.formTransaction.part > this.productQty.part)
      return false;

    return true;
  }
}
