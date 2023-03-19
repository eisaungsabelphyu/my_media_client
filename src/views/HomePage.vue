<template>
  <div class="d-flex justify-content-center py-3">
    <a role="button" class=" text-danger fs-5" @click="home()" v-if="!tokenStatus">Home<span class="text-dark fs-5">&#x2F;</span></a>
    <a role="button" class=" text-danger fs-5" @click="login()" v-if="!tokenStatus">Login</a>
    <a role="button" class=" text-danger fs-5" @click="logout()" v-else>Logout</a>
  </div>
    <div id="app">
         <!-- Whats New Start -->
        <section class="whats-news-area pt-50 pb-20">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row d-flex justify-content-between">
                            <div class="col-lg-3 col-md-3">
                                <div class="section-tittle mb-30">
                                    <h3>Whats New</h3>
                                </div>
                            </div>
                            <div class="col-lg-9 col-md-9">
                                <div class="properties__button">
                                    <!--Nav Button  -->
                                    <nav>
                                      
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                          <!-- <a href="" @click="categorySearch('test')">Test</a> -->
                                            <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#" role="tab" aria-controls="nav-home" aria-selected="true" 
                                            @click="categorySearch('')"
                                            >All</a
                        >
                                  <a
                                    class="nav-item nav-link"
                                    id="nav-profile-tab"
                                    data-toggle="tab"
                                    href="#"
                                    role="tab"
                                    aria-controls="nav-profile"
                                    aria-selected="false"
                                    v-for="(category, index) in categoryLists"
                                    :key="index"
                                    @click="categorySearch(category.id)"
                                    >{{ category.title }}</a
                                    >
                      
                      </div>
                    </nav>
                    <!--End Nav Button  -->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  
                  <div class="d-flex justify-content-end mb-3">
                    <input type="text" class="col-3 mr-5" placeholder="Search" v-model="searchKey" v-on:keyup.enter="getAllPost()" />
                    <!-- <i 
                    class="fa-solid fa-magnifying-glass mt-1 ml-3"
                     style="font-size: 20px;"
                    ></i> -->
                  </div>

                  <!-- Nav Card -->
                  <div class="tab-content" id="nav-tabContent">
                    <!-- card one -->
                    <div
                      class="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div class="whats-news-caption">
                        <span v-if="!tokenStatus" class="text-white d-flex justify-content-center bg-danger my-5 rounded p-5 h3 shadow">You don't have permission for that</span>
                        <span v-else>
                          <div class="row">
                          <!-- <div class="d-flex align-items-center justify-content-center" 
                          style="height:400px;"
                          v-if="postLists.length == 0"
                          >
                            <h1 class="text-danger">There is no post!</h1>
                          </div> -->
                          <div class="col-lg-6 col-md-6" v-for="(post, index) in postLists.data" :key="index"
                          >
                          
                            <div class="single-what-news mb-100" @click="newsDetails(post.id)">
                              <div class="what-img">
                                <img
                                  v-bind:src="post.image"
                                  alt=""
                                  style="width:400px;height:300px;"
                                />
                              </div>
                              <div class="what-cap">
                                <span class="color1">{{post.category}}</span>
                                <h4>
                                  <a href="details.html"
                                    class="text-wrap">{{post.title}}</a
                                  >
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-center">
                            <Bootstrap5Pagination
                              :data="postLists"
                              @pagination-change-page="getAllPost"
                          />
                          </div>
                         
                        
                        </div>
                        </span>
                      </div>
                    </div>

                    
                  </div>

                  <!-- End Nav Card -->
                </div>
              </div>
            </div>
           </div>
            </div>
        </section>
        <!-- Whats New End -->
        
        <!--Start pagination -->
        <!-- <div class="pagination-area pb-45 text-center">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="single-wrap d-flex justify-content-center">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-start">
                                    <li class="page-item">
                                        <a class="page-link" href="details.html"><span class="flaticon-arrow roted"></span
                      ></a>
                                            </li>
                                            <li class="page-item active">
                                                <a class="page-link" href="details.html">01</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="details.html">02</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="details.html">03</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="details.html"><span class="flaticon-arrow right-arrow"></span
                      ></a>
                                            </li>
                                            </ul>
                                    </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- End pagination  -->
    </div>
</template>

<script src="../js/homePage.js">
</script>


