<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="caja col-12 col-xl-10 col-lg-10 col-sm-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <!-- TITULO -->
              SUBCATEGORIAS
            </template>
            <!-- TABLA -->
            <div class>
              <table
                class="
                  table table-striped table-bordered table-condensed table-hover
                "
                style="background-color: white"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item of sub_categorias" :key="item.id">
                    <td data-label="nombre">
                      {{ item.id }}
                    </td>
                    <td data-label="cantidad">
                      {{ item.nombre }}
                    </td>
                    <td data-label="costo">
                      {{ item.descripcion }}
                    </td>
                    <td data-label="precio">
                      <button
                        @click.prevent="
                          linea_venta.splice(index, 1);
                          actualizar();
                        "
                        class="btn"
                      >
                        x
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import { mapGetters, mapActions } from "vuex";
import { Skeleton } from "vue-loading-skeleton";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default {
  data() {
    return {
      listado_productos: this.$store.state.producto.productos,
    };
  },
  components: {
    Card,
    Skeleton,
  },
  mounted() {
    this.$store.dispatch("producto/getSubCategorias");
  },
  computed: {
    ...mapGetters({
      sub_categorias: "producto/sub_categorias",
    }),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {},
};
</script>
<style>
.caja {
  padding: 0;
}
.card {
  background-color: rgb(255, 255, 255);
}
.card-header {
  text-align: center;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 15pt;
  padding: 5pt !important;
}
</style>