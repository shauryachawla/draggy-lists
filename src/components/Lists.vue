<template>
  <div class="container">
    {{id}}
    <div class="columns is-multiline">
      <div v-for="list in lists" :key="list.id" class="column is-3">
        <div class="notification is-info is-light">
          {{list}}
          <input type="text" v-on:keyup.enter="addTask" class="input" />
          <ol type="1">
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
  data() {
    return {
      newListName: null,
      lists: [],
      id: this.$route.params.board_id
    };
  },
  created() {
    // somethings wrong in here
    // db.collection('boards').doc(this.id).collection('lists').get().then((qSnapshot) => {
    //   console.log(qSnapshot.docChanges())
    //   qSnapshot.docChanges().forEach((change) => {
    //     if(change.type == 'added') {
    //       let list = {name: change.doc.name, tasks: change.doc.tasks}
    //       list.id = change.doc.id
    //       this.lists.push(list)
    //     }
    //   })
    // })


    db.collection('boards').doc(this.id).collection('lists').get().then(snapshot => {
      snapshot.forEach(doc => {
        let list = doc.data()
        list.id = doc.id
        this.lists.push(list)
      })
    })




  },
  methods: {
    addTask(e) {
      console.log(e);
    },
    addList() {
      if(!this.newListName) {
        this.feedback = "Please provide the name for the list"
      } else {
        this.feedback = null
        let newList = {name: this.newListName, tasks:[]}

        db.collection('boards').doc(this.id).collection('lists').add(newList)
        this.lists.push(newList)
      }
    },
  }

}

</script>