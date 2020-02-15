<template>
  <div class="section">
    <div class="columns is-multiline">
      <div class="column is-4">
        <button
          @click="newBoardToggleVisible=!newBoardToggleVisible;"
          v-if="!newBoardToggleVisible"
          class="button is-light is-fullwidth is-warning is-rounded is-outlined is-medium"
        >add new board</button>
        <div v-if="newBoardToggleVisible" class="notification is-warning is-light">
          <button class="delete" @click="newBoardToggleVisible=false"></button>
          <strong>Add new board</strong>
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input
                class="input"
                v-on:keyup.enter="addBoard"
                type="text"
                v-model="newBoardName"
                placeholder="Board name"
              />
            </p>
            <p class="control">
              <button @click="addBoard" class="button is-info">Add</button>
            </p>
          </div>
          <p v-if="feedback" class="help is-danger">{{feedback}}</p>
        </div>
      </div>
      <div class="column is-4" v-for="board in boards" :key="board.id">
        <router-link :to="{name: 'Lists', params: {board_id: board.id} }">
          <button class="button is-info is-outlined is-light is-medium is-fullwidth">
            <span>{{board.name}}</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import Section from "@/components/Section";
import db from "@/firebase/init";
// import firebase from "firebase";
// import firestore from "firebase/firestore";

export default {
  name: "Index",
  components: {},
  methods: {
    addBoard() {
      // this.newBoardToggleVisible = true;
      if (!this.newBoardName) {
        this.feedback = "Please enter a name.";
      } else {
        this.feedback = null;

        db.collection("boards").add({ name: this.newBoardName });
        this.newBoardName = null;
      }
    }
  },
  data() {
    return {
      newBoardToggleVisible: false,
      newBoardName: null,
      feedback: null,
      boards: []
    };
  },
  created() {
    db.collection("boards").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let board = change.doc.data();
          board.id = change.doc.id;
          this.boards.push(board);
          // console.log(this.boards)
        }
      });
    });
  }
};
</script>

<style>
</style>