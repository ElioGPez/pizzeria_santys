<template>
    <div>
    <!-- Modal PRODUCTOS-->
    <div
      id="productos_modal"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" class="modal-header">
              <div class="col-12"><h3 style="color:white;">PRODUCTOS</h3></div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-2 center">
                <p>Nombre:</p>
              </div>
              <div class="col-4">
                <input v-model="filtro" type="text" class="form-control" />
              </div>
            </div>
            <hr />
            <div class="row">
              <!-- Tabla -->
              <div class="form-group col-12">
                <fieldset>
                  <div class>
                    <table
                  class="table table-striped table-bordered table-condensed table-hover"
                  style="background-color:white"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Descripcion </th>
                      <th>Stock</th>
                      <th>Precio</th>

                    </tr>
                  </thead>
                    <paginate name="producto" :list="filtroListado" :per="2" tag="tbody">
                    <tr @click="seleccionarProducto(item)" v-for="item in paginated('producto')" :key="item.id">
                      <td data-label="ID">
                        {{item.id}}
                      </td>
                      <td data-label="codigo">
                        codigo                
                      </td>
                      <td data-label="nombre">
                        {{item.nombre}}                     
                      </td>
                      <td data-label="descripcion">
                        {{item.descripcion}}                     
                      </td>
                      <td data-label="stock">
                        {{item.stock}}                     
                      </td>
                      <td data-label="precio">
                        ${{item.precio}}                     
                      </td>

                    </tr>
                  </paginate>
                </table>
                  </div>
                </fieldset>
                  <paginate-links for="producto" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
                <br />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'


export default {
    name : 'PModal',
    data() {
        return {
    listado_productos : this.$store.state.producto.productos,
      filtro : '',
      filtro_n : '',
      paginate: ['producto'], 
      mensaje: '',
      //listado_clientes : [],
        }
    },methods: {
              ...mapActions(['producto/setProducto']),
        seleccionarProducto(item){
            console.log(item.nombre);
            //this.producto = item;
            $('#productos_modal').modal('hide');
            //this.codigo = item.codigo;
            this.$store.dispatch("producto/setProducto",item);

            //this.setProducto(item);
            //this.nombre = item.nombre + ' - ' + item.descripcion; 
        },
    obtenerProducto(){
       var item = this.listado_productos.find(
          x => x.codigo == this.codigo
        );
        console.log(item.producto);
        //Agregar mensaje de codigo incorrecto
        if(item.stock <= 0){
          this.mensaje = "El producto seleccionado no tiene stock disponible!!";
          this.codigo = '';
          $('#mensajeModal').modal('show');
        }else
        if(item != null){
          this.producto = item;
          this.agregarLineaDeVenta();
        }
    },
    },
  computed: {

      filtroListado(){
            var cat = this.listado_productos.filter((item) => 
            {
              return item.nombre.toLowerCase().match(this.filtro.toLowerCase()) || item.descripcion.toLowerCase().match(this.filtro.toLowerCase());
            });
            //console.log(cat.length);
            if(cat.length != 0){
              //console.log(cat);
              return cat;
            }
            else{
                //console.log('pasa');
                var nulo = new Object();
                nulo.id = 0;
                nulo.nombre = "No hay elementos que coincidan";
                var nulos = [nulo];
                return nulos;
              }
      },
      }

}
</script>

<style>
    .modal-header{
        background-color: rgb(228, 22, 22);
        padding: 0 !important;
    }
    .modal-header h3 {
        text-align: center !important;
    }
</style>