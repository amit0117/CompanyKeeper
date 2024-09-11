import { USER_LOGIN, USER_LOGOUT } from '../constants/userloginconstants';
export const login =
  (username: string, password: string) => (dispatch: any) => {
    const userLoginInformation = { username: username, password: password };
    localStorage.setItem('userInfo', JSON.stringify(userLoginInformation));
    dispatch({
      type: USER_LOGIN,
      payload: { username: username, password: password },
    });
  };

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
