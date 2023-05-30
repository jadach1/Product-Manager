import { Injectable } from '@angular/core';
import {Inventory} from '../../warehouse/model/inventory.model'
import {projectInventory} from '../models/project-inventory.model'
import {formTransaction} from '../../Forms/models/form-transaction.model'
import { Lists } from 'src/app/warehouse/model/Lists.model';
import { MessagingService } from 'src/app/services/messaging.service';
import { Subject } from 'rxjs';

/*FOR DEMO PURPOSES WE HAVE HARD CODED OUR DESIRED INVENTORY  */
const inventoryGrace: Inventory[] = [
     // INTEGRITANK
     {
      productName: 'INTEGRITANK PART A RESIN 24KG',
      quantity: { full: 10, threeQuarters: 0, half: 0, part: 0}
    },
    {
      productName: 'INTEGRITANK PART B YELLOW 23KG',
      quantity: { full: 5, threeQuarters: 0, half: 0, part: 0}
    },
    {
      productName: 'INTEGRITANK PART B WHITE 23KG',
      quantity: { full: 5, threeQuarters: 0, half: 0, part: 0}
    },
    {
      productName: 'INTEGRITANK PART 1 PRIMER 20KG',
      quantity: { full: 5, threeQuarters: 0, half: 1, part: 0}
    },
    {
      productName: 'INTEGRITANK BPO POWDER 400G',
      quantity: { full: 10, threeQuarters: 0, half: 0, part: 0}
    },
    {
      productName: 'INTEGRITANK PART C CATALYST 900G',
      quantity: { full: 10, threeQuarters: 0, half: 0, part: 0}
    }
  ]

 const inventoryRIW: Inventory[] = [
   // SHEET SEAL
   {
    productName: 'SHEETSEAL PRIMER 5L',
    quantity: { full: 4, threeQuarters: 0, half: 0, part: 0}
  },
  {
    productName: 'SHEETSEAL PRIMER 25L',
    quantity: { full: 1, threeQuarters: 1, half: 1, part: 1}
  },
  {
    productName: 'SHEETSEAL 225',
    quantity: { full: 3, threeQuarters: 0, half: 0, part: 1}
  }
 ]

 const inventoryNewton: Inventory[] = [
   // NEWTON CAVITY
   {
    productName: 'CDM 2M x 20M 8MM',
    quantity: { full: 2, threeQuarters: 0, half: 0, part: 0}
  },
  {
    productName: 'WALL FIXING PLUGS x100',
    quantity: { full: 2, threeQuarters: 0, half: 0, part: 0}
  },
  {
    productName: 'BASEDRAIN',
    quantity: { full: 8, threeQuarters: 0, half: 0, part: 0}
  },
  {
    productName: 'DOUBLE-SIDED SEALING BUTYL TAPE',
    quantity: { full: 5, threeQuarters: 0, half: 0, part: 0}
  },
  {
    productName: 'OVERTAPE 150MM x 20M',
    quantity: { full: 8, threeQuarters: 0, half: 0, part: 0}
  },
  {
    productName: 'FIREBRAND INSULATION BOARDS',
    quantity: { full: 35, threeQuarters: 0, half: 0, part: 0}
  },
 {
    productName: 'R20s 2M x 20M',
     quantity: { full: 0, threeQuarters: 0, half: 0, part: 0}
  },
]

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: projectInventory[]= [];
 // projects: Subject<projectInventory[]> = new Subject<projectInventory[]>();
  list: Lists = new Lists;
  newProjectSubject: Subject<boolean> = new Subject<boolean>();

  /*THIS UNCONFORMED WAY OF GENERATING DATA IS STRICTLY FOR DEMO PURPOSES */
  constructor(private msgService: MessagingService) {

    // Takes 3 parameters.  Manufacturer Name, Inventory Array, Project Name
    this.projects.push(new projectInventory('GRACE',inventoryGrace,this.list.projectList[4]))
    this.projects.push(new projectInventory('RIW',inventoryRIW,this.list.projectList[1]))
    this.projects.push(new projectInventory('NEWTON',inventoryNewton,this.list.projectList[3]))
  }

  //RETURNS ALL PROJECT NAMES
  getProjectLists(): string[] {
    return this.list.projectList;
  }

  //RETURNS A LIST OF INVENTORY BASED ON A PROJECT
  getProjectInventory(name: string): Map<string,Inventory[]> {
    const index = this.projects.findIndex( project => project.projectName === name)
    if (index != -1 )
      return this.projects[index].inventory;
    else
      return new Map<string, Inventory[]>()
  }

  //RETURNS AN ARRAY BASED ON LENGTH OF PROJECTS WE HAVE ACTIVE
  getProjectID(): Array<number> {
    let array = new Array<number>
    for(let i = 0; i < this.projects.length; i++){
      array.push(i)
    }
    return array;
  }


  getActiveProjects(): projectInventory[] {
    return this.projects;
  }

  getActiveProject(name: string): projectInventory {
    const index=  this.projects.findIndex( project => project.projectName === name )
    if(index != -1)
      return this.projects[index]
    else
      return new projectInventory;
  }

  /*THIS IS A BULWARK.  IN CASE WE ARE SENDING MATERIAL TO A SITE
  WHICH IS LISTED BUT HAS NO INVENTORY, SO AN INSTANCE HAS NOT BEEN CREATED YET
  . CREATES AN INSTANCE OF THE PROJECT WE ARE LOOKING FOR*/
  createNewProject(newInventory: formTransaction){
    let tempInventory: Inventory[] = [];
    let manufacturer: string = newInventory.manufacturer;
    let name: string = newInventory.destination;

    tempInventory.push({
      productName: newInventory.product,
      quantity: {
                  full:          newInventory.full,
                  threeQuarters: newInventory.tQ,
                  half:          newInventory.half,
                  part:          newInventory.part
                }
    });
      this.projects.push(new projectInventory(manufacturer, tempInventory, name))
      this.newProjectSubject.next(true);
  }

  inventoryHandler(form: formTransaction,action: string) {
    // Copy relevant information
    let manufacturer = form.manufacturer;
    let inventoryCargo: Inventory = {
      productName: form.product,
      quantity: {
        full: form.full,
        threeQuarters: form.tQ,
        half: form.half,
        part: form.part,
      },
    };
    let destination: string = form.destination;
    let whereForm: string = form.where;

    if(action === "ADD"){
      //Grab the project located in destination
        let tempProject: projectInventory = this.getActiveProject(destination);

    //NEW PROJECT
      if(tempProject.projectName === ""){

        //Project doesn't exist, we will create it and append the inventory
         this.projects.push(new projectInventory(manufacturer, [inventoryCargo], destination))
         this.newProjectSubject.next(true);

      } else {
        //Project exists, so we will check to see if the manufacturer exists
          // grab the manufacturer
          let tempInventory: Inventory[] | undefined = tempProject.inventory.get(manufacturer);
          if(tempInventory != undefined){
              let index = tempInventory.findIndex( cargo => cargo.productName === inventoryCargo.productName)

              if(index !== -1){
                //We located the product, now we will append it to the existing product
                tempProject.appendInventory(tempInventory[index],inventoryCargo)
              }
              else {
              //It doesn't exist, so we will add the new product
                tempProject.addInventory(manufacturer, inventoryCargo)
              }
          } else {
            // The manufacturer doesn't exist, so we will add
            tempProject.addInventory(manufacturer, inventoryCargo)
          }
    }
  } else if(action === "REMOVE"){
    //Grab the project we want to remove ivnentory from
      let tempProject: projectInventory = this.getActiveProject(whereForm);

      // If the project doesn't exist send an error
      if(tempProject.projectName === ""){
      this.msgService.sendMessage(['project-non-exist','The project doesnt exist so we have no way of removing any inventory.  operation cancelled'])
      } else {
      //check to see if manufacturer exists
          // grab the manufacturer
          let tempInventory: Inventory[] | undefined = tempProject.inventory.get(manufacturer);
          if(tempInventory != undefined){
          //We have a Manufacturer,
            let index = tempInventory.findIndex( cargo => cargo.productName === inventoryCargo.productName)

          //now let us see if the Products exist
            if(index != -1){
              //We located the product, now we will append it to the existing product
              tempProject.removeInventory(tempInventory[index],inventoryCargo)
            }
            else {
              //It doesn't exist, so we display an error
              this.msgService.sendMessage(['project-non-exist','The project doesnt exist so we have no way of removing any inventory.  operation cancelled'])
            }
          }
      }
  }

  }
}
