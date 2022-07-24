import { SET_MAXMETABAES, SET_METABAESCONTRACT, SET_METABAESPRICE, SET_SIGNEDIN, SET_TOTALSUPPLY, SET_WALLETADDRESS } from "../constants/action-types";

export function setSignedIn(payload) {
  return { type: SET_SIGNEDIN, payload };
}

export function setWalletAddress(payload) {
  return { type: SET_WALLETADDRESS, payload };
}

export function setMetabaseContract(payload) {
  return { type: SET_METABAESCONTRACT, payload }
}

export function setTotalSupply(payload) {
  return { type: SET_TOTALSUPPLY, payload }
}

// export function setSaleStarted(payload) {
//   return { type: SET_SALESTARTED, payload }
// }

export function setMetabaesPrice(payload) {
  return { type: SET_METABAESPRICE, payload }
}

export function setMaxMetabaes(payload) {
  return { type: SET_MAXMETABAES, payload }
}