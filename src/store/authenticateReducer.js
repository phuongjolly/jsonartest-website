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
  }
};