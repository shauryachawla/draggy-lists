<template>
  <div id="app">
    <Section />
    <router-view/>
  </div>
</template>

<script>
import Section from '@/components/Section'
export default {
  name: 'App',
  components: {
    Section: Section
  }
}
</script>

<style>

</style>