<template>
  <div id="app">
    <h1>This is the Locations Page</h1>
    <img :src="logo" alt="Logo" />
    <div v-for="name in names" :key="name">
      <h1>{{name.address}}</h1>
    </div>
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
      names: []
    };
  },
  mounted() {
    fetchAPI('/addresses')
      .then(res => res.json())
      .then(locations => (this.names = locations));
  }
};
</script>

<style />
