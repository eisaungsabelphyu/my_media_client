<template>
    <div class="d-flex justify-content-center py-3">
    <a role="button" class=" text-danger fs-5" @click="home()" v-if="!tokenStatus">Home</a>
    <p class="text-dark fs-5">&#x2F;</p>
    <a role="button" class=" text-danger fs-5" @click="login()" v-if="!tokenStatus">Login</a>
    <!-- <a role="button" class=" text-danger fs-5" @click="logout()" v-else>Logout</a> -->
    
    </div>
    <div class="container col-5 shadow-sm my-3 p-5">
        <div class="alert alert-danger" role="alert" v-if="userStatus">
            The credentials do not match!
        </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email"
                 class="form-control" 
                 id="exampleInputEmail1" 
                 aria-describedby="emailHelp" 
                 placeholder="Enter email"
                 v-model="userData.email">
                
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Enter password"
                v-model="userData.password">
            </div>
            
            <button type="button" class="btn btn-primary" @click="accountLogin()">Submit</button>
    </div>
</template>

<script src="../js/loginPage.js">
    
</script>


