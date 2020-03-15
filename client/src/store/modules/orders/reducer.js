import {CheckoutRequest, CheckoutSuccess, CheckoutFailure} from "./constants";

const initialState = {
  draft: {
    fetching: false,
    errors: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CheckoutRequest:
      return {
        ...state,
        draft: {
          fetching: true,
          error: null,
          ...action.data,
        }
      };
    case CheckoutSuccess:
      return {
        ...state,
        draft: {
          fetching: false,
          error: null,
        },
        [action.order]: action.data,
      };
    case CheckoutFailure:
      return {
        ...state,
        draft: {
          ...state.draft,
          fetching: false,
          errors: action.errors,
        }
      };
    default:
      return state;
  }
}
