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
                    <div class="col-10">
                        <h4 class="card-title">Arqueos de Caja</h4>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-primary">NUEVO ARQUEO</button>
                    </div>
                    
                </div>

              <hr>
                <div class="row">
                  <div class="col-3">
                    <div class="col-sm-10">
                        <base-input type="date"
                                    label="DESDE"
                                    v-model="fecha_desde"
                                    >
                        </base-input>                       
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="col-sm-10">
                        <base-input type="date"
                                    label="HASTA"
                                    v-model="fecha_hasta"
                                    >
                        </base-input>                    
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="form-group col-12">
                        <label for="exampleFormControlSelect1">CAJA</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div> 
                  
                  </div>
                </div>

            </template>
            <hr>
            <l-table v-if="getVentas.length" class="table-hover table-striped table-sm"
                     :columns="getCabecera()"
                     :data="getVentas"
                     :origen="'ventas'">
            </l-table> <Skeleton v-else />
          </card>
        </div>    

      </div>
    </div>
  </div>
</template>

<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
    import { mapMutations, mapGetters, mapActions } from 'vuex'
import { Skeleton } from 'vue-loading-skeleton';


  export default {
    components: {
      LTable,
      Card,Skeleton
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
      }
    },
    computed: {
        ...mapGetters({
            getVentas : 'getVentas',
            getIdVenta : 'getIdVenta',
        }),
    },
    methods: {
        ...mapActions(['obtenerVentas']),
        getCabecera(){
      return [ 'fecha', 'total', 'metodo','usuario','estado','accion']
     // return [ 'id', 'email', 'first_name']
        },
        getCabecera2(){
      return [ 'Producto', 'Cantidad', 'Subtotal']
        },


    obtenerVentasFechas(){
       // this.getVentas = this.listado_ventas_aux;

        var desde = new Date(this.fecha_desde);
        var hasta = new Date(this.fecha_hasta);
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
              this.listado_ventas_aux = listadoResultante;
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