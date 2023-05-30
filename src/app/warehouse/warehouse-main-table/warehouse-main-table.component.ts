import { Component, OnInit} from '@angular/core';
import {InventoryServiceService} from '../services/inventory-service.service'
import {WarehouseInventory} from '../model/warehouseInventory.model'
import { WarehouseExtension } from '../model/inventory.model';

@Component({
  selector: 'app-warehouse-main-table',
  templateUrl: './warehouse-main-table.component.html',
  styleUrls: ['./warehouse-main-table.component.css']
})

export class WarehouseMainTableComponent implements OnInit {

  warehouse: WarehouseInventory = new WarehouseInventory;

  constructor(private inventoryService: InventoryServiceService){}

  ngOnInit(): void {
     this.warehouse =  this.inventoryService.getWarehouse()
  }

  warehouseProducts(): WarehouseExtension[] {
    let products: WarehouseExtension[] = [];
    this.warehouse.inventory.forEach(element => {
      products.push(...element);
    });
    return products;
  }

}
