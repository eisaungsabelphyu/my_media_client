import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: "NewsDetails",
    data () {
        return {
            postId: 0,
            postList: {},
            viewcount: 0,
            reactStatus: 0,
            totalReact: 0
            
        }
    },
    computed : {
        ...mapGetters(["storageToken","storageUserData"])
    },
    methods: {
        loadPost(id) {
            axios.post("http://localhost:8000/api/post/detail", {
                    postId: id
                })
                    .then((response) => {
                        if (response.data.post.image != null) {
                            response.data.post.image = "http://localhost:8000/storage/" + response.data.post.image;
                        } else {
                            response.data.post.image = "http://localhost:8000/image/img-not-found.png";
                        }
                    
                    this.postList = response.data.post;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        back() {
            history.back();
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
            logout() {
                this.$store.dispatch("setToken", null);
                this.login();
        },
        
        react() {
            if (this.reactStatus == 0) {
                this.reactStatus = 1
                this.totalReact = this.totalReact+1;
                
            } else {
                this.reactStatus = 0
                this.totalReact = this.totalReact-1; 
                 
            }
            let data = {
                'user_id': this.storageUserData.id,
                'post_id': this.$route.query.id,
                'status': this.reactStatus,
            };
            axios.post('http://localhost:8000/api/post/react', data)
                .then((response) => {
                    console.log(response);
                    
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },

    mounted() {
       
        let data = {
            'user_id': this.storageUserData.id,
            'post_id': this.$route.query.id
        };
        //get viewcount data
        axios.post('http://localhost:8000/api/post/actionLogs', data)
            .then((response) => {
                this.viewcount = response.data.post.length;
            })
            .catch((error) => {
                console.log(error);
            });
        //get react data
        axios.post('http://localhost:8000/api/post/getReactData', data)
                .then((response) => {
                  
                    this.reactStatus = response.data.reactData.like_unlike_status;
                    this.totalReact = response.data.totalReact.length;
                })
                .catch((error) => {
                    console.log(error);
                })
        
        this.postId = this.$route.query.id;
        this.loadPost(this.postId);
    }
        
    }