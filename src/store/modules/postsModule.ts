import api from '@/store/api'
import router from '@/router'
// import { getAccessToken } from '@/store/auth'

const postsModule = {
  state: {
    posts: [],
    search: "",
    postsLimit: 6,
    paginationPages: null,
    pageUrl: 1,
    //totalPosts: 7,
    sort: [{ title: "By title" }, { title: "By description" }, { title: "Old posts" }, { title: "New posts" }],
    sortChoice: '',
    //  goToLastPage: false,
    postData: null
  },
  mutations: {
    SET_POSTS(state: any, posts: []) {
      state.posts = posts
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      state.posts.map((x:any) => {
        let date = new Date(x.dateCreated)
        x.dateCreated = date.toLocaleDateString("en-EN", <Object>options)
      })

    },
    SET_SEARCH(state: any, search: string) {
      state.search = search
    },
      SET_NEW_POSTS_LIMIT(state: any, postsLimit: number ) {
      state.postsLimit = postsLimit
    },
      SET_PAGINATION_PAGES(state: any, pages: number ) {
      state.paginationPages = Math.ceil(pages as number / state.postsLimit)
    },
   /* SET_TOTAL_POSTS(state, totalPosts) {
      state.totalPosts = totalPosts
    },*/
    SET_PAGE_URL(state: any, pageUrl: number) {
      state.pageUrl = pageUrl
    },
    SET_SORT(state: any, sort: string) {
      state.sortChoice = sort
    },
      SET_POST_DATA(state: any, post: Object) {
      state.postData = post
    }

  },
  getters: {
    GET_POSTS(state: any) {
      console.log(state.posts);
      return state.posts;
    },

    GET_TOTAL_POSTS(state: any) {
      console.log(state.totalPosts);
      return state.totalPosts;
    },

    GET_POSTS_LIMIT(state: any) {
      console.log(state.postsLimit);
      return state.postsLimit;
    },

    GET_PAGE_URL(state: any) {
      console.log(state.pageUrl);
      return state.pageUrl;
    },

    GET_SEARCH(state: any) {
      console.log(state.search);
      return state.search;
    },
    GET_PAGINATION_PAGES(state: any) {
      console.log(state.paginationPages);
      return state.paginationPages;
    },
    GET_POST_DATA(state: any) {
      console.log(state.postData);
      return state.postData;
    }
  },
  actions: {
      ACTION_SEARCH({ commit }: { commit: Function }, search: string) {
      commit("SET_SEARCH", search);
    },
      ACTION_SORT({ commit, state }: any , sort: string) {
      commit('SET_SORT', sort);
      //   if (state.goToLastPage === true && state.sortChoice !== 'New posts first') state.goToLastPage = false
      if (state.sortChoice === 'By title') {
          state.posts.sort((a: any, b: any) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
      }
      if (state.sortChoice === 'By description') {
          state.posts.sort((a: any, b: any) => (a.description.toLowerCase() > b.description.toLowerCase()) ? 1 : -1)
      }
      if (state.sortChoice === 'New posts') {
        console.log(router.currentRoute.params)
          state.posts.sort((a: any, b: any) => (a.dateCreated < b.dateCreated) ? 1 : -1)
        //  if (state.goToLastPage === false) {
        //  //  if (state.search && state.search.length > 0) {
        //  //      router.push({ path: "", query: { page: 1, perPage: state.postsLimit, search: state.search } });
        //  //   } else {
        //    router.push({ path: "", query: { page: state.paginationPages, perPage: state.postsLimit, search: state.search } });
        //  //  }
        //  }
        // if (state.goToLastPage === false) {
        //   state.goToLastPage = true;
        //   dispatch('ACTION_POSTS', state.paginationPages);
        // }
      }
      if (state.sortChoice === 'Old posts') {
        state.posts.sort((a:any, b:any) => (a.dateCreated > b.dateCreated) ? 1 : -1)
      }
    },

    ACTION_PAGE_URL({ commit }:any, pageUrl:number) {
      commit("SET_PAGE_URL", pageUrl);
    },

      ACTION_NEW_POSTS_LIMIT({ commit }: any, postsLimit:number) {
      commit("SET_NEW_POSTS_LIMIT", postsLimit)
    },

      ACTION_POSTS({ commit, state, rootState, dispatch }: any, page: string | number, postedBy: string) {
      // debugger
      console.log('inside ACTION_POSTS function');
      let search = 'search=' + state.search + '&';
      if (page) {
        state.pageUrl = page
      } else {
        page = state.pageUrl
      }
      console.log('Current router path: ' + router.currentRoute.path);
      
      if (router.currentRoute.path === '/my-posts') {
        console.log(rootState.userModule.userAuthData._id );
       
          postedBy = 'postedBy=' + rootState.userModule.userAuthData._id + '&'
        
          console.log('state.postedBy: ' + postedBy);
        console.log('My id: ' + rootState.userModule.userAuthData._id);
      } else {
        // postedBy = 'postedBy=' + rootState.userModule.userAuthData._id + '&'
        postedBy = '';
      }
    
      if (!state.search) search = '';
      api.get("posts?" + search + postedBy + "limit=" + state.postsLimit + '&skip=' + (state.pageUrl - 1) * state.postsLimit)
        .then((response) => {
          commit('SET_POSTS', response.data.data), commit("SET_PAGINATION_PAGES", response.data.pagination.total);
          if (response.data.data.length === 0) {
            if (state.search && state.search.length > 0) {
              router.push({ path: "", query: { page: "1", perPage: state.postsLimit, search: state.search } });
            } else {
              router.push({ path: "", query: { page: "1", perPage: state.postsLimit } });
              }
              if (state.pageUrl !== 1) {
                dispatch('ACTION_POSTS', 1);
              }
          }

          if (!state.sortChoice) state.sortChoice = 'Old posts'
          //  dispatch('ACTION_SORT', state.sortChoice, state.goToLastPage);
          dispatch('ACTION_SORT', state.sortChoice);
        }).catch((error) => {
          console.error("There was an error!", error);
        });
    },

    // ACTION_TOTAL_POSTS({ commit }) {
    //   api.get("posts")
    //     .then((response) => {
    //       commit("SET_TOTAL_POSTS", response.data.pagination.total)
    //     }).catch((error) => {
    //       console.error("There was an error!", error);
    //     });
    // },
    ACTION_POST_DATA({ commit, rootState }:any, id:string) {
      api.get("posts/" + id).then((response) => {
        commit("SET_POST_DATA", response.data); 
        if(response.data.postedBy === rootState.userModule.userAuthData._id) {
          console.log('Current path from postsModule: '+router.currentRoute.path);
          router.push({ path: 'post', query: {id: id, edit: "true"} })
        } else {
          router.push({ path: 'post', query: {id: id} })
        }
      
      }).catch((error) => {
        console.error("There was an error!", error);
      });
    },
 /*   ACTION_EDIT_POST_DATA({ commit }, id, data) {
      api.patch("posts/" + id, data, {
        headers: { authorization: getAccessToken() },
      }).then((response) => {
        commit("SET_POST_DATA", response.data), router.push({ path: 'post/edit/' + id })
      }).catch((error) => {
        console.error("There was an error!", error);
      });
    }*/
  }
}

export default postsModule