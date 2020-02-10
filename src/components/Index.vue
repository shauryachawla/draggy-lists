<template>
  <div class="broot">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-4" v-for="(list,index) in listNames" :key="index">
          <button class="button is-info is-outlined is-light is-medium is-fullwidth is-rounded">{{list}}</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Section from "@/components/Section";
import List from "@/components/List";
// import ListList from "@/components/ListList";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      listNames: [
        "List One",
        "List Two",
        "List three",
        "List Four",
        "List Five"
      ]
    };
  }
};
</script>

<style>
</style>