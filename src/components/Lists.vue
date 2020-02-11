<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column" v-for="list in lists" :key="list.id">
        <ol type="1">
          <li v-for="taskx in list.content" :key="taskx.id">{{taskx.task}}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          id: 1,
          content: [
            { id: 1, task: "task id 1" },
            { id: 2, task: "task id 2" },
            { id: 3, task: "task id 3" }
          ]
        },
        {
          id: 2,
          content: [
            { id: 1, task: "task id 1" },
            { id: 2, task: "task id b" },
            { id: 3, task: "task id c" }
          ]
        },
        {
          id: 3,
          content: [
            { id: 1, task: "task id 1" },
            { id: 2, task: "task id ii" },
            { id: 3, task: "task id iii" }
          ]
        },
        {
          id: 4,
          content: [
            { id: 1, task: "task id 1" },
            { id: 2, task: "task id" },
            { id: 3, task: "task id" }
          ]
        },
        {
          id: 5,
          content: [
            { id: 1, task: "task id 1" },
            { id: 2, task: "task id" },
            { id: 3, task: "task id" }
          ]
        }
      ]
    };
  }
};
</script>

<style>
</style>