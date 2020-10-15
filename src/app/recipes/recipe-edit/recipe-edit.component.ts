import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { LoggingService } from 'src/app/logging.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode:boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private logService: LoggingService,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.editMode = (params['id'] !== undefined);
        this.initForm();

        this.logService.log(`RecipeEditComponent.ngOnInit() -> isInEditMode : ${this.editMode}`, this.editMode ? 'green': 'red')
      }
    )
  }

  private initForm(){    
    if(this.editMode){

      const recipe: Recipe = this.recipeService.getRecipe(this.id)
      const ingredientsFormGroupsArray = (
        recipe['ingredients'] ? 
        recipe.ingredients.map((ingredient) => new FormGroup({ 
            'name' : new FormControl(ingredient.name), 
            'amount': new FormControl(ingredient.amount)
          })
        ) : []
      )

      this.recipeForm = new FormGroup({
        'name': new FormControl(recipe.name),
        'imagePath': new FormControl(recipe.imagePath),
        'description': new FormControl(recipe.description),
        'ingredients': new FormArray(ingredientsFormGroupsArray)
      })
      
    }
    else{
      this.recipeForm = new FormGroup({
        'name': new FormControl(''),
        'imagePath': new FormControl(''),
        'description': new FormControl(''),
        'ingredients': new FormArray([])
      })
    }
    
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    console.log(this.recipeForm)
  }
}
