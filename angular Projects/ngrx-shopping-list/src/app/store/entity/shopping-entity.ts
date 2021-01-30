import { ShoppingItem } from './../models/shopping-item.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ShoppingState extends EntityState<ShoppingItem>{
    loading:boolean,
    error:Error
}

export const adapter:EntityAdapter<ShoppingItem> = createEntityAdapter<ShoppingItem>();