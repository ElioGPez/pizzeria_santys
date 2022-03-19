<template>

  <div class="content">





    <div class="container-fluid">
      <div class="row">
        <div class="caja col-12 col-xl-12 col-lg-12 col-sm-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
            <!-- TITULO -->
                NUEVO PRODUCTO
              

            </template  >
            <!-- TABLA -->


            <div class="container">

                <div class="row">
                  <div class="form-group col-12">
                    <!-- object value -->
                    <label for="select">Sub Categoria</label>
                    <model-list-select :list="sub_categorias"
                                      v-model="sub_categoria"
                                      option-value="id"
                                      option-text="nombre"
                                      placeholder="Buscar sub categoria...">
                    </model-list-select>

                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="text"
                                v-validate="'required'"
                                label="Nombre"
                                placeholder=""
                                v-model="producto.nombre"
                                name="nombre">
                    </base-input>
                    <div
                        v-if="errors.has('nombre')"
                        class="alert alert-danger"
                        role="alert"
                    >Nombre es requerido!</div>
                  </div> 
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="text"
                                label="Descripcion"
                                placeholder=""
                                v-model="producto.descripcion">
                    </base-input>
                  </div> 
                </div>              
                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="number"
                                label="Stock"
                                placeholder=""
                                v-model="producto.stock">
                    </base-input>
                  </div> 
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="number"
                                label="Precio"
                                placeholder=""
                                v-model="producto.precio">
                    </base-input>
                  </div> 
                </div>

                <br>
                <div class="row">
                    <div class="col-12">
                      <button @click="guardarProducto()" class="btn btn-primary btn-lg btn-block">AGREGAR</button>
                    </div> 
                </div>
            </div>



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


    },
    data () {
      return {
        producto : {
          nombre: '',
          descripcion: '',
          stock: '',
          precio: '',
          sub_categoria_id: ''
        },
          sub_categorias : this.$store.state.producto.sub_categorias,
          sub_categoria : []

      }
    },
    computed: {
        ...mapGetters({

        }),
    },
    methods: {
            guardarProducto(){
            this.$validator.validateAll().then(isValid => {
                this.producto.sub_categoria_id = this.sub_categoria.id;

               // return
                if (this.producto.nombre && this.producto.descripcion) {
                     this.$store.dispatch("producto/guardarProducto", this.producto).then(
                    () => {
                    this.$router.push('/productos');
                    },
                    error => {
                    //this.loading = false;

                    }
                );
                }
            });
        }

    }
  }
</script>
<style scoped>
.caja{
    padding: 0;
}
.card{
      background-color: rgb(255, 255, 255);
}
.card-header{
    background-color: rgb(81, 13, 90) !important;
    text-align: center;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 15pt;
    padding: 5pt !important;
}
.form-group{
    margin-bottom: 2pt;
}
</style>