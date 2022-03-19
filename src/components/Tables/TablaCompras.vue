<template>
    <div>

              <div class>
                <table
                  class="table table-striped table-bordered table-condensed table-hover"
                  style="background-color:white"
                >
                  <thead>
                    <tr>
                      <th>Nro</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr> 
                  </thead>
                  <paginate v-if="getVentas.length" name="compra" :list="getVentas" :per="6" tag="tbody">
                    <tr  v-for="compra in paginated('compra')" :key="compra.id" >
                      <td data-label="Fecha">{{compra.id}}</td>
                      <td data-label="Fecha">{{compra.fecha}}</td>
                      <td data-label="Total">${{compra.total}}</td>
                      <td data-label="Acciones">
                        <a>
                          <button @click.prevent="detalle(compra)" class="btn-icon btn btn-warning">
                            Detalle
                          </button>        
                        </a>
                      </td>
                    </tr>
                  </paginate><Skeleton v-else />
                </table>
              </div>
                <paginate-links for="compra" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>

    </div>
</template>

<script>
export default {
    name : "TCompra",
    data() {
        return {
            paginate: ['compra'],
        }
    },
    props : {
       getVentas : Array,
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
    td{
        padding: 0 12pt 0 10pt !important;
    }
</style>