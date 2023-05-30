import { Injectable } from '@angular/core';
import {formTransaction} from '../../models/form-transaction.model'
import {ProjectService} from '../../../projects/services/project.service'
import {InventoryServiceService} from '../../../warehouse/services/inventory-service.service'

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  listOfTransactions: formTransaction[] = [];

  constructor(private prSr: ProjectService, private inSr: InventoryServiceService) { }

  addTransaction(transaction: formTransaction){
    this.listOfTransactions.push(transaction)
  }

  updateTransaction(oldTransaction: formTransaction, newTransaction: formTransaction){
    let index = this.listOfTransactions.indexOf(oldTransaction)
    this.listOfTransactions[index] = newTransaction;
  }

  deleteTransaction(transaction: formTransaction){
    let index = this.listOfTransactions.indexOf(transaction)
    this.listOfTransactions.splice(index,1);
  }

  getAllTransactions(): formTransaction[] {
    return this.listOfTransactions;
  }

  investigateForm(form: formTransaction){
    //First we want to check where the Products are going too
     let destination: string = form.destination;
    //Second, where are the products coming From
     let whereForm: string = form.where;

     //A destination implies it is being added there.
     //Check if we are adding to Warehouse or a Project
     if(destination === "WAREHOUSE")
      this.inSr.inventoryHandler(form, "ADD");
     else
      this.prSr.inventoryHandler(form, "ADD");

      //From implies it is being Removed from there
     //Check if we are from Warehouse or a Project
     if(whereForm === "WAREHOUSE")
     this.inSr.inventoryHandler(form, "REMOVE");
    else
     this.prSr.inventoryHandler(form, "REMOVE");

    //Add the transaction to the list
    this.addTransaction(form);
  }
}
