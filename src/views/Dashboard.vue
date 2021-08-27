<template>
  <div class="dashboard">
    <h1>Hello {{this.usr}}</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({

    data() {
      return {
        usr: 'test'
      }
    }

  })
</script>
