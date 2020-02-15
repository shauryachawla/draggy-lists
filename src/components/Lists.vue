<template>
  <div class="section">
    <div class="columns is-multiline">
      <div class="column is-3">
        <h3 class="is-size-3 has-text-centered">Add New List</h3>
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
        <h3 class="is-size-3 has-text-centered">{{list.name}}</h3>
        <input
          type="text"
          class="input has-background-white-ter has-text-centered"
          placeholder="Add New Task"
          @keyup.enter="addTask(list.id)"
        />
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
              class="delete"
              style="position: absolute; top: 0; right: 0;"
            ></a>
          </button>
        </draggable>
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
    deleteTask(list_id, element) {
      console.log(list_id, element);
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
          console.log(list.tasks)
          let i = list.tasks.indexOf(element)
          list.tasks.splice(i, 1)
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
      }
    },
    log(evt) {
      window.console.log(evt);
      // console.log(event.target)
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

              // doc.update({tasks: })
            });
          });
      }

      // db.collection('boards').doc(this.id).collection('lists')
    }
  }
};
</script>