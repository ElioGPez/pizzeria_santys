<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
                <div class="row">
                    <div class="col-12">
                        <h4 class="card-title">MENU RAPIDO</h4>
                    </div>
                </div>

            </template>
            <hr>

      <div class="caja col-xl-3 col-lg-6">
        <div class="card">
          <div align="center" class="card-header card-primary">
            <div class="row" align="center">
              <div class="col-12">
                <i  class="fa fa-motorcycle icon"></i>
              </div>
            </div>
          </div>
          <div class="card-footer card-default">
            <h2 class="title-menu">
      <router-link class="router" to="/pedidos">Delivery</router-link>
            </h2>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
          </card>
        </div>    

      </div>
    </div>
  </div>
</template>

<script>

</script>
<style>
.card-title{
  color: rgb(255, 255, 255) !important;
  
}
    .menu {
        background-color: #ffffff;
    padding: 20px;
    
    }
    .titulo {
        color: #ffffff;
        background-color: #5a0064;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20pt;
    }
    .icon {
        color: rgb(255, 255, 255);
        font-size: 50pt;
    }
    .title-menu{
        text-align: center;
        padding: 0;
        margin: 0;
        
    }
    .title-menu a{
        color:#000000 !important;
    }
    .card-footer{
      padding: 0;
    }
</style>