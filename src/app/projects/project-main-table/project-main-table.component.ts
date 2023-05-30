import { Component, OnInit } from '@angular/core';

import { projectInventory } from 'src/app/projects/models/project-inventory.model';
import { ProjectService } from 'src/app/projects/services/project.service';
import { Inventory } from 'src/app/warehouse/model/inventory.model';

@Component({
  selector: 'app-project-main-table',
  templateUrl: './project-main-table.component.html',
  styleUrls: ['./project-main-table.component.css']
})

export class ProjectMainTableComponent implements OnInit {

  test: string[] = ['one','two','three']
  projects: projectInventory[] = [];
  projectID: Array<number> = new Array<number>

  constructor( private projectService: ProjectService){
  }

  ngOnInit(): void {
    this.projects = this.projectService.getActiveProjects();
    this.projectID = this.projectService.getProjectID();
  }

  getProducts(id: number = 0): Inventory[] {
    let inventory: Inventory[] = [];

      this.projects[id].inventory.forEach( product => {
        inventory.push(...product)
      })

    return inventory;
  }
}
