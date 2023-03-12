import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: 'LoginPage',
    data () {
        return {
            userData: {
                email: "",
                password: "",   
            },
            tokenStatus: false,
            userStatus: false,
        }
    },
     computed : {
        ...mapGetters(["storageToken","storageUserData"])
    },
    
        methods: {
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
            accountLogin() {
                axios
                    .post("http://localhost:8000/api/user/login", this.userData)

                    .then((response) => {
                        if (response.data.token == null) {

                            this.userStatus = true;
                            
                        } else {
                            
                            this.userStatus = false;
                           
                            this.storageInfo(response);
                            this.home();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            storageInfo(response) {

                this.$store.dispatch("setToken", response.data.token);
                this.$store.dispatch("setUserData", response.data.user);
            }
    },
    mounted() {
            
            this.userData = {};
        }
        
    }