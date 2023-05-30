import { Injectable, OnDestroy } from '@angular/core';
import { WarehouseExtension, Inventory } from '../model/inventory.model';
import { Lists } from '../model/Lists.model';
import { WarehouseInventory } from '../model/warehouseInventory.model';
import { formTransaction } from '../../Forms/models/form-transaction.model';
import { ProjectService } from 'src/app/projects/services/project.service';
import { MessagingService } from 'src/app/services/messaging.service';
@Injectable({
  providedIn: 'root',
})
export class InventoryServiceService implements OnDestroy {
  lists: Lists = new Lists();
  inventories: WarehouseExtension[] = [];
  warehouse: WarehouseInventory = new WarehouseInventory();

  constructor(
    private msgService: MessagingService,
    private projectService: ProjectService
  ) {
    /*THIS UGLY WAY OF GENERATING CODE IS IN PLACE FOR DEMO PURPOSES ONLY */
    this.generateInventory().then((data) => {
      for (let i = 0; i < 6; i++) {
        if (i === 0) this.warehouse.addNewInventory('GRACE', data[0]);
        else this.warehouse.addInventory('GRACE', data[i]);
      }
      for (let i = 6; i < 9; i++) {
        if (i === 0) this.warehouse.addNewInventory('RIW', data[0]);
        else this.warehouse.addInventory('RIW', data[i]);
      }
      for (let i = 9; i < 16; i++) {
        if (i === 0) this.warehouse.addNewInventory('NEWTON', data[0]);
        else this.warehouse.addInventory('NEWTON', data[i]);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('Destroying Inventory Service');
  }

  generateInventory(): Promise<WarehouseExtension[]> {
    return new Promise<WarehouseExtension[]>((resolve, rej) => {
      let inventory: WarehouseExtension[] = [
        // INTEGRITANK
        {
          location: 'C1X01',
          productName: 'INTEGRITANK PART A RESIN 24KG',
          quantity: { full: 10, threeQuarters: 0, half: 2, part: 1 },
        },
        {
          location: 'C1X02',
          productName: 'INTEGRITANK PART B YELLOW 23KG',
          quantity: { full: 5, threeQuarters: 0, half: 1, part: 2 },
        },
        {
          location: 'C1X03',
          productName: 'INTEGRITANK PART B WHITE 23KG',
          quantity: { full: 4, threeQuarters: 2, half: 1, part: 0 },
        },
        {
          location: 'C1X04',
          productName: 'INTEGRITANK PART 1 PRIMER 20KG',
          quantity: { full: 10, threeQuarters: 0, half: 1, part: 0 },
        },
        {
          location: 'C1X05',
          productName: 'INTEGRITANK BPO POWDER 400G',
          quantity: { full: 21, threeQuarters: 2, half: 1, part: 0 },
        },
        {
          location: 'C1X06',
          productName: 'INTEGRITANK PART C CATALYST 900G',
          quantity: { full: 10, threeQuarters: 0, half: 0, part: 0 },
        },
        // SHEET SEAL
        {
          location: 'C1X07',
          productName: 'SHEETSEAL PRIMER 5L',
          quantity: { full: 4, threeQuarters: 0, half: 0, part: 0 },
        },
        {
          location: 'C1X08',
          productName: 'SHEETSEAL PRIMER 25L',
          quantity: { full: 1, threeQuarters: 1, half: 1, part: 1 },
        },
        {
          location: 'C1X09',
          productName: 'SHEETSEAL 225',
          quantity: { full: 11, threeQuarters: 1, half: 3, part: 2 },
        },
        // NEWTON CAVITY
        {
          location: 'C1X10',
          productName: 'CDM 2M x 20M 8MM',
          quantity: { full: 8, threeQuarters: 0, half: 0, part: 3 },
        },
        {
          location: 'C1X11',
          productName: 'WALL FIXING PLUGS x100',
          quantity: { full: 2, threeQuarters: 0, half: 0, part: 1 },
        },
        {
          location: 'C1X12',
          productName: 'BASEDRAIN',
          quantity: { full: 22, threeQuarters: 0, half: 0, part: 0 },
        },
        {
          location: 'C1X13',
          productName: 'DOUBLE-SIDED SEALING BUTYL TAPE',
          quantity: { full: 10, threeQuarters: 0, half: 0, part: 0 },
        },
        {
          location: 'C1X14',
          productName: 'OVERTAPE 150MM x 20M',
          quantity: { full: 10, threeQuarters: 0, half: 0, part: 0 },
        },
        {
          location: 'C1X15',
          productName: 'FIREBRAND INSULATION BOARDS',
          quantity: { full: 35, threeQuarters: 0, half: 0, part: 0 },
        },
        {
          location: 'C1X16',
          productName: 'R20 2M x 20M',
          quantity: { full: 3, threeQuarters: 0, half: 0, part: 2 },
        },
      ];

      resolve(inventory);
    });
  }

  /***************************************
   * GETTER FUNCTIONS
   * *********************************** */

  //Returns the address of the Warehouse.  Display changes without implementing an observable
  getWarehouse(): WarehouseInventory {
    return this.warehouse;
  }

  //Returns Only tjhe inventory inside the warehouse
  getWareHouseInventory(): Map<string,WarehouseExtension[]> {
    console.log(this.warehouse);
    return this.warehouse.inventory;
  }

  //Returns all the operators
  getOperatorList(): string[] {
    return this.lists.operatorsList;
  }

  //Gets all the products based on a manufacturer
  //NOTE*  THIS IS NOT RELATED TO THE WAREHOUSE INVENTORY
  getProductList(manufacturer: string): string[] | undefined {
    return this.lists.productList.get(manufacturer);
  }

  //Gets all the manufacturers inside the warehouse
  //*NOTE THIS IS NOTE RELATED TO THE WAREHOUSE INVENTORY
  getManufacturers(): string[] {
    return Array.from(this.lists.productList.keys());
  }

  /*FORM HANDLER  */
  inventoryHandler(form: formTransaction,action: string) {
    let manufacturer = form.manufacturer;
    // let destination: string = form.destination;
    // let whereForm: string = form.where;

    let warehouseCargo: WarehouseExtension = {
      productName: form.product,
      location: 'cx091', // just hard coded for the sake of example
      quantity: {
        full: form.full,
        threeQuarters: form.tQ,
        half: form.half,
        part: form.part,
      },
    };

    if(action === "ADD"){
      this.warehouse.addInventory(manufacturer, warehouseCargo);
    } else if(action === "REMOVE"){
      this.warehouse.removeInventory(manufacturer, warehouseCargo)
                    .catch((e) =>
                                this.msgService.sendMessage(['not-found-warehouse'])
                        );
    }

  }

  /*CHECKS TO SEE IF A MANUFACTURER AND PRODUCT PAIRING EXISTS AND APPENDS THEM ACCORDINGLY */
  createNewProductAndManufacturer(data: {
    manufacturer: string;
    product: string;
  }) {
    //First we will see if the manufacturer exists
    let manufacturerInventory = this.lists.productList.get(data.manufacturer);
    if (manufacturerInventory === undefined)
     //It appears this particular manufacturer doesn't exist so we will create them
      this.lists.productList.set(
         data.manufacturer,
         new Array<string>(data.product)
      );
    /* So we know the manufacturer exits.
      Check to see if the product exists.
      Only concerned about product duplcation here.
      1 product may have the same name across multiple manufacturers ie metal primer
    */
    else
    /*Here we will go through each product this particular manufacturer has
    //and if we find a duplicate we will throw an error*/
      try {
        for (let i = 0; i < manufacturerInventory.length; i++) {
          if (manufacturerInventory[i] === data.product) {
            throw (
              'Error product ' +
              data.product +
              ' Already exists within manufacturer ' +
              data.manufacturer
            );
          }
        }
        /*The product is indeed new, so we will push it to the
          array of items in the manufacturers product list
          And send a message to the user.*/
        this.msgService.sendMessage(['new-product'])
        manufacturerInventory.push(data.product);
      } catch (error) {
        console.log(error);
        this.msgService.sendMessage(['duplicate',<string>error])
      }
  }
}
