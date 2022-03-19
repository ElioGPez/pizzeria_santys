<template>

  <div class="content">





    <div class="container-fluid">
      <div class="row">
        <div class="caja col-12 col-xl-6 col-lg-6 col-sm-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
            <!-- TITULO -->
                NUEVO CLIENTE
              

            </template  >
            <!-- TABLA -->


            <div >


                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="text"
                                v-validate="'required'"
                                label="Nombre y Apellido"
                                placeholder=""
                                v-model="cliente.nombre"
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
                                label="Telefono"
                                placeholder=""
                                v-model="cliente.telefono">
                    </base-input>
                  </div> 
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="text"
                                label="Direccion"
                                placeholder=""
                                v-model="cliente.direccion">
                    </base-input>
                  </div> 
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <base-input type="email"
                                label="Email"
                                placeholder=""
                                v-model="cliente.email">
                    </base-input>
                  </div> 
                </div>

                <br>
                <div class="row">
                    <div class="col-12">
                      <button @click="guardarCliente()" class="btn btn-primary btn-lg btn-block">AGREGAR</button>
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

  export default {
    components: {
      LTable,
      Card
    },
    mounted() {


    },
    data () {
      return {
        cliente: {
          nombre: '',
          telefono: '',
          email: '',
          direccion: '',
        }

      }
    },
    computed: {
        ...mapGetters({

        }),
    },
    methods: {
        guardarCliente(){
            this.$validator.validateAll().then(isValid => {
               /* if (!isValid) {
                this.loading = false;
                return;
                }*/

                if (this.cliente.nombre ) {
                                            console.log("pasa")

                     this.$store.dispatch("cliente/saveCliente", this.cliente).then(
                    () => {
                    this.$router.push('/clientes');
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