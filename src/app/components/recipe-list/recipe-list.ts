import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { forkJoin, Observable, take } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RecipeCard, MatGridListModule, MatButtonModule, MatIconModule],
  providers: [RecipeService],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  //ngOnInit runs when the component is loaded, this is where we should initialize any non constant variable
  ngOnInit(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }

  //we store the observable so we can use it's values with the async pipe
  recipes$!: Observable<Recipe[]>;
  //any component value which can be modified by the user should be stored in signals
  selectedRecipes = signal<number[]>([]);

  onCreate() {
    this.router.navigateByUrl('/create');
  }

  onSelect(recipeId: number) {
    //we can read signal values with () getter
    if (this.selectedRecipes().includes(recipeId)) {
      //we can set signal values using set() or update()
      this.selectedRecipes.set(this.selectedRecipes().filter((id) => id !== recipeId));
    } else {
      //immutability is crucial when working with signals, we cannot just push an item to the signal,
      // we need to create a copy of the instance and re set the updated array
      this.selectedRecipes.set([...this.selectedRecipes(), recipeId]);
    }
  }

  onDeleteMany() {
    //forkJoin waits for all of the observables given in parameter and then emit
    forkJoin(this.selectedRecipes().map((recipeId) => this.recipeService.deleteRecipe(recipeId)))
      //we can either wait for only 1 emitted value, or manually unsubscribe on destroy for example
      .pipe(take(1))
      .subscribe(() => {
        alert('Successfully deleted!');
        this.recipes$ = this.recipeService.getRecipes();
      });

    this.selectedRecipes.set([]);
  }
}
