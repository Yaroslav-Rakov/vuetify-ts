<template>
  <Posts />
</template>
<script>
    import Vue from 'vue'
import Posts from "@/views/Posts.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  components: { Posts },
  data() {
    return {};
  },
    created() {
        this.$router.push({ path: "", query: { id: this.$route.query.id, page: this.$route.query.page, perPage: this.$route.query.perPage, search: this.$route.query.search  }});
 
    console.log("MY ID: " + this.$route.query.id);
      this.$store.dispatch("ACTION_AUTH_DATA").then(posts => { this.$store.dispatch(posts) });
    console.log("Router path: " + this.$router.currentRoute.path);
  },
  computed: {
    ...mapGetters(["GET_AUTH_DATA", "GET_POSTS"]),
  },
});
</script>
