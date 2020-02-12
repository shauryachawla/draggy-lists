<template>
  <div class="container">
    <div class="columns is-multiline">
      <div v-for="list in lists" :key="list.id" class="column is-3">
        <div class="notification is-info is-light">
          {{list}}
          <input type="text" v-on:keyup.enter="addTask" class="input" />
          <ol type="1">
            S
            <li v-for="taskx in list.content" :key="taskx.id">{{taskx.task}}</li>
          </ol>
        </div>
      </div>
      <div class="column is-3">
        <div class="notification is-info is-light">
          <input
            type="text"
            class="input"
            v-model="newListName"
            @keyup.enter="addList"
            placeholder="Add a list"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  created() {
    db.collection("boards")
      .doc(this.$route.params.board_id)
      .get()
      .then(snapshot => {
        console.log();
      });
  },
  methods: {
    addTask(e) {
      console.log(e);
    },
    addList() {
      let newList = { name: this.newListName };
      this.lists.push(newList);
      db.collection("boards")
        .doc(this.$route.params.board_id)
        .add(newList);
    }
  },
  data() {
    return {
      newListName: null,
      lists: []
    };
  }
};
</script>

<style>
</style>