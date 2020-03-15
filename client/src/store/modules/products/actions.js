import {
  FetchRecommendationsRequest, FetchRecommendationsSuccess, FetchRecommendationsFailure,
  FetchProductsByCategoryRequest, FetchProductsByCategorySuccess, FetchProductsByCategoryFailure,
  FetchProductsByQueryRequest, FetchProductsByQuerySuccess, FetchProductsByQueryFailure,
  FetchProductByIdRequest, FetchProductByIdSuccess, FetchProductByIdFailure,
} from './constants';
import client from '../../../network';
import get from 'lodash/get';

export function fetchRecommendations() {
  return (dispatch, getState) => {
    const state = getState();

    if (state.products.recommendations.length !== 0) return;
    
    dispatch({type: FetchRecommendationsRequest});
    
    client.get('/api/recommendations')
      .then(response => {
        dispatch({type: FetchRecommendationsSuccess, recommendations: response.data.recommendations});
      }).catch(error => {
      dispatch({type: FetchRecommendationsFailure, error: error.response.data.error});
    });
  }
}

export function fetchProductsByCategory(category) {
  return (dispatch, getState) => {
    const state = getState();
    
    if (state.products.byCategory[category]) return;
    
    dispatch({type: FetchProductsByCategoryRequest, category});
    
    client.get('/api/products', { params: { subcategory: category } })
      .then(response => {
        dispatch({type: FetchProductsByCategorySuccess, category, products: response.data.products});
      }).catch(error => {
      dispatch({type: FetchProductsByCategoryFailure, category, error: error.response.data.error});
    });
  }
}

export function fetchProductsByQuery(query) {
  return (dispatch, getState) => {
    const state = getState();
    
    if (get(state, `products.byQuery[${query}].fetching`) === false) return;
    
    dispatch({type: FetchProductsByQueryRequest, query});
    
    client.get('/api/products', { params: { query } })
      .then(response => {
        dispatch({type: FetchProductsByQuerySuccess, query, products: response.data.products});
      }).catch(error => {
      dispatch({type: FetchProductsByQueryFailure, query, error: error.response.data.error});
    });
  }
}

export function fetchProductById(id) {
  return (dispatch, getState) => {
    const state = getState();
    
    if (get(state, `products.byId[${id}].fetching`) === false) return;
    
    dispatch({type: FetchProductByIdRequest, id});
    
    client.get(`/api/products/${id}`)
      .then(response => {
        dispatch({type: FetchProductByIdSuccess, id, product: response.data.product});
      }).catch(error => {
      dispatch({type: FetchProductByIdFailure, id, error: error.response.data.error});
    });
  }
}
