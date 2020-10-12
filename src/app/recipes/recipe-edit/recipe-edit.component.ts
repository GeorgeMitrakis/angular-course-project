import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private logService: LoggingService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id'])
        this.editMode = (params['id'] !== undefined)

        this.logService.log(`RecipeEditComponent.ngOnInit() -> isInEditMode : ${this.editMode}`, this.editMode ? 'green': 'red')
      }
    )
  }

}
