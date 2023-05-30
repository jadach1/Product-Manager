import { Quantity } from '../model/quantity.model';

// Hold the product name and Inventory
export interface Inventory {
  productName: string;
  quantity: Quantity;
}

// Holds the Manufacturer and the list of iventory associated with said manufacturer
export interface InventoryMaster {
  inventory: Map<string, Inventory[] | WarehouseExtension[]>;
}

// Maps the inventory to either a project
export interface InventoryMap {
  location: Map<string, InventoryMaster[]>;
}

export interface WarehouseExtension extends Inventory {
  location: string;
}
