<template>
  <v-container>
    <v-row class="album p-1">
      <v-col cols="auto" md="10" lg="10" class="mx-auto mt-6">
        <SearchComponent @search="onSearch" @clear="onClear" />
        <PostsComponent @sort="sort" @readMore="readMore" />
        <v-spacer></v-spacer>
        <PaginationComponent
          ref="paginationReset"
          @changePage="changePage"
          @changePostsLimit="changePostsLimit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
import { mapGetters } from "vuex";
import PostsComponent from "@/components/PostsComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default Vue.extend ({
  name: "Posts",
  components: { PostsComponent, SearchComponent, PaginationComponent },

  data() {
    return {};
  },
  mounted() {},
  destroyed() {
    //   this.$store.state.postsModule.search = ''
  },

    created() {
      let page: any
      if (this.GET_POSTS && this.GET_POSTS.length === 0) {
      page = parseInt(this.$store.state.postsModule.pageUrl);
    }
    page = parseInt(this.$route.query.page as string);
    if (
      this.$store.state.postsModule.search &&
      this.$store.state.postsModule.search.length === 0
    ) {
      this.$router.push({
        path: "",
        query: {
          page: this.$route.query.page,
          perPage: this.$route.query.perPage,
          search: this.$route.query.search,
        },
      });
    }

    this.$store.state.postsModule.search = this.$route.query.search;
    console.log("perPage: " + this.$route.query.perPage);
    console.log("Search: " + this.$route.query.search);

    // console.log('SEARCH: ' + this.$store.state.postsModule.search);

    let perPage: any = this.$route.query.perPage;
    this.$store.dispatch("ACTION_PAGE_URL", page);
    this.$store.dispatch("ACTION_NEW_POSTS_LIMIT", perPage);
    this.$store.dispatch("ACTION_AUTH_DATA");
    // this.$store.dispatch('ACTION_SORT', this.$store.state.postsModule.sortChoice);
    //  this.$store.dispatch("ACTION_POSTS");
    //  this.$store.dispatch("ACTION_TOTAL_POSTS");
  },

  computed: {
    ...mapGetters(["GET_POSTS", "GET_TOTAL_POSTS", "GET_PAGINATION_PAGES"]),
  },

  methods: {
    onSearch(search: any) {
      this.$store.dispatch("ACTION_SEARCH", search);
      this.$store.dispatch("ACTION_POSTS");
      this.$router.push({
        path: "",
        query: {
          page: this.$route.query.page,
          perPage: this.$route.query.perPage,
          search: this.$store.state.postsModule.search,
        },
      });
    },
    onClear() {
      this.$router.push({
        path: "",
        query: { page: "1", perPage: this.$route.query.perPage },
      });
      this.$store.dispatch("ACTION_SEARCH", null);
      this.$store.dispatch("ACTION_POSTS", 1);
      (this.$refs.paginationReset as Vue & { setPage: (number: number) => void }).setPage(1);
    },
    changePage(page: any) {
      console.log("Current page: " + page);
      this.$store.state.postsModule.pageUrl = page;
      this.$store.dispatch("ACTION_POSTS", page);
      if (
        this.$store.state.postsModule.search &&
        this.$store.state.postsModule.search.length > 0
      ) {
        this.$router.push({
          path: "",
          query: {
            page: page,
            perPage: this.$route.query.perPage,
            search: this.$store.state.postsModule.search,
          },
        });
      } else {
        this.$router.push({
          path: "",
          query: { page: page, perPage: this.$route.query.perPage },
        });
      }
      console.log("Query: " + this.$route.query.page);
    },
    changePostsLimit(page: any, postsLimit: any) {
      this.$store.state.postsModule.pageUrl = page;
      this.$store.dispatch("ACTION_NEW_POSTS_LIMIT", postsLimit);
      this.$store.dispatch("ACTION_POSTS");
      if (
        this.$store.state.postsModule.search &&
        this.$store.state.postsModule.search.length > 0
      ) {
        this.$router.push({
          path: "",
          query: {
            page: this.$store.state.postsModule.pageUrl,
            perPage: postsLimit,
            search: this.$store.state.postsModule.search,
          },
        });
      } else {
        this.$router.push({
          path: "",
          query: {
            page: this.$store.state.postsModule.pageUrl,
            perPage: postsLimit,
          },
        });
      }
    },
    sort(sort: any) {
      this.$store.dispatch("ACTION_SORT", sort);
    },
    readMore(id: any) {
      this.$store.dispatch("ACTION_POST_DATA", id);
    }
  },
});
</script>

<style scoped>
</style>
