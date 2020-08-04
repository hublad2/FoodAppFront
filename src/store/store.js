import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import * as firebase from "firebase/app";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    logged: false,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setLoginStatus(state, val) {
      state.logged = val;
    },
  },
  actions: {
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
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, uid: user.uid }),
      });

      const responseJSON = await response.json();

      console.log(responseJSON);

      commit("setUserProfile", responseJSON);
      commit("setLoginStatus", true);

      router.push("/search");
    },
    async signup({ dispatch }, form) {
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
  },
});

export default store;
