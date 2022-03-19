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
                NUEVA CATEGORIA
              

            </template  >
            <!-- TABLA -->


            <div class="container">


                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="text"
                                v-validate="'required'"
                                label="Nombre"
                                placeholder=""
                                v-model="categoria.nombre"
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
                                v-model="categoria.descripcion">
                    </base-input>
                  </div> 
                </div>              


                <br>
                <div class="row">
                    <div class="col-12">
                      <button @click="guardarCategoria()" class="btn btn-primary btn-lg btn-block">AGREGAR</button>
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
  import Card from 'src/components/Cards/Card.vue'
    import {   mapActions } from 'vuex'

  export default {
    components: {
      
      Card
    },
    mounted() {


    },
    data () {
      return {
          categoria : {
            nombre: '',
            descripcion: '',
          }


      }
    },
    methods: {
        guardarCategoria(){
            this.$validator.validateAll().then(isValid => {
               /* if (!isValid) {
                this.loading = false;
                return;
                }*/
                if (this.categoria.nombre && this.categoria.descripcion) {
                     this.$store.dispatch("producto/guardarCategoria", this.categoria).then(
                    () => {
                    this.$router.push('/categorias');
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
<style>
.caja{
    padding: 0;
}
.card{
      background-color: rgb(255, 255, 255);
}
.card-header{
    background-color: rgb(255, 0, 0) !important;
    text-align: center;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 15pt;
    padding: 5pt !important;
}
.form-group{
    margin-bottom: 2pt;
}
@media screen and (max-width: 990px) {
  .card-body{
    padding-left: 5pt;
  }
}
</style>