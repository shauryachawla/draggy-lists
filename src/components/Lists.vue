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
      <!-- <div v-for="list in lists" :key="list.id" class="column is-3">
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
      </div>-->
      <div v-for="list in lists" :key="list.id" class="column is-3">
        <h3>{{list.name}}</h3>
        <input type="text" class="input" @keyup.enter="addTask(list.id)" />
        <draggable class="list-group" :list="list.tasks" group="people" @change="log">
          <button
            @click.prevent
            class="button is-fullwidth list-group-item"
            v-for="(element) in list.tasks"
            :key="element.name"
          >{{ element }}</button>
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

      // FML it's working. The drag moving is working.
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