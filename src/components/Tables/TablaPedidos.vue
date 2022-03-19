<template>
  <div>
    <div v-if="pedidos.length" class>
      <table
        class="table table-striped table-bordered table-condensed table-hover"
        style="background-color: white"
      >
        <thead>
          <tr>
            <th>Nro</th>
            <th>Direccion</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <paginate name="pedido" :list="pedidos" :per="6" tag="tbody">
          <tr
            @click="seleccionarPedido(pedido)"
            v-for="pedido in paginated('pedido')"
            :key="pedido.id"
          >
            <td data-label="Fecha">{{ pedido.id }}</td>
            <td data-label="Fecha">{{ pedido.direccion }}</td>
            <td data-label="Fecha">${{ pedido.total }}</td>
            <td v-if="pedido.estado == 'En curso'" data-label="Total">
              <span class="badge badge-primary">{{ pedido.estado }}</span>
            </td>
            <td v-else-if="pedido.estado == 'En Proceso'" data-label="Total">
              <span class="badge badge-danger">{{ pedido.estado }}</span>
            </td>
            <td v-else-if="pedido.estado == 'Finalizado'" data-label="Total">
              <span class="badge badge-success">{{ pedido.estado }}</span>
            </td>
            <td v-else data-label="Total">
              <span class="badge badge-warning">{{ pedido.estado }}</span>
            </td>
          </tr>
        </paginate>
      </table>
      <paginate-links
        for="pedido"
        :classes="{ ul: 'pagination', li: 'page-item', a: 'page-link' }"
      ></paginate-links>
    </div>
    <Skeleton v-else />
  </div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";

export default {
  name: "TPedidos",
  components: {
    Skeleton,
  },
  data() {
    return {
      paginate: ["pedido"],
    };
  },
  props: {
    pedidos: Array,
  },
  methods: {
    /*detalle(compra){
            this.$store.commit('compra/seleccionarCompra',compra)
        },*/
    seleccionarPedido(item) {
      if(item.empleado == null){
        var e = new Object();
        e.nombre = '';
        item.empleado = e; 
      }
      this.$store.commit("pedido/seleccionarPedido", item);
    },
  },
};
</script>

<style>
td {
  padding: 0 12pt 0 10pt !important;
}
</style>