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
                      <th>Subtotal</th>
                      <th>Acciones</th>
                    </tr> 
                  </thead>
                  <tbody>
                    <tr  v-for="item in pedido.lineaPedidos" :key="item.id" >
                      <td data-label="Producto">{{item.producto.nombre}}</td>
                      <td data-label="Cantidad">{{item.cantidad}}</td>
                      <td data-label="Subtotal">${{item.producto.precio * item.cantidad}}
                      <td data-label="Precio">
                        <button  class="btn btn-primary"><i style="width: 12pt" class="fa fa-comment" aria-hidden="true"></i></button>

                        <button v-if="pedido.estado!='Finalizado'" @click="pedido.lineaPedidos.splice(item.id,1);quitarProducto(item)" class="btn btn-warning"><i style="width: 12pt" class="fa fa-trash" aria-hidden="true"></i></button>

                      </td>
                    </tr>
                  </tbody><!--Skeleton v-else /-->

                </table>
                  <!--paginate-links for="linea_pedido" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links-->

              </div>

    </div>
</template>

<script>
$(function () {
  $('[data-toggle="popover"]').popover()
})
export default {
    name : "TLineaPedido",
    data() {
        return {
            paginate: ['linea_pedido'],
        }
    },
    props : {
       pedido : Object,
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

<style>
  
.vue-popover{
  background-color: rgb(245, 245, 245);
  left: 200pt !important;
  top: 23pt !important;
}
</style>