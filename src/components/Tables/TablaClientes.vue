<template>
  <div class="form-group">
    <!-- FILTROS -->

    <div class="row">
       <div class="col-7 input-group">
            <input v-model="filtro" class="form-control py-2 border-right-0 border" type="search" placeholder="Buscar..." id="example-search-input">
            <span class="input-group-append">
                <div class="input-group-text bg-transparent"><i class="fa fa-search"></i></div>
            </span>
        </div>
        <div class="col-5">
            <select
                id="inputState"
                class="form-control"
                v-model="filtro2"
                @change="filtros($event)"
            >
                <option selected>FILTRAR...</option>
                <option value="0">Nombre (A-Z)</option>
                <option value="1">Nombre (Z-A)</option>
                <option value="2">Saldo (Menor-Mayor)</option>
                <option value="3">Saldo (Mayor-Menor)</option>
            </select>
        </div>
    </div>
    <!-- Tabla -->
    <fieldset>
      <div class>

          <paginate
          class="listado-contenedor"
            name="clientes"
            :list="filtroListado"
            :per="8"
            tag="div"
          >
            <div @click="setCliente(item)" class="listado" v-for="item in paginated('clientes')" :key="item.id">
              <router-link style="color:black"  :to="{
                name : 'Cuenta',
                params : {id : item.id}
              }">
                <div class="row">
                  <div class="item col-7">
                    {{item.nombre}}
                  </div>
                  <div style="padding-right:18pt" align="right" class="item col-5">
                    <span class="badge badge-success">${{item.cuenta.saldo}}</span>
                  </div>
                </div>
              </router-link>
            </div>

          </paginate>
      </div><br>
      <paginate-links
        for="clientes"
        :classes="{ ul: 'pagination', li: 'page-item', a: 'page-link' }"
      ></paginate-links>
    </fieldset>
    <br />
  </div>
</template>

<script>
import {  mapMutations, mapActions } from 'vuex'

export default {
  name: "TClientes",

  data() {
    return {
      cliente_id : this.$route.params.id,
      paginate: ["clientes"],
      filtro: "",//Para busqueda
      filtro2: "",//Para Orden
    };
  },
  props: {
    listado_clientes: {
        type : Array,
        default : {
            nombre: '',
            cuenta : {
                saldo: ''  
            }
        }
    }
  },
  methods: {
    ...mapActions(['cliente/guardarCliente']),
    setCliente(item){
      this.$store.dispatch('cliente/guardarCliente',item)
      //this.guardarCliente(item);
      console.log(item.nombre)
    },
    filtros(event) {


        if (event.target.value == "0") {
            this.listado_clientes.sort(function (a, b) {
            if(a.nombre<b.nombre){
              return -1;
            }else
            if(a.nombre>b.nombre){
              return 1;
            }
            return 0
          })        
        }else
        if (event.target.value == "1") {
            this.listado_clientes.sort(function (a, b) {
            if(a.nombre>b.nombre){
              return -1;
            }else
            if(a.nombre<b.nombre){
              return 1;
            }
            return 0
          })

        }else
        if (event.target.value == "2") {
            this.listado_clientes.sort(function (a, b) {
            return (a.cuenta.saldo-b.cuenta.saldo)
          })
        }else
        if (event.target.value == "3") {
            this.listado_clientes.sort(function (a, b) {
            return (b.cuenta.saldo-a.cuenta.saldo)
          })
        }
    }  ,
  },
    computed: {

        filtroListado(){


            var cat = this.listado_clientes.filter((item) => 
            {
              return item.nombre.toLowerCase().match(this.filtro.toLowerCase());
            });
            //console.log(cat.length);
            if(cat.length != 0){
              //console.log(cat);
              return cat;
            }
            else{
                //console.log('pasa');
                var nulo = new Object();
                nulo.nombre = "";
                var cuenta = new Object();
                cuenta.saldo = "";
                nulo.cuenta = cuenta;
                var nulos = [nulo];
                return nulos;
              }

      }
  },
};
</script>
<style scoped>
hr {
  margin: 5pt;
}
td {
  font-size: 11pt !important;
}
.listado-contenedor{
  margin-top: 6pt;
  padding-top: 6pt;
  border-style: solid;
  border-width: 3pt 0 1pt 0;
  border-color: rgb(255, 255, 255);
      background-color: rgb(255, 255, 255);
}
.listado{
  border-style: solid;
  border-radius: 10px;
  border-width: 0.5px;
  border-color: rgb(255, 255, 255);
  background-color: rgb(226, 226, 226);
  padding: 4pt 0 4pt 0;
  margin-top: 2pt;
  
}
.listado div.row{
  margin-left: 3pt;
}
.listado div.item{

  padding: 0 0 0 2pt;
}  
</style>