<template>
  <div id="app">
    <h1>This is the Greeting Page!!</h1>
    <img :src="logo" alt="Logo" />
    <h1 v-if="username === ''">Loading.. please wait!</h1>
    <h1 v-else>Hello there, I'm {{ username }}</h1>
    <router-link to="/locations">Locations</router-link>
  </div>
</template>

<script>
import logo from "../assets/logo.png";
import {fetchAPI} from "../api/fetchAPI";
export default {
  name: "App",
  data() {
    return {
      logo,
      username: ""
    };
  },
  mounted() {
    fetchAPI('/getUsername')
      .then(res => res.json())
      .then(user => (this.username = user.username));
  }
};
</script>

<style />
