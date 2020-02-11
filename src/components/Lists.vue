<template>
  <div class="container">
    <div class="columns is-multiline">
      <!-- <div class="column" v-for="list in lists" :key="list.id">
        <ol type="1">
          <li v-for="taskx in list.content" :key="taskx.id">{{taskx.task}}</li>
        </ol>
      </div>-->
      <div v-for="list in lists" :key="list.id" class="column is-3">
        <div class="notification is-info is-light">
          {{list}}
          <input type="text" v-on:keyup.enter="addTask" class="input">
          <ol type="1">
            <li v-for="taskx in list.content" :key="taskx.id">{{taskx.task}}</li>
          </ol>
        </div>
      </div>
      <div class="column is-3">
        <div class="notification is-info is-light">
          <input type="text" class="input" v-model="newListName" @keyup.enter="addList" placeholder="Add a list">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init"
export default {
  created() {
    db.collection('boards').doc(this.$route.params.board_id).onSnapshot(snapshot => {
      this.lists = snapshot.get('lists')
      console.log(snapshot.get('lists'))
    })
  },
  methods:{
    addTask(e) {
      console.log(e)
    },
    addList() {
      let newList = {name: this.newListName}
      db.collection('boards').doc(this.$route.params.board_id).add(newList)
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