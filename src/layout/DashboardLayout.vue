<template>
  <div  class="wrapper">
    <side-bar>

      <div>
      <opc-drop 
        title="pedidos"
        icon="fa fa-motorcycle">
        <div @click="ruta('mesas')" class="item-drop row">
          <b-col cols="2">
            <i class="nc-icon nc-simple-add"></i>
            </b-col>
          <b-col cols="10" class="item">Mesas</b-col>
        </div>
        <div @click="ruta('pedidos')" class="item-drop row">
          <b-col cols="2">
            <i class="nc-icon nc-notes"></i>
          </b-col>
          <b-col cols="10" class="item">Delivery</b-col>
        </div>
      </opc-drop>
      <opc-drop 
        title="compras"
        icon="fa fa-shopping-cart">
        <div @click="ruta('compras/nueva')" class="item-drop">
          <i class="nc-icon nc-simple-add"></i>
              NUEVA
        </div>
        <div @click="ruta('compras')" class="item-drop">
          <i class="nc-icon nc-notes"></i>
              COMPRAS
        </div>
      </opc-drop>
      <opc-drop 
        title="PRODUCTOS"
        icon="fa fa-coffee">
        <div @click="ruta('productos/nuevo')" class="item-drop">
          <i class="nc-icon nc-simple-add"></i>
              NUEVO
        </div>
        <div @click="ruta('productos')" class="item-drop">
          <i class="nc-icon nc-notes"></i>
              PRODUCTOS
        </div>
      </opc-drop>
      <opc-drop 
        title="CATEGORIAS"
        icon="fa fa-th-large">
        <div @click="ruta('categorias/nueva')" class="item-drop">
          <i class="nc-icon nc-simple-add"></i>
              NUEVO
        </div>
        <div @click="ruta('categorias')" class="item-drop">
          <i class="nc-icon nc-notes"></i>
              CATEGORIAS
        </div>
      </opc-drop>
      <opc-drop 
        title="SUB CATEGORIAS"
        icon="fa fa-th">
        <div @click="ruta('sub_categorias/nueva')" class="item-drop">
          <i class="nc-icon nc-simple-add"></i>
              NUEVO
        </div>
        <div @click="ruta('sub_categorias')" class="item-drop">
          <i class="nc-icon nc-notes"></i>
              SUB CATEGORIAS
        </div>
      </opc-drop>

      </div>

      <template slot="bottom-links">
        <div class="sesion col-12">
          <div  @click.prevent="logOut" class=" row active">
            <div class="col-3">
              <i class="fa fa-sign-out" aria-hidden="true"></i> 
            </div>
            <div class="col-8">
              <p>CERRAR SESION</p>
            </div>
          </div>
        </div>
      </template>
    </side-bar>
    <div :class="ancho + ' main-panel'">

      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
import { mapGetters, mapActions } from "vuex";

export default {
    data () {
      return {
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,

},
        OpcDropata() {
      return {
        visible : 'invisible'
      }
    },
    computed: {
    ...mapGetters({
      hide: "getStateSidebar",
      ancho: "getStateMain",
    }),
      currentUser() {
        return this.$store.state.auth.user;
      },
      showAdminBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_ADMIN');
        }

        return false;
      },
      showModeratorBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_MODERATOR');
        }

        return false;
      }
    },
    methods: {



      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      },
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      prueba(){
        this.visible = 'visible';
      },
      ruta(ruta){
         this.$router.push('/'+ruta)
      }
    
    }
  }

</script>

<style scoped>
.ancho{
  width: 100%;
}
  .item-drop i{
    padding-top: 2pt;
    font-size: 13pt;
    font-weight: bold;
  }
  .item-drop .item{
    margin-top: 2.1pt;
  }

  .invisible {
    display: none;
  }
  .sesion{
    background-color: rgba(255, 255, 255, 0.596);
    padding-top: 5pt;

    font-size: 14pt;
  }
</style>