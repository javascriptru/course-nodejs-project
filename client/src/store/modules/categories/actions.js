import {
  FetchCategoriesRequest, FetchCategoriesSuccess, FetchCategoriesFailure
} from './constants';
import client from '../../../network';

export function fetchCategories() {
  return (dispatch, getState) => {
    const state = getState();
    
    if (state.categories.isLoading) return;
    if (state.categories.items.length !== 0) return;
    
    dispatch({type: FetchCategoriesRequest});
    
    client.get('/api/categories')
      .then(response => {
        dispatch({type: FetchCategoriesSuccess, categories: response.data.categories});
      }).catch(error => {
        dispatch({type: FetchCategoriesFailure, error: error.response.data.error});
      });
  }
}
