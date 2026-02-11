import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { recipes } from '../constants/data';

//our fake db should implement InMemoryDbService and set the mock entities to work with
@Injectable()
export class InMemoryRecipeService implements InMemoryDbService {
  createDb() {
    const db = {
      recipes,
    };
    return db;
  }
}
