import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import * as firebase from "firebase/app";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userProfile: {},
    logged: false,
    currentRecipe: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setLoginStatus(state, val) {
      state.logged = val;
    },
    setCurrentRecipe(state, val) {
      state.currentRecipe = val;
    },
  },
  actions: {
    // Login user using Firebase auth
    async login({ dispatch }, form) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(
          form.email,
          form.password
        );
        dispatch("fetchUser", user);
      } catch (err) {
        console.log(err);
      }
    },
    /* Log in at server and get user token */
    async fetchUser({ commit }, user) {
      // Login user in the API using data from Firebase
      const response = await fetch(
        "https://hidden-cliffs-64077.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email, uid: user.uid }),
        }
      );

      const responseJSON = await response.json();

      commit("setUserProfile", responseJSON);
      commit("setLoginStatus", true);

      router.push("/entry");
    },
    async signup({ dispatch }, form) {
      // Create user using Firebase auth
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      dispatch("fetchUser", user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      commit("setUserProfile", {});
      commit("setLoginStatus", false);
      router.push("/login");
    },
    async loginGoogle({ dispatch }) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const results = await firebase.auth().signInWithPopup(provider);
        console.log(results.user);
        dispatch("fetchUser", results.user);
      } catch (err) {
        console.log(err);
      }
    },
    async loginFacebook({ dispatch }) {
      try {
        const provider = new firebase.auth.FacebookAuthProvider();
        const results = await firebase.auth().signInWithPopup(provider);
        console.log(results.user);
        dispatch("fetchUser", results.user);
      } catch (err) {
        console.log(err);
      }
    },
    updateRecipe({ commit }, recipe) {
      commit("setCurrentRecipe", recipe);
    },
  },
});

export default store;
