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
              CATEGORIAS
            </template>
                  <b-col cols="8" class="p-3">
        <b-form-group
          label="Filtrar"
          label-for="filter-input"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Escribir..."
            ></b-form-input>

            <b-input-group-append>
              <b-button variant="success"  @click="filter = ''">Limpiar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <hr>
            <!-- TABLA -->
                <b-table striped hover :items="categorias" :fields="fieldss"       
                :per-page="perPage"
                :current-page="currentPage" 
                            :filter="filter"
                >
                    <template #cell(actions)="row">
                        <b-button  variant="danger" size="sm" @click="getDetail(row.item)" class="btn-icon mr-1">
                                <b-icon-trash></b-icon-trash>
                        </b-button>
                    </template>
                </b-table>
                <br><hr>
                <b-row class="pb-2 pt-2">
                    <b-col cols="12">
                        <b-pagination
                            v-model="currentPage" 
                            :total-rows="rows" 
                            :per-page="perPage" 
                            aria-controls="my-table" 
                        ></b-pagination>
                    </b-col>
                </b-row>

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
              filter: null,
                fieldss: [
                    //{ key: "id", label: "ID"},
                    { key: "id", label: "ID"},
                    { key: "nombre", label: "Nombre"},
                    { key: "descripcion", label: "Descripcion"},
                    { key: "actions", label: "Acciones"},
                ],
                perPage: 8,
                currentPage: 1,
    };
  },
  components: {
    Card,
    Skeleton,
  },
  mounted() {
    this.$store.dispatch("producto/getCategorias");
  },
  computed: {
    ...mapGetters({
      categorias: "producto/categorias",
    }),
    currentUser() {
      return this.$store.state.auth.user;
    },
    rows() {
      return this.categorias.length;
    },
  },
  methods: {},
};
</script>
<style>
.btn-icon{
  padding: 3pt 5pt 2pt 5pt !important;
}
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