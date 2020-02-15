<template>
  <div class="section">
    <div class="columns is-multiline">
      <div class="column is-3">
        <div class="notification is-light">
          <h3 class="is-size-3 has-text-centered">Add New List</h3>
          <input
            type="text"
            class="input"
            v-model="newListName"
            @keyup.enter="addList"
            placeholder="Add a list"
          />
          <button @click="deleteBoard" class="button is-danger is-fullwidth is-light">
            <span>Delete this board</span>
            <span class="icon has-text-danger">
              <i class="fas fa-ban"></i>
            </span>
          </button>
        </div>
      </div>
      <div v-for="list in lists" :key="list.id" class="column is-3">
        <div class="notification is-light">
          <button class="delete" @click="deleteList(list.id)"></button>
          <h3 class="is-size-3 has-text-centered">{{list.name}}</h3>
          <input
            type="text"
            class="input has-background-white is-danger has-text-centered"
            placeholder="Add New Task"
            @keyup.enter="addTask(list.id)"
          />
          <br />
          <br />
          <draggable class="list-group" :list="list.tasks" group="people" @change="log">
            <button
              @click.prevent
              class="button is-light is-medium is-info is-outlined is-fullwidth list-group-item"
              v-for="(element) in list.tasks"
              :key="element.name"
            >
              <span class>{{ element }}</span>
              <a
                @click="deleteTask(list.id, element)"
                class="delete is-small"
                style="position: absolute; top: 0; right: 0;"
              ></a>
            </button>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import firestore from "firebase/firestore";
import draggable from "vuedraggable";
export default {
  components: { draggable: draggable },
  data() {
    return {
      newListName: null,
      lists: [],
      id: this.$route.params.board_id,
      newTaskName: null
    };
  },
  created() {
    // retrieve all lists ONCE.
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
    deleteBoard() {
      db.collection('boards').doc(this.id).delete()
      this.$router.push({name: 'Index'})
    },
    deleteList(list_id) {
      // console.log(this.lists)
      db.collection("boards")
        .doc(this.id)
        .collection("lists")
        .doc(list_id)
        .delete()
        .then(() => {
          this.lists.filter(list => {
            if (list_id == list.id) {
              var i = this.lists.indexOf(list);
              this.lists.splice(i, 1);
            }
          });
        });
    },
    deleteTask(list_id, element) {
      // console.log(list_id, element);
      // console.log(this.lists)
      db.collection("boards")
        .doc(this.id)
        .collection("lists")
        .doc(list_id)
        .update({
          tasks: firebase.firestore.FieldValue.arrayRemove(element)
        });
      this.lists.filter(list => {
        if (list_id == list.id) {
          // console.log(list.tasks)
          let i = list.tasks.indexOf(element);
          list.tasks.splice(i, 1);
        }
      });
    },

    addTask(list_id) {
      db.collection("boards")
        .doc(this.id)
        .collection("lists")
        .doc(list_id)
        .update({
          tasks: firebase.firestore.FieldValue.arrayUnion(event.target.value)
        });

      this.lists.filter(list => {
        if (list.id == list_id) {
          list.tasks.push(event.target.value);
        }
      });
      event.target.value = null;
    },
    addList() {
      if (!this.newListName) {
        this.feedback = "Please provide the name for the list";
      } else {
        this.feedback = null;
        let newList = { name: this.newListName, tasks: [] };
        // let newList = { name: this.newListName};
        var newListRef = db
          .collection("boards")
          .doc(this.id)
          .collection("lists")
          .add(newList);
        newListRef.then(doc => {
          newList.id = doc.id;
          this.lists.push(newList);
        });
        this.newListName = null;
      }
    },
    log(evt) {
      // window.console.log(evt);

      // FML it's working. The drag moving is working.
      // But it's inefficient cos it just syncs every list from firebase.
      if (evt.added) {
        db.collection("boards")
          .doc(this.id)
          .collection("lists")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              // console.log(doc.data())
              this.lists.filter(list => {
                if (list.id === doc.id) {
                  // console.log(list.name, doc.id, list)
                  db.collection("boards")
                    .doc(this.id)
                    .collection("lists")
                    .doc(doc.id)
                    .update({ tasks: list.tasks });
                }
              });
            });
          });
      }
    }
  }
};
</script>