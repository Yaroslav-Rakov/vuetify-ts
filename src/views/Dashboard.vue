<template>
    <v-main>
        <v-container>
            <v-row>
                <v-col class="d-flex justify-center" cols="12">
                    <h1>Hello {{ usr }}</h1>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script lang="ts">
  import store from "../store/store";

  import Vue from 'vue'

  export default Vue.extend({
      name: "HomeComponent",
      created() {
          store.dispatch("ACTION_AUTH_DATA");
      },
      computed: {
          usr() {
              if (this.$store.state.userModule.token) {
                  return store.getters.GET_AUTH_DATA.name;
              } else {
                  return ''
              }
          },
      },

  })
</script>
