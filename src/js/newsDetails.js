import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: "NewsDetails",
    data () {
        return {
            postId: 0,
            postList: {},
            viewcount: 0
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
            }
    },

    mounted() {
       
        let data = {
            'user_id': this.storageUserData.id,
            'post_id': this.$route.query.id
        };
        axios.post('http://localhost:8000/api/post/actionLogs', data)
            .then((response) => {
                this.viewcount = response.data.post.length;
            })
            .catch((error) => {
                console.log(error);
            });
        this.postId = this.$route.query.id;
        this.loadPost(this.postId);
    }
        
    }