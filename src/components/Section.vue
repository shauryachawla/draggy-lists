<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Hello World</h1>
      <p class="subtitle">
        {{msg}} with
        <strong>Bulma</strong>!
      </p>
    </div>
  </section>
</template>

<script>
export default {
    name: 'Section',
    data() {
        return {
            msg : "Welcome"
        }
    },
}
</script>

<style>

</style>