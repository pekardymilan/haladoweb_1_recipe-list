import { Component, input, output } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-recipe-card',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  //we use input() signal to receive data from the parent component, it is a strictly typed signal
  //.required causes ts error if it is not set in the parent component
  readonly recipe = input.required<Recipe>();

  //we use output to communicate with parent, we  can listen to actions in the parent component which contains the values we emit here
  selectAction = output<number>();

  onSelect() {
    if (!this.recipe().id) return;
    //we emit values by calling .emit() of the output
    this.selectAction.emit(this.recipe().id!);
  }
}
