<template>
  <div class="broot">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-4" v-for="(list,index) in lists" :key="index">
          <router-link :to="{name: 'EditList', params: {list_id: list.id} }">
            <button class="button is-info is-outlined is-light is-medium is-fullwidth is-rounded">{{list.name}}</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Section from "@/components/Section";
import List from "@/components/List";
import EditList from "@/components/EditList";
// import ListList from "@/components/ListList";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      lists: [
        { name: "One", id: 1 },
        { name: "Two", id: 2 },
        { name: "Three", id: 3 },
        { name: "Four", id: 4 },
        { name: "Five", id: 5 }
      ]
    };
  }
};
</script>

<style>
</style>