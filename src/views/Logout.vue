<template>
  <div class="logout">
    <button @click="logout()">logout</button>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
