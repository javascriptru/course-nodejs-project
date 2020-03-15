import {
  FetchCategoriesRequest,
  FetchCategoriesSuccess
} from './constants';

const initialState = {
  items: [],
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FetchCategoriesRequest:
      return {
        isLoading: true,
        items: [],
      };
    case FetchCategoriesSuccess:
      return {
        isLoading: false,
        items: action.categories,
      };
    default:
      return state;
  }
}
