const initialState = {
  currentUser: null,
  isLoading: false,
  loginInfo: {
    username: '',
    password: '',
  },
  isAuthenticated: false,
  isShowMessageError: false,
};

const LOGIN = 'userLogin';
const LOGIN_SUCCESSFUL = 'userLoginSuccessful';
const LOGIN_FAILED = 'userLoginFailed';
const UPDATE_LOGIN_INFO = 'updateLoginInfo';
const HIDE_MESSAGE_ERROR = 'hideMessageError';
const LOAD_USER_FROM_TOKEN = 'loadUserFromToken';
const LOAD_USER_FROM_TOKEN_SUCCESSFUL = 'loadUserFromTokenSuccessful';
const LOAD_USER_FROM_TOKEN_FAILED = 'loadUserFromTokenFailed';
const LOGOUT = 'logout';

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOGIN_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        currentUser: action.data,
        isAuthenticated: true
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        isShowMessageError: true
      }
    }
    case UPDATE_LOGIN_INFO: {
      return {
        ...state,
        loginInfo: action.data
      };
    }
    case HIDE_MESSAGE_ERROR: {
      return {
        ...state,
        isShowMessageError: false
      };
    }
    case LOAD_USER_FROM_TOKEN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOAD_USER_FROM_TOKEN_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        currentUser: action.data,
        isAuthenticated: true,
      };
    }
    case LOAD_USER_FROM_TOKEN_FAILED: {
      return {
        ...state,
        isLoading: false,
        currentUser: {
          username: '',
          password: '',
        },
      };
    }
    case LOGOUT: {
      return {
        ...state,
        currentUser: {
          username: '',
          password: '',
        },
      };
    }
    default: return state;
  }
}

export const authenticateActions = {
  login(loginInfo) {
    return async (dispatch) => {
      if(!(loginInfo && loginInfo.username && loginInfo.password)) {
        return dispatch({
          type: LOGIN_FAILED
        });
      }

      dispatch({
        type: LOGIN
      });

      try {
        const response = await fetch('/api/v1/login', {
          method: 'POST',
          body: JSON.stringify({username: loginInfo.username, password: loginInfo.password}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();
        if(data.user) {
          sessionStorage.setItem('jwtToken', data.token);
          dispatch({
            type: LOGIN_SUCCESSFUL,
            data: data.user
          });
        } else {
          dispatch({
            type: LOGIN_FAILED
          });
        }
      } catch (e) {
        console.error(e);

        dispatch({
          type: LOGIN_FAILED
        });
      }
    }
  },
  updateLoginInfo(loginInfo) {
    return {
      type: UPDATE_LOGIN_INFO,
      data: loginInfo,
    };
  },
  hideMessageError() {
    return {
      type: HIDE_MESSAGE_ERROR
    };
  },
  loadUserFromToken() {
    return async (dispatch) => {
      dispatch({
        type: LOAD_USER_FROM_TOKEN,
      });

      try {
        const token = sessionStorage.getItem('jwtToken');

        if (token) {
          console.log(token);
          const response = await fetch('/api/v1/users/me', {
            headers: {
              authorization: `bearer ${token}`,
            },
          });
          const data = await response.json();
          dispatch({
            type: LOAD_USER_FROM_TOKEN_SUCCESSFUL,
            data: {username: data.username},
          });
        } else {
          throw new Error('Token is null');
        }
      } catch (e) {
        console.log(e);
        console.log(JSON.stringify(e));
        sessionStorage.removeItem('jwtToken');
        dispatch({
          type: LOAD_USER_FROM_TOKEN_FAILED,
        });
      }
    };
  },

  logout() {
    sessionStorage.removeItem('jwtToken');
    return ({
      type: LOGOUT,
    });
  },
};