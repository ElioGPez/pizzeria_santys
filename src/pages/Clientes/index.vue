<template>
  <div class="content">





    <div class="container-fluid">
      <div class="row">
        <div class="caja col-12 col-xl-10 col-lg-10 col-sm-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
            <!-- TITULO -->
                CLIENTES
              

            </template  >
            <!-- TABLA -->


          <TClientes
            :listado_clientes="listado_clientes"
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
  import TClientes from 'src/components/Tables/TablaClientes.vue'
    import { mapMutations, mapGetters, mapActions } from 'vuex'
import { Skeleton } from 'vue-loading-skeleton';
import axios from 'axios'
import authHeader from '../../services/auth-header';


  export default {
    data() {
        return {

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
      TClientes
    },
    mounted() {
      console.log(this.currentUser)
      if (!this.currentUser) {
          this.$router.push('/login');
      }

       //this.$store.dispatch('cliente/getClientes');
             axios({ url: 'api/clientes/todos', headers: authHeader() , method: 'GET' })
      .then(resp => {
        console.log(resp.data)

        //commit('setClientes', resp.data.data)
        this.listado_clientes = resp.data
        //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
        resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
      })
      .catch(err => {//En caso de error al realizar la consulta al Servidor
        reject(err)
      })
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
<style>

.caja{
    padding: 0;
}
.card{
      background-color: rgb(255, 255, 255);
}
.card-header{
    background-color: rgb(81, 13, 90) !important;
    text-align: center;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 15pt;
    padding: 5pt !important;
}
</style>