import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Navtab } from '../shared/app-enums.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed:boolean = true;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData(){
    this.dataStorageService.storeRecipes()
  }
}
