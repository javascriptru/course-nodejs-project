import {
  FetchRecommendationsSuccess,
  FetchProductsByCategorySuccess,
  FetchProductsByQueryRequest,
  FetchProductsByQuerySuccess,
  FetchProductByIdRequest,
  FetchProductByIdSuccess,
} from './constants';

const initialState = {
  recommendations: [],
  byCategory: {},
  byQuery: {},
  byId: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FetchRecommendationsSuccess:
      return { ...state, recommendations: action.recommendations, };
    case FetchProductsByCategorySuccess:
      return {
        ...state,
        byCategory: {
          ...state.byCategory,
          [action.category]: action.products,
        }
      };
    case FetchProductsByQueryRequest:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          [action.query]: {
            fetching: true,
            products: []
          }
        }
      };
    case FetchProductsByQuerySuccess:
      return {
        ...state,
        byQuery: {
          ...state.byQuery,
          [action.query]: {
            fetching: false,
            products: action.products,
          }
        }
      };
    case FetchProductByIdRequest:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            fetching: true,
            product: null
          }
        }
      };
    case FetchProductByIdSuccess:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            fetching: false,
            product: action.product
          }
        }
      };
    default:
      return state;
  }
}
