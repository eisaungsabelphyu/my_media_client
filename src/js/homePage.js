import axios from "axios";
import { mapGetters } from "vuex";
    export default {
    name: "HomePage",
        data() {
            return {
                postLists: {},
                categoryLists: {},
                searchKey: "",
                tokenStatus: false
            };
    },
        computed : {
        ...mapGetters(["storageToken","storageUserData"])
    },
        methods: {
            getAllPost() {
                axios.get("http://localhost:8000/api/post").then((response) => {
            
                    for (let i = 0; i < response.data.posts.length; i++){
                        if (response.data.posts[i].image != null) {
                            response.data.posts[i].image = "http://localhost:8000/storage/" + response.data.posts[i].image;
                        } else {
                            response.data.posts[i].image = "http://localhost:8000/image/img-not-found.png";
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

            search() {
                axios.post("http://localhost:8000/api/post/search", {
                    key: this.searchKey
                })
                    .then((response) => {
                    for (let i = 0; i < response.data.searchKey.length; i++){
                        if (response.data.searchKey[i].image != null) {
                            response.data.searchKey[i].image = "http://localhost:8000/storage/" + response.data.searchKey[i].image;
                        } else {
                            response.data.searchKey[i].image = "http://localhost:8000/image/img-not-found.png";
                        }
                    }
                    this.postLists = response.data.searchKey;
                })
                .catch((error) => {
                    console.log(error);
                });
            },

            categorySearch(searchKey) {
                axios.post("http://localhost:8000/api/category/search", {
                    key: searchKey
                })
                    .then((response) => {
                       for (let i = 0; i < response.data.searchData.length; i++){
                        if (response.data.searchData[i].image != null) {
                            response.data.searchData[i].image = "http://localhost:8000/storage/" + response.data.searchData[i].image;
                        } else {
                            response.data.searchData[i].image = "http://localhost:8000/image/img-not-found.png";
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
