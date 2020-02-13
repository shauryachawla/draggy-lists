<template>
  <div class="section">
    <div class="columns is-multiline">
      <div class="column is-3">
        <div class="notification is-success is-light">
          <input
            type="text"
            class="input"
            v-model="newListName"
            @keyup.enter="addList"
            placeholder="Add a list"
          />
        </div>
      </div>
      <div v-for="list in lists" :key="list.id" class="column is-3">
        <div class="notification is-info is-light">
          {{list}}
          <input type="text" v-on:keyup.enter="addTask($event, list.id)" class="input" />
          <button
            v-for="(task,x) in list.tasks"
            :key="x"
            @click.prevent
            class="button is-success is-light"
          >{{task}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from 'firebase'
import firestore from 'firebase/firestore'
export default {
  data() {
    return {
      newListName: null,
      lists: [],
      id: this.$route.params.board_id,
      newTaskName: null
    };
  },
  created() {
    // retrieve all lists.
    db.collection("boards")
      .doc(this.id)
      .collection("lists")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let list = doc.data();
          list.id = doc.id;
          this.lists.push(list);
        });
      });

  },
  methods: {
    addTask(e, list_id) {
      db.collection('boards').doc(this.id).collection('lists').doc(list_id).update({
        tasks: firebase.firestore.FieldValue.arrayUnion(e.target.value)
      })
      // console.log(db.collection('boards').doc(this.id).collection('lists').doc(list_id))
    },
    addList() {
      if (!this.newListName) {
        this.feedback = "Please provide the name for the list";
      } else {
        this.feedback = null;
        let newList = { name: this.newListName, tasks: [] };

        db.collection("boards")
          .doc(this.id)
          .collection("lists")
          .add(newList);
        this.lists.push(newList);
      }
    }
  }
};
</script>