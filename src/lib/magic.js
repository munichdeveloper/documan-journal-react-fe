import { Magic } from 'magic-sdk';
import { parseJwt } from "../Helpers";
import { api } from '../api/Api';

const magic = new Magic(process.env.REACT_APP_PK_KEY);

export const checkUser = async (cb) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    return cb({ isLoggedIn: true, email: user.email });
  }
  return cb({ isLoggedIn: false });
};

export const loginUser = async (email, cb) => {
  let did = await magic.auth.loginWithMagicLink({ email });
  let authPromise = api.authenticateWithDid(did);
  let response = await authPromise;
  let { data } = response;
  let { token } = data;
  const parsedJWT = parseJwt(token);
  const user = { data: parsedJWT, token };
  return cb({ isLoggedIn: true, user });
};

export const logoutUser = async () => {
  await magic.user.logout();
};