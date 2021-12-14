import { userService } from '../../services';
import router from '../../router';

const user = JSON.parse(localStorage.getItem('user'));

// initial state
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

// actions
const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit('loginRequest', { username });

    userService.login(username, password).then(
      (user) => {
        commit('loginSuccess', user);
        router.push('/');
      },
      (error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    commit('logout');
  },
  signup({ dispatch, commit }, user) {
    commit('signupRequest', user);

    userService.signup(user).then(
      (user) => {
        commit('signupSuccess', user);
        router.push('/login');
        dispatch('alert/success', 'Signup sucessful', { root: true });
      },
      (error) => {
        commit('signupFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  }
};

// mutations
const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  signupRequest(state) {
    state.status = { signingUp: true };
  },
  signupSuccess(state) {
    state.status = {};
  },
  signupFailure(state) {
    state.status = {};
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
