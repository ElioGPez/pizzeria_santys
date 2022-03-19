<template>
  <div class="content">

    <div class="container-fluid">
      <div class="row">
        <div class="caja col-12 col-xl-6 col-lg-6 col-sm-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
            <!-- TITULO -->
                CUENTA
              

            </template  >
            <!-- TABLA -->

          <DCuenta
            :cliente="cliente"
           />



          </card>
        </div>    

      </div>
    </div>
  </div>
</template>

<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import DCuenta from 'src/components/Tables/DetalleCuenta.vue'
    import { mapMutations, mapGetters, mapActions } from 'vuex'
import { Skeleton } from 'vue-loading-skeleton';
import axios from 'axios'


  export default {
    data() {
        return {
            cliente : this.$store.state.cliente.cliente,
            listado_clientes : this.$store.state.cliente.clientes,
            /*listado_clientes : [
              {
                nombre : 'tu hna',
                cuenta : {
                  saldo : 0
                }
              }
            ]*/
        }
    },
    components: {
      LTable,
      Card,Skeleton,
      DCuenta
    },
    mounted() {
      console.log(this.currentUser)
      if (!this.currentUser) {
          this.$router.push('/login');
      }

    },
    computed: {

        currentUser() {
          return this.$store.state.auth.user;
        }
    },
    methods: {

    }
  
  
  }
</script>
<style scoped>

.caja{
    padding: 0;
}
.card{
      background-color: rgb(255, 255, 255);
}
.card-header{
    text-align: center;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 15pt;
    padding: 5pt !important;
}
</style>