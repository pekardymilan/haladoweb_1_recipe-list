import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuidV4 } from 'uuid';
import { Recipe, UnitOfMeasurement } from '../../model/recipe.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../../services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [RecipeService],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.css',
})
export class CreateRecipe implements OnInit {
  readonly formBuilder = inject(FormBuilder);
  readonly router = inject(Router);
  readonly recipeService = inject(RecipeService);

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      ingredients: this.formBuilder.array(
        [this._getIngredientFormGroup()],
        [Validators.minLength(1)]
      ),
    });
  }

  recipeForm!: FormGroup;

  private _getIngredientFormGroup() {
    return this.formBuilder.group({
      id: [uuidV4()],
      name: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unitOfMeasurement: [UnitOfMeasurement.piece, [Validators.required]],
    });
  }

  get ingredientsFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredients() {
    return this.recipeForm.get('ingredients')?.value ?? [];
  }

  get unitOfMeasurements() {
    return Object.values(UnitOfMeasurement);
  }

  get ingredientFormGroups(): FormGroup[] {
    return this.ingredientsFormArray.controls as FormGroup[];
  }

  addIngredient() {
    this.ingredientsFormArray.push(this._getIngredientFormGroup());
  }

  removeIngredient(id: string) {
    const index = this.ingredientsFormArray.controls.findIndex(
      (control) => control.get('id')?.value === id
    );
    if (index !== -1) {
      this.ingredientsFormArray.removeAt(index);
    }
  }

  onCancel() {
    this.router.navigateByUrl('');
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipe: Recipe = this.recipeForm.value;
      this.recipeService
        .createRecipe(recipe)
        .pipe(take(1))
        .subscribe((recipe) => console.log(recipe));
      this.router.navigateByUrl('');
    } else {
      alert('Form is invalid!');
    }
  }
}
