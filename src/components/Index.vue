<template>
  <div class="broot">
    <div class="container">
      
      <div class="columns is-multiline">
        <div class="column is-4">
          <button
            @click="newBoardToggleVisible=!newBoardToggleVisible"
            v-if="!newBoardToggleVisible"
            class="button is-light is-fullwidth is-warning is-rounded is-outlined is-medium"
          >add new board</button>
          <div v-if="newBoardToggleVisible" class="notification is-warning is-light">
            <button class="delete" @click="newBoardToggleVisible=false"></button>
            <strong>Add new board</strong>
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input class="input" v-on:keyup.enter="addBoard" type="text" v-model="newBoardName" placeholder="Board name" />
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
            <button
              class="button is-info is-outlined is-light is-medium is-fullwidth is-rounded"
            >{{board.name}}</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Section from "@/components/Section";
import db from "@/firebase/init";

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
        // this.newBoardToggleVisible = false;
        let newBoard = { name: this.newBoardName, id: this.boards.length + 1 , lists: []};
        db.collection('boards').add(newBoard)
        this.boards.push(newBoard)
        this.newBoardName = null
        // console.log(this.boards);
      }
    }
  },
  data() {
    return {
      newBoardToggleVisible: false,
      newBoardName: null,
      feedback: null,
      boards: [
      ]
    };
  },
  created() {
    db.collection('boards').get().then(snapshot => {
      snapshot.forEach(doc => {
        let board = doc.data()
        board.id = doc.id
        this.boards.push(board)
      })
    })
    console.log(this.boards)
  }
};
</script>

<style>
</style>