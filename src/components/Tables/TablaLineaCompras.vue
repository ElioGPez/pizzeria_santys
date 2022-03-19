<template>
    <div>

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
                    </tr> 
                  </thead>
                  <paginate name="linea_compra" :list="compra.lineaCompras" :per="8" tag="tbody">
                    <tr  v-for="compra in paginated('linea_compra')" :key="compra.id" >
                      <td data-label="Producto">{{compra.producto.nombre}}</td>
                      <td data-label="Cantidad">{{compra.cantidad}}</td>
                      <td data-label="Precio">${{compra.costo}}
                      <td data-label="Precio">${{compra.costo*compra.cantidad}}
                      </td>
                    </tr>
                  </paginate><!--Skeleton v-else /-->

                </table>
                                                  <paginate-links for="linea_compra" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>

              </div>

    </div>
</template>

<script>
export default {
    name : "TLineaCompra",
    data() {
        return {
            paginate: ['linea_compra'],
        }
    },
    props : {
       compra : Object,
       tipo : String
    },
    methods: {
        detalle(compra){
            this.$store.commit('compra/seleccionarCompra',compra)
        //this.seleccionarVenta(index);
        }
    },
}
</script>