import { Component } from '@angular/core';
import { HomeComponent } from '../../app/Views/Home/home.component';
import { UserCreation } from '../../app/Services/userCreation.service';
import { Inventory } from '../../app/Services/inventory.service';


@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html'
})

export class InventoryComponent {
  isAddInventory;
  isEditInventory;
  constructor(private inventoryService: Inventory) {
    this.isAddInventory = true;
    this.isEditInventory = false;
  }

  ngOnInit() {
    this.inventoryService.getInventoryList();
    console.log("InventoryInit");
  }

  ChooseAddInventory() {
    var self = this;
    self.isAddInventory = true;
    self.isEditInventory = false;
    
  }

  ChooseEditInventory() {
    var self = this;
    self.isAddInventory = false;
    self.isEditInventory = true;
    
  }
}
