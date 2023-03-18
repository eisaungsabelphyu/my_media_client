import axios from "axios";
import { mapGetters } from "vuex";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

    export default {
    name: "HomePage",
    components: {
          Bootstrap5Pagination,  
        },
        data() {
            return {
                postLists: {},
                categoryLists: {},
                searchKey: "",
                searchedCategory: "",
                tokenStatus: false
            };
    },
        computed : {
        ...mapGetters(["storageToken","storageUserData"])
    },
        methods: {
            getAllPost(page = 1) {
                axios.get(`http://localhost:8000/api/post?page=${page}`)
                    .then((response) => {
                        
                    for (let i = 0; i < response.data.posts.data.length; i++){
                        if (response.data.posts.data[i].image != null) {
                            response.data.posts.data[i].image = "http://localhost:8000/storage/" + response.data.posts.data[i].image;
                        } else {
                            response.data.posts.data[i].image = "http://localhost:8000/image/img-not-found.png";
                        }
                    }
                        this.postLists = response.data.posts;  
                        
                    
                })
                .catch((error) => {
                        console.log(error);
                    });
            },

            getAllCategory() {
                axios.get("http://localhost:8000/api/category")
                    .then((response) => {
                        this.categoryLists = response.data.categories;    
                        
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            search(page = 1) {
                axios.post(`http://localhost:8000/api/post/search?key=${this.searchKey}&page=${page}`)
                    .then((response) => {
                        
                         for (let i = 0; i < response.data.searchKey.data.length; i++){
                        if (response.data.searchKey.data[i].image != null) {
                            response.data.searchKey.data[i].image = "http://localhost:8000/storage/" + response.data.searchKey.data[i].image;
                        } else {
                            response.data.searchKey.data[i].image = "http://localhost:8000/image/img-not-found.png";
                        }
                    }
                        this.postLists = response.data.searchKey;
                })
                .catch((error) => {
                    console.log(error);
                });
            },

            categorySearch(categoryId,page = 1) {
                axios.post(`http://localhost:8000/api/category/search?key=${categoryId}&page=${page}`)
                    .then((response) => {
                       
                         for (let i = 0; i < response.data.searchData.data.length; i++){
                        if (response.data.searchData.data[i].image != null) {
                            response.data.searchData.data[i].image = "http://localhost:8000/storage/" + response.data.searchData.data[i].image;
                        } else {
                            response.data.searchData.data[i].image = "http://localhost:8000/image/img-not-found.png";
                        }
                    }
                        this.postLists = response.data.searchData; 
                          
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            newsDetails(id) {
                //   this.$router.push({
                //     name: "newsDetails",
                //     params: {
                //         id: id
                //     }
                // });
                this.$router.push({
                    path: '/newsDetails',
                    query: { id: id }
                });
                
            },
            home() {
                this.$router.push({
                    name: 'homePage'
                });
            },
            login() {
                this.$router.push({
                    name:'loginPage'
                })
            },
            checkToken() {
                if (this.storageToken != null
                    && this.storageToken != undefined
                    && this.storageToken != "")
                {
                    this.tokenStatus = true;
                } else {
                    this.tokenStatus = false;
                }
            },
            logout() {
                this.$store.dispatch("setToken", null);
                this.login();
            }
        },
    mounted() {
        
        this.checkToken();
            this.getAllPost();
            this.getAllCategory();
        }
    }
