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
            </select>
        </div>
    </div>
    <!-- Tabla -->
    <fieldset>
      <div class>

          <paginate
          class="listado-contenedor"
            name="productos"
            :list="filtroListado"
            :per="8"
            tag="div"
          >
            <div @click="setCliente(item)" class="listado" v-for="item in paginated('productos')" :key="item.id">
              <router-link style="color:black"  :to="{
                name : 'Cuenta',
                params : {id : item.id}
              }">
                <div class="row">
                  <div class="col-2">
                    <img height="45pt" src="https://e7.pngegg.com/pngimages/850/193/png-clipart-coca-cola-coca-cola.png" alt="">
                  </div>
                  <div class="item col-4">
                    <div class="row">
                      <div class="col-12">
                        <b>{{item.nombre}}</b>
                      </div>
                      <div class="col-12 descripcion">
                        {{item.descripcion}}
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <span class="badge badge-primary">STOCK: {{item.stock}}</span>
                  </div>
                  <div style="padding-right:18pt" align="right" class="item col-3">
                    <span class="badge badge-success">${{item.precio}}</span>
                  </div>
                </div>
              </router-link>
            </div>

          </paginate>
      </div><br>
      <paginate-links
        for="productos"
        :classes="{ ul: 'pagination', li: 'page-item', a: 'page-link' }"
      ></paginate-links>
    </fieldset>
    <br />
  </div>
</template>

<script>
import {  mapMutations, mapActions } from 'vuex'

export default {
  name: "TProductos",

  data() {
    return {
      producto_id : this.$route.params.id,
      paginate: ["productos"],
      filtro: "",//Para busqueda
      filtro2: "",//Para Orden
    };
  },
  props: {
    listado_productos: {
        type : Array,
        default : {
            nombre: ''
        }
    }
  },
  mounted() {
    
  },
  methods: {

    filtros(event) {


        if (event.target.value == "0") {
            this.listado_productos.sort(function (a, b) {
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
            this.listado_productos.sort(function (a, b) {
            if(a.nombre>b.nombre){
              return -1;
            }else
            if(a.nombre<b.nombre){
              return 1;
            }
            return 0
          })

        }
    }  ,
  },
    computed: {

        filtroListado(){


            var cat = this.listado_productos.filter((item) => 
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
                var nulos = [nulo];
                return nulos;
              }

      }
  },
};
</script>
<style scoped>

.item div div.descripcion{
  font-size: 11pt;
}
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
  background-color: rgb(238, 238, 238);
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