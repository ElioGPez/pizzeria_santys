<template>
  <div class="content">


      
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
            <!-- TITULO -->
                NUEVA COMPRA
            </template  >

                <div class="row">
                  <!--div  class="col-6">

                    <label for="select">Proveedor</label>
                    <model-list-select :list="listado_productos"
                                      v-model="producto"
                                      option-value="id"
                                      option-text="nombre"
                                      placeholder="Proveedor...">
                    </model-list-select>
                  </div-->
                  <div class="col-6">
                    <!-- object value -->
                    <div class="row">
                      <div class="col-2 pt-4">
                        <button
                          data-toggle="modal"
                          data-target="#productos_modal"
                          type="button"
                          class="btn"
                        >...</button>
                      </div>
                      <div class="col-10">
                        <base-input type="text"
                                    label="Producto"
                                    disabled
                                    placeholder="Producto..."
                                    v-model="producto.nombre"
                                    >
                        </base-input> 
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-4">
                            <base-input type="number"
                                        label="Cantidad"
                                        placeholder="1"
                                        v-model="cantidad"
                                        >
                            </base-input>                          
                      </div>
                      <div class="col-4">
                            <base-input type="text"
                                        label="Costo"
                                        placeholder="$0.00"
                                        v-model="costo"
                                        >
                            </base-input>                          
                      </div>
                      <!--div class="col-2">
                            <base-input v-if="getVentas.length"  type="text"
                                        label="P.Venta"
                                        placeholder="0%"
                                        v-model="descuento"
                                        >
                            </base-input>                          
                      </div-->
                      <div style="padding-top:17pt" class="col-4">
                        <button @click="agregarLineaDeVenta()" class="btn btn-primary">Agregar</button>
                      </div>
                    </div>
                  </div>
                </div>

             <hr>
          <div class="col-12">
          <!-- Tabla -->
          <div   class="form-group">
                <fieldset>
                  <div class>
                    <table
                  class="table table-striped table-bordered table-condensed table-hover"
                  style="background-color:white"
                >
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Costo</th>
                      <th>Subtotal</th>
                      <th>Accion</th>

                    </tr>
                  </thead>
                    <tbody>
                      <tr v-for="(item) of linea_venta" :key="item.id">
                      <td data-label="nombre">
                        {{item.producto.nombre}}
                      </td>
                      <td data-label="cantidad">
                        {{item.cantidad}}
                      </td>
                      <td data-label="costo">
                        ${{item.costo}}                     
                      </td>
                      <td data-label="subtotal">
                        ${{item.subtotal}}                     
                      </td>
                      <td data-label="precio">
                        <button 
                          @click.prevent="linea_venta.splice(index,1);actualizar()"
                        class="btn">x</button>              
                      </td>

                    </tr>
                    </tbody>
                </table>
                  </div>
                </fieldset>

                <br /><hr>
                <div class="row">
                  <div align="right" class="col-8">
                    <button @click="registrarCompra()" class="btn btn-success">Registrar</button>
                  </div>
                  <div align="right" class="col-4">
                    <div class="row">
                      <div class="col-3"></div>
                      <div class="col-4 p-2">TOTAL</div>
                      <div class="col-5">
                        <base-input type="text"
                                    placeholder="$0.00"
                                    v-model="total"
                                    disabled
                                    >
                        </base-input>
                      </div>
                    </div>

                  </div>
                </div>

              </div> 
          </div>

          </card>
        </div>    
        <div class="col-4">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >            
            <template slot="header">


           </template>
          </card>
        </div>
      </div>
    </div>

  <PModal />


  </div>
</template>

<script>
  import LTable from 'src/components/Table.vue'
  import PModal from 'src/components/Modals/ProductosModal.vue'
  import Card from 'src/components/Cards/Card.vue'
    import {  mapGetters, mapMutations } from 'vuex'
import { Skeleton } from 'vue-loading-skeleton';
  import { ModelListSelect } from 'vue-search-select'

  export default {
    components: {
      LTable,
      Card,Skeleton,ModelListSelect,PModal
    },
    data () {
      return {
        listado_productos : this.$store.state.producto.productos,
        //producto : this.$store.state.producto.producto,

        objectItem: {},
        costo : null,
        cantidad : 1,
        linea_venta:[],
        total : 0,

        compra : {
          total : '',
          fecha : '',
          linea_compra : []
        }
      }
    },
    computed: {

        ...mapGetters({
            producto : 'producto/producto',

        }),
    },
    mounted() {
    },
    methods: {

    registrarCompra(){
      this.compra.lineaCompra = this.linea_venta;
      this.compra.total = this.total;

      if (this.linea_venta.length != 0) {
          console.log("Linea de venta NO VACIA")
          //return
            this.$store.dispatch("compra/guardarCompra", this.compra).then(
          () => {
          this.$router.push('/compras');
          },
          error => {
          //this.loading = false;

          }
      );
      }else{
          console.log("Linea de venta VACIA")
      }
    },
    actualizar() {
      this.total = 0;
      for (var item of this.linea_venta) {
        this.total += item.subtotal;
      }
    }, 
    limpiar(){
      this.cantidad = 1;
      this.$store.commit('producto/limpiarProducto');
      this.costo = null;
    },
    agregarLineaDeVenta(){  
      if(this.producto == null){
          console.log("PRODUCTO NULO")

      }else 
      if(this.costo == null){
          console.log("COSTO NULO")
      }else{

          var linea = new Object();
          linea.id = this.producto.id;
          linea.producto = this.producto;
          linea.cantidad = this.cantidad;
          linea.subtotal = this.cantidad * this.costo;
          linea.costo = this.costo;
          this.linea_venta.push(linea);
          linea = null;

          this.actualizar();
          this.limpiar();
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