import { SET_MAXMETABAES, SET_METABAESCONTRACT, SET_METABAESPRICE, SET_SIGNEDIN, SET_TOTALSUPPLY, SET_WALLETADDRESS } from "../constants/action-types";
const initialState = {
  signedIn: false,
  totalSupply: 0,
  // saleStarted: false,
  metabaesPrice: 0
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SET_SIGNEDIN:
      return {
        ...state,
        signedIn: action.data
      };
    case SET_WALLETADDRESS:
      return {
        ...state,
        walletAddress: action.data
      };
    case SET_METABAESCONTRACT:
      return {
        ...state,
        metabaesContract: action.data
      }
    case SET_TOTALSUPPLY:
      return {
        ...state,
        totalSupply: action.data
      }
    // case SET_SALESTARTED:
    //   return {
    //     ...state,
    //     saleStarted: action.data
    //   }
    case SET_MAXMETABAES:
      return {
        ...state,
        maxMetabaes: action.data
      }
    case SET_METABAESPRICE:
      return {
        ...state,
        metabaesPrice: action.data
      }
    default:
      return state;
  }
}

export default rootReducer;