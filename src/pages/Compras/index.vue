<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Listado de Compras</h4>
            </template>

              <hr>
                <div class="row">
                  <div class="col-6">
                        <base-input type="date"
                                    label="DESDE"
                                    v-model="fecha_desde"
                                    >
                        </base-input>                       
                  </div>
                  <div class="col-6">
                        <base-input type="date"
                                    label="HASTA"
                                    v-model="fecha_hasta"
                                    >
                        </base-input>                    
                  </div>
                </div>
                <div class="pt-2">
                  <button @click="obtenerVentasFechas()" class="btn">FILTRAR</button>
                </div>
            <hr>


            <TCompras 
              :getVentas="getVentas">
            </TCompras>


          </card>
        </div>    
        <div class="col-6">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >            
            <template slot="header">
              <h4 class="card-title">Detalle de Compra Nro.{{compra.id}}</h4>
                         </template>

                <hr> 
            <div >

                <div class="row">
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Fecha"
                                :disabled="true"
                                placeholder="22-02-2020"
                                v-model="compra.fecha">
                    </base-input> <Skeleton v-else />
                    </div>
                    

                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                :disabled="true"
                                label="Total"
                                placeholder="$500"
                                v-model="compra.total">
                    </base-input><Skeleton v-else />
                    </div>  

                </div><hr>

            <TLineaCompras 
              :compra="compra">
            </TLineaCompras>

                <!-- Total >
                <div v-if="getVentas.length" class="row">
                    <div align="right" class="col-md-8">
                        <h5>TOTAL</h5>
                    </div>
                    <div class="col-md-4">
                        <h5>${{compra.total}}</h5>
                    </div>
                </div><Skeleton v-else /-->

            </div>

          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LTable from 'src/components/Table.vue'
  import TCompras from 'src/components/Tables/TablaCompras.vue'
  import TLineaCompras from 'src/components/Tables/TablaLineaCompras.vue'
  import Card from 'src/components/Cards/Card.vue'
    import { mapMutations, mapGetters, mapActions } from 'vuex'
import { Skeleton } from 'vue-loading-skeleton';


  export default {
    components: {
      LTable,
      Card,Skeleton,TCompras,TLineaCompras
    },
    mounted() {
     // this.obtenerVen
           setTimeout(() => {
        this.obtenerVentas();
        this.listado_ventas_aux = this.getVentas;
        this.listado_ventas_aux2 = this.getVentas;
      }, 1500);
    },
    data () {
      return {
        fecha_desde: "",
        fecha_hasta: "",
        listado_ventas_aux : [],
        listado_ventas_aux2: [],
        //getVentas : this.$store.state.compra.compras,
        //compra : this.$store.state.compra.compra,
      }
    },
    computed: {
        ...mapGetters({
            compra : 'compra/compra',
            getVentas : 'compra/compras',
        }),
    /*
        ...mapGetters({
            getVentas : 'getCompras',
            getIdVenta : 'getIdVenta',
        }),*/
    },
    mounted() {
      this.$store.dispatch("compra/getCompras");
    },
    methods: {
        ...mapActions(['obtenerVentas']),
        getCabecera(){
      return [ 'fecha', 'total','accion']
     // return [ 'id', 'email', 'first_name']
        },
        getCabecera2(){
      return [ 'Nombre', 'Cantidad', 'Subtotal']
        },


    obtenerVentasFechas(){
       // this.getVentas = this.listado_ventas_aux;
        this.getVentas = this.listado_ventas_aux;

        var desde = new Date(this.fecha_desde);
        var hasta = new Date(this.fecha_hasta);
        console.log('FECHA DESDEEE: '+this.fecha_desde)
        var m1 = desde.getDate() + 1;
        var m2 = hasta.getDate() + 1;

        desde.setDate(m1);
        hasta.setDate(m2);
        desde.setHours(0);
        hasta.setHours(0);
        
        console.log(desde);

      if(this.fecha_desde=='' || this.fecha_hasta==''){
        console.log('Los campos DESDE y HASTA no deben estar vacios!');
            /*$('#mensajeModal').modal('show');
            this.mensaje = 'Los campos DESDE y HASTA no deben estar vacios!';*/
      }else
      if(desde>hasta){
        console.log('El campo DESDE no puede ser mayor que el campo HASTA');
            /*$('#mensajeModal').modal('show');
            this.mensaje = 'El campo DESDE no puede ser mayor que el campo HASTA';*/
      }else{
        console.log('pasa por aqui')
        var listadoResultante = [];

        this.getVentas.forEach(function(valor, indice, array) {
        console.log('Fecha 1: '+ desde);
        console.log('Fecha a Comparada: '+ new Date(valor.fecha));
        console.log('Fecha 2: '+ hasta);
          if (
            desde < new Date(valor.fecha) &&
            hasta > new Date(valor.fecha)
          ) {
                    console.log('PASAAA');

            listadoResultante.push(valor);
          }
        });
            if(listadoResultante.length != 0){
              console.log(listadoResultante)
              //this.listado_ventas_aux = listadoResultante;
              this.getVentas = listadoResultante;
        //Para ser usado en el proximo filtro
        this.listado_ventas_aux2 = listadoResultante;
             // this.listado_ventas = listadoResultante;
        //Para ser usado en el proximo filtro
       // this.listado_ventas_aux2 = listadoResultante;
              //this.actualizarTotal();
            }
            else{
                var nulo = new Object();
                nulo.id = '';
                nulo.created_at = "No se encontraron ventas";
                var nulos = [nulo];
                //this.getVentas = nulos;
              }      
          }

    },


    }
  }
</script>
<style>
hr{
    margin: 5pt;
}
td {
    font-size: 11pt !important;
}
</style>