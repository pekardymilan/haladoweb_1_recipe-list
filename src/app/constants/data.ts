import { Recipe, UnitOfMeasurement } from '../model/recipe.model';

export const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Pancakes',
    description: 'Fluffy breakfast pancakes with syrup.',
    isLiked: false,
    ingredients: [
      { name: 'Flour', quantity: 200, unitOfMeasurement: UnitOfMeasurement.g },
      { name: 'Milk', quantity: 300, unitOfMeasurement: UnitOfMeasurement.ml },
      { name: 'Eggs', quantity: 2, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Sugar', quantity: 2, unitOfMeasurement: UnitOfMeasurement.tableSpoon },
    ],
  },
  {
    id: 2,
    name: 'Tomato Soup',
    description: 'Simple creamy tomato soup.',
    isLiked: false,
    ingredients: [
      { name: 'Tomatoes', quantity: 500, unitOfMeasurement: UnitOfMeasurement.g },
      { name: 'Onion', quantity: 1, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Garlic', quantity: 2, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Olive Oil', quantity: 2, unitOfMeasurement: UnitOfMeasurement.tableSpoon },
    ],
  },
  {
    id: 3,
    name: 'Fruit Smoothie',
    description: 'Refreshing banana & strawberry smoothie.',
    isLiked: false,
    ingredients: [
      { name: 'Banana', quantity: 1, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Strawberries', quantity: 150, unitOfMeasurement: UnitOfMeasurement.g },
      { name: 'Yogurt', quantity: 200, unitOfMeasurement: UnitOfMeasurement.ml },
      { name: 'Honey', quantity: 1, unitOfMeasurement: UnitOfMeasurement.tableSpoon },
    ],
  },
];
