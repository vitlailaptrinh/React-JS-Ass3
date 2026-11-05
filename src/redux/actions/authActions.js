export const ON_LOGIN = 'ON_LOGIN';
export const ON_LOGOUT = 'ON_LOGOUT';

export const onLogin = (user) => ({
  type: ON_LOGIN,
  payload: user,
});

export const onLogout = () => ({
  type: ON_LOGOUT,
});
