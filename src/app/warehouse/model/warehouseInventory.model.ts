import { WarehouseExtension } from '../model/inventory.model';

export class WarehouseInventory  {
  whLocations: string[] = [
    'ccdX01',
    'ccdX02',
    'ccdX03',
    'ccdX04',
    'ccdX05',
    'ccdX06',
    'ccdX07',
    'ccdX08',
    'ccdX09',
    'ccdX0A',
    'ccdX0B',
    'ccdX0C',
    'ccdX0D',
    'ccdX0E',
    'ccdX0F',
    'ccdX0G',
  ];
  // Holds a string which represents the Manufacturer
  inventory: Map<string, WarehouseExtension[]> = new Map();

  constructor() {
  }

  /*STRICLY ADDS NEW INVENTORY, NO CHECKS FOR PRIOR EXISTENCE */
  addNewInventory(manufacturer: string, inv: WarehouseExtension) {
    inv.location = this.whLocations[Math.floor(Math.random() * 10)]
    this.inventory.set(manufacturer, new Array<WarehouseExtension>(inv));
  }

  addInventory(manufacturer: string, inv: WarehouseExtension) {
    let existingProduct = this.inventory.get(manufacturer);
    // Manufacturer Exists, now we have to check if the product exists of not
    if (existingProduct !== undefined) {
      //If we find the index we can append the product to the existing one
      const index = this.findIndex(existingProduct, inv.productName);
      if (index !== -1) {
        //Inventory exists, append to existing quantity
        this.appendInventory(existingProduct[index], inv);
      } else {
        //Product doesn't exist for Manufacturer, safe to push
        existingProduct.push(inv);
      }
    } else {
      // If we make it here then this product is not in the warehouse and needs to be added
      inv.location = this.whLocations[Math.floor(Math.random() * 10)]
      this.inventory.set(manufacturer, new Array<WarehouseExtension>(inv));
    }
  }

  //Checks to see if the Inventory we are trying to remove exists or not
  removeInventory(manufacturer: string,inv: WarehouseExtension): Promise<boolean> {
    let existingProduct = this.inventory.get(manufacturer);
    return new Promise((res, rej) => {
      // Manufacturer Exists, now we have to check if the product exists of not
      if (existingProduct !== undefined) {
        //If we find the index we can append the product to the existing one
        const index = this.findIndex(existingProduct, inv.productName);
        if (index !== -1) {
          existingProduct[index].quantity.full -= inv.quantity.full;
          existingProduct[index].quantity.threeQuarters -= inv.quantity.threeQuarters;
          existingProduct[index].quantity.half -= inv.quantity.half;
          existingProduct[index].quantity.part -= inv.quantity.part;
          res(true)
        } else {
          rej(false) //product doesn't exist, we cannot remove what doesn't exist
        }
      } else {
        rej(false) // manufacturer doesn't exist, we cannot remove
      }
    });
  }

  appendInventory(existingStock: WarehouseExtension, inv: WarehouseExtension) {
    existingStock.quantity.full += inv.quantity.full;
    existingStock.quantity.threeQuarters += inv.quantity.threeQuarters;
    existingStock.quantity.half += inv.quantity.half;
    existingStock.quantity.part += inv.quantity.part;
  }

  /* SIMPLY FINDS THE INDEX OF THE PRODUCT WE DESIRE IN AN ARRAY OF PRODUCTS*/
  findIndex(wh: WarehouseExtension[], product: string): number {
    return wh.findIndex((node) => {
      return node.productName === product;
    });
  }
}
