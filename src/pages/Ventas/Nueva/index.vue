<template>
  <div class="content">


      
    <div class="container-fluid">
      <div class="row">
        <div class="col-8">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Articulos</h4>
              <hr>
                <div class="row">
                  <div class="col-6">
                    <!-- object value -->
                    <label for="select">Articulo</label>
                    <model-list-select :list="getProductos"
                                      v-model="objectItem"
                                      option-value="id"
                                      option-text="nombre"
                                      placeholder="select item">
                    </model-list-select>

                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-4">
                        <div class="row">
                          <div class="col-12">
                            <base-input v-if="getVentas.length"  type="text"
                                        label="Desc %"
                                        placeholder="0%"
                                        v-model="descuento"
                                        >
                            </base-input>                          
                          </div>
                        </div>

                      </div>
                      <div style="padding-top:17pt" class="col-4">
                        <button @click="agregarLineaDeVenta()" class="btn btn-primary">Agregar</button>
                      </div>
                    </div>
                  </div>
                </div>
 
            </template>
            <hr>
          <div class="col-12">
          <!-- Tabla -->
          <div v-if="getVentas.length"   class="form-group">
                <fieldset>
                  <div class>
                    <table
                  class="table table-striped table-bordered table-condensed table-hover"
                  style="background-color:white"
                >
                  <thead>
                    <tr>
                      <th>Articulo</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Desc % </th>
                      <th>Subtotal</th>
                      <th>Accion</th>

                    </tr>
                  </thead>
                    <tbody>
                      <tr v-for="(item,index) of linea_venta" :key="item.id">
                      <td data-label="ID">
                        {{item.producto.nombre}}
                      </td>
                      <td data-label="codigo">
                            <base-input type="number"
                            v-on:keyup="actualizarSubtotalDescuento(index)"
                                        v-model="item.cantidad"
                                        >
                            </base-input>                      
                      </td>
                      <td data-label="nombre">
                        ${{item.precio}}                     
                      </td>
                      <td data-label="descripcion">
                            <base-input type="number"
                            v-on:keyup="actualizarSubtotalDescuento(index)"
                                        v-model="item.descuento"
                                        >
                            </base-input>                       
                      </td>
                      <td data-label="stock">
                        ${{item.subtotal}}                     
                      </td>
                      <td data-label="precio">
                        <button class="btn">x</button>              
                      </td>

                    </tr>
                    </tbody>
                </table>
                  </div>
                </fieldset>

                <br />
                <div align="right" class="col-12">
                  TOTAL {{total}}
                </div>
              </div> <Skeleton v-else />
          </div>

          </card>
        </div>    
        <div class="col-4">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >            
            <template slot="header">
              <!--h4 class="card-title">Detalle de Venta</h4>
                <hr--> 
            <div >


                <div class="row">
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

                <div class="row">
                  <div class="col-10">
                    <!-- object value -->
                    <label for="select">CLIENTE</label>
                    <model-list-select :list="getProductos"
                                      v-model="objectItem"
                                      option-value="id"
                                      option-text="nombre"
                                      placeholder="select item">
                    </model-list-select>
                  </div>  
                    <div style="padding-top:17pt"  class="col-md-2">
                      <button  class="btn btn-primary">+</button>
                    </div> 
                </div>

                <div class="row">
                  <div class="form-group col-12">
                    <label for="exampleFormControlSelect1">CONDICION FRENTE AL IVA</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Consumidor Final</option>
                      <option>2</option>
                    </select>
                  </div> 
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <label for="exampleFormControlSelect1">TIPO DE COMPROBANTE</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Factura A</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div> 
                </div>

                <div class="row">
                    <div  class="col-md-12">
                          <base-input type="date"
                                      label="FECHA"
                                      v-model="fecha_desde"
                                      >
                          </base-input>                                             
                    </div> 
                </div>
                <div class="row">
                    <div  class="col-md-12">
		                  <h6 class="text-divider"><span>Descuentos Grls.</span></h6>                     
                    </div> 
                </div>

                <div class="row">
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Efectivo"
                                placeholder="22-02-2020"
                                v-model="getVentas[getIdVenta].fecha">
                    </base-input> <Skeleton v-else />
                    </div>
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Tarjeta Debito"
                                placeholder="$500"
                                v-model="getVentas[getIdVenta].total">
                    </base-input><Skeleton v-else />
                    </div>  
                </div>
                <div class="row">
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Tarjeta Credito"
                                placeholder="22-02-2020"
                                v-model="getVentas[getIdVenta].fecha">
                    </base-input> <Skeleton v-else />
                    </div>
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Cuenta corriente"
                                placeholder="$500"
                                v-model="getVentas[getIdVenta].total">
                    </base-input><Skeleton v-else />
                    </div>  
                </div>
                <div class="row">
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Cheque"
                                placeholder="22-02-2020"
                                v-model="getVentas[getIdVenta].fecha">
                    </base-input> <Skeleton v-else />
                    </div>
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Otro"
                                placeholder="$500"
                                v-model="getVentas[getIdVenta].total">
                    </base-input><Skeleton v-else />
                    </div>  
                </div>
                <div class="row">
                    <div  class="col-md-12">
		                  <h6 class="text-divider"><span>Calcular Vuelto</span></h6>                     
                    </div> 
                </div>

                <div class="row">
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                label="Ingreso efectivo"
                                placeholder="22-02-2020"
                                v-model="getVentas[getIdVenta].fecha">
                    </base-input> <Skeleton v-else />
                    </div>
                    <div class="col-md-6">
                    <base-input v-if="getVentas.length"  type="text"
                                :disabled="true"
                                label="Vuelto"
                                placeholder="$500"
                                v-model="getVentas[getIdVenta].total">
                    </base-input><Skeleton v-else />
                    </div>  
                </div>
                <div class="row">
                    <div class="col-md-12">
                      <label for="exampleFormControlTextarea1">Comentario adicional</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div> 
                </div>
                <hr>
                <div class="row">
                    <div class="col-4">
                      <button class="btn btn-secondary">FACTURA</button>
                    </div> 
                    <div class="col-4">
                      <button class="btn btn-secondary">F.ELECT</button>
                    </div> 
                    <div class="col-4">
                      <button class="btn btn-secondary">TICKET</button>
                    </div> 
                </div>
            </div>

           </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
    import {  mapGetters, mapActions } from 'vuex'
import { Skeleton } from 'vue-loading-skeleton';
  import { ModelListSelect } from 'vue-search-select'

  export default {
    components: {
      LTable,
      Card,Skeleton,ModelListSelect
    },
    mounted() {
     // this.obtenerVen
           setTimeout(() => {
        this.obtenerProductos();
        this.obtenerVentas();
        this.listado_ventas_aux = this.getVentas;
        this.listado_ventas_aux2 = this.getVentas;
      }, 1500);
    },
    data () {
      return {
        objectItem: {},
        descuento : 0,
        linea_venta:[],
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
            getProductos : 'getProductos'
        }),
    },
    methods: {
        ...mapActions(['obtenerVentas','obtenerProductos']),
        getCabecera(){
      return [ 'fecha', 'total', 'metodo','usuario','estado','accion']
     // return [ 'id', 'email', 'first_name']
        },
        getCabecera2(){
      return [ 'Producto', 'Cantidad', 'Subtotal']
        },
    actualizarSubtotalCantidad(index){
      this.linea_venta[index].subtotal = this.linea_venta[index].cantidad * this.linea_venta[index].precio;
    },
    actualizarSubtotalDescuento(index){
      this.linea_venta[index].subtotal = 
      (this.linea_venta[index].cantidad * this.linea_venta[index].precio) - 
      (this.linea_venta[index].cantidad * this.linea_venta[index].precio) * 
      (this.linea_venta[index].descuento/100);
    },
    agregarLineaDeVenta(){
          var linea = new Object();
          linea.id = this.objectItem.id;
          linea.producto = this.objectItem;
          linea.cantidad = 1;
          /*this.descuento!=0 ? linea.descuento = this.objectItem.precio_de_venta
           : expr2 */

          linea.descuento = this.descuento;
          linea.precio = this.objectItem.precio_de_venta;
          if(this.descuento!=0){
            linea.subtotal = (1 * this.objectItem.precio_de_venta) - (1 * this.objectItem.precio_de_venta) * (this.descuento/100);
          }else{
            linea.subtotal = 1 * this.objectItem.precio_de_venta;
          }
          this.linea_venta.push(linea);
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