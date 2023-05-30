import {Inventory} from '../../warehouse/model/inventory.model'


export class projectInventory {

    projectName: string = "";
    inventory: Map<string, Inventory[]>=new Map();


    constructor(manufacturer: string = "", inventory: Inventory[] = [],name: string = "") {
        this.projectName = name;
        this.inventory.set(manufacturer,inventory);
    }

    addInventory(manufacturer: string, inv: Inventory) {
      console.log("adding inventory")
      let existingProduct = this.inventory.get(manufacturer);
      // Manufacturer Exists, now we have to check if the product exists of not
      if (existingProduct !== undefined) {
        //If we find the index we can append the product to the existing one
        const index = this.findIndex(existingProduct, inv.productName);
        if (index !== -1) {
          this.appendInventory(existingProduct[index], inv);
        } else {
          existingProduct.push(inv);
        }
      } else {
        // If we make it here then this product is not in the warehouse and needs to be added
        this.inventory.set(manufacturer, new Array<Inventory>(inv));
        console.log("creating new inventory")
      }
    }

    appendInventory(existingStock: Inventory | undefined, inv: Inventory) {
      if(existingStock === undefined) {
        console.log("no inventory poject inventory model")
        return;
      }

      existingStock.quantity.full += inv.quantity.full;
      existingStock.quantity.threeQuarters += inv.quantity.threeQuarters;
      existingStock.quantity.half += inv.quantity.half;
      existingStock.quantity.part += inv.quantity.part;
    }

      //Checks to see if the Inventory we are trying to remove exists or not
  removeInventory(existingStock: Inventory | undefined, inv: Inventory) {
          if(existingStock === undefined) return;
          existingStock.quantity.full -= inv.quantity.full;
          existingStock.quantity.threeQuarters -= inv.quantity.threeQuarters;
          existingStock.quantity.half -= inv.quantity.half;
          existingStock.quantity.part -= inv.quantity.part;
  }

     /* SIMPLY FINDS THE INDEX OF THE PRODUCT WE DESIRE IN AN ARRAY OF PRODUCTS*/
  findIndex(inv: Inventory[], product: string): number {
    return inv.findIndex((node) => {
      node.productName === product;
    });
  }

}
