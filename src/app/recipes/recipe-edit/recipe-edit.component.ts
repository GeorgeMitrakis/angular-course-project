import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.editMode = (params['id'] !== undefined);
        if(this.editMode){
          this.initForm(this.recipeService.getRecipe(this.id));
        }
        else{
          // this.initForm(new Recipe('','','',[]));
          this.initForm({name:'',imagePath:'',description:'', ingredients:[]});
        }

        this.logService.log(`RecipeEditComponent.ngOnInit() -> isInEditMode : ${this.editMode}`, this.editMode ? 'green': 'red')
      }
    )
  }

  private initForm({name, imagePath, description, ingredients}: Recipe){    
    this.recipeForm = this.fb.group({
      'name': [name, Validators.required],
      'imagePath': [imagePath, Validators.required],
      'description': [description, Validators.required],
      'ingredients': this.fb.array(
        ingredients.map((ingredient) => this.fb.group({
            'name': [ingredient.name, Validators.required],
            'amount': [ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
          })
        )
      )
    })
    
    // this.recipeForm = new FormGroup({
    //   'name': new FormControl(name),
    //   'imagePath': new FormControl(imagePath),
    //   'description': new FormControl(description),
    //   'ingredients': new FormArray(
    //     ingredients.map((ingredient) => new FormGroup({
    //         'name': new FormControl(ingredient.name),
    //         'amount': new FormControl(ingredient.amount)
    //       })
    //     )
    //   )
    // })   
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        'name': ['', Validators.required],
        'amount': ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
      })
    )
    // (<FormArray>this.recipeForm.get('ingredients')).push(
    //   new FormGroup({
    //     'name': new FormControl(''),
    //     'amount': new FormControl('')
    //   })
    // )
  }

  onSubmit(){
    console.log(this.recipeForm)
  }
}
