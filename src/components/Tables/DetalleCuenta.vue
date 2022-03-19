<template>
  <div class=" container form-group">
    <div>
      <div class="row">
        <div class="col-12 subtitulo">Informacion del cliente</div>
        <div class="detalle-cliente col-12">
          <div class="row">
            <div class="col-4">Nombre</div>
            <div class="col-8">
              {{ cliente.nombre }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">Telefono</div>
            <div class="col-8">
              {{ cliente.telefono }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">Direccion</div>
            <div class="col-8">
              {{ cliente.direccion }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">Saldo</div>
            <div class="col-8">
              <span style="font-size: 12pt" class="badge badge-success"
                >${{ cliente.cuenta.saldo }}</span
              >
            </div>
          </div>
        </div>
        <div class="col-12 subtitulo">Movimientos</div>

        <div align="center" class="col-12 transaccion">
          <div class="row">
            <div class="col-4">
              <select  id="inputState" class="form-control" v-model="tipo">
                <option value="pago" selected>Pago</option>
                <option value="deuda">Deuda</option>
              </select>
            </div>
            <div class="col-4">
              <input
                v-model="monto"
                class="form-control"
                type="number"
                placeholder="$0.0"
                id="example-search-input"
              />
            </div>
            <div class="col-2">
              <button @click="registrarMovimiento()" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>

        <div class="detalle-lista col-12">
          <!-- Tabla -->
          <fieldset>
            <div class>
              <paginate
                class="listado-contenedor"
                name="clientes"
                :list="cliente.cuenta.movimientos"
                :per="6"
                tag="div"
              >
                <div
                  @click="setCliente(item)"
                  class="listado"
                  v-for="item in paginated('clientes')"
                  :key="item.id"
                >
                  <router-link
                    style="color: black"
                    :to="{
                      name: 'Cuenta',
                      params: { id: item.id },
                    }"
                  >
                    <div class="row">
                      <div class="item col-2">
                        <i
                          v-if="item.tipo == 'pago'"
                          style="color: green; font-size: 15pt"
                          class="fa fa-chevron-circle-up"
                          aria-hidden="true"
                        ></i>
                        <i
                          v-else
                          style="color: red; font-size: 15pt"
                          class="fa fa-chevron-circle-down"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div style="font-size:12pt" class="item col-6">
                        {{ item.createdDate }}
                      </div>
                      <div
                        style="padding-right: 18pt"
                        align="right"
                        class="item col-4"
                      >
                        <span
                          v-if="item.tipo == 'pago'"
                          style="font-size: 11pt"
                          class="badge badge-success"
                          >${{ item.monto }}</span
                        >
                        <span
                          v-else
                          style="font-size: 11pt"
                          class="badge badge-danger"
                          >${{ item.monto }}</span
                        >
                      </div>
                    </div>
                  </router-link>
                </div>
              </paginate>
            </div>
            <br />
            <paginate-links
              for="clientes"
              :classes="{ ul: 'pagination', li: 'page-item', a: 'page-link' }"
            ></paginate-links>
          </fieldset>
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "DCuenta",

  data() {
    return {
      tipo: "pago",
      monto : '',
      cliente_id: this.$route.params.id,
      paginate: ["clientes"],
      filtro: "", //Para busqueda
      filtro2: "", //Para Orden
    };
  },
  props: {
    cliente: {
      type: Object,
      default: {
        nombre: "",
        cuenta: {
          saldo: "",
        },
      },
    },
  },
  mounted() {
    //Ordena la fecha por la mas reciente
    this.cliente.cuenta.movimientos.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    //Cambia el formato de la presentada
    this.cliente.cuenta.movimientos.forEach(element => {
      let date = new Date(element.createdDate)
      element.createdDate = date.toLocaleString();
    });
  },
  methods: {
    ...mapActions(["cliente/guardarCliente"]),
    setCliente(item) {
      this.$store.dispatch("cliente/guardarCliente", item);
      //this.guardarCliente(item);
      console.log(item.nombre);
    },
    registrarMovimiento(){
      let movimiento = new Object();
      movimiento.tipo = this.tipo;
      movimiento.monto = this.monto;
      movimiento.id_cuenta =this.cliente.cuenta.id;
      movimiento.id_cliente =this.cliente.id;

      this.$store.dispatch("cliente/guardarMovimiento", movimiento);
      this.cliente.cuenta.movimientos.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

      this.monto = '';
    },
    filtros(event) {
      if (event.target.value == "0") {
        this.listado_clientes.sort(function (a, b) {
          if (a.nombre < b.nombre) {
            return -1;
          } else if (a.nombre > b.nombre) {
            return 1;
          }
          return 0;
        });
      } else if (event.target.value == "1") {
        this.listado_clientes.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return -1;
          } else if (a.nombre < b.nombre) {
            return 1;
          }
          return 0;
        });
      } else if (event.target.value == "2") {
        this.listado_clientes.sort(function (a, b) {
          return a.cuenta.saldo - b.cuenta.saldo;
        });
      } else if (event.target.value == "3") {
        this.listado_clientes.sort(function (a, b) {
          return b.cuenta.saldo - a.cuenta.saldo;
        });
      }
    },
  },
  computed: {},
};
</script>
<style>

@media (min-width: 992px) {
  .table-full-width {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
.detalle-lista{
  padding: 0;
}
.transaccion {
  margin-top: 6pt;
  }
.transaccion button {
  height: 30pt;
  width: 40pt;
  font-size: 14pt;
}
.transaccion div {
  padding: 0 1pt 0 1pt;
}
.subtitulo {
  background-color: rgb(235, 235, 235);
  text-align: center;
  font-size: 14pt;
  font-weight: bold;
  padding: 1pt 0 1pt 0;
  border-style: solid;
  border-width: 1px 0 1px 0;
  border-color: rgb(84, 18, 87);
}
.detalle-cliente {
  margin: 3pt 0 3pt 0;
}
.detalle-cliente div.row div {
  padding: 3pt 3pt 3pt 15pt;
}
hr {
  margin: 5pt;
}
td {
  font-size: 11pt !important;
}
.listado-contenedor {
  padding-top: 0pt;
  border-style: solid;
  border-width: 3pt 0 1pt 0;
  border-color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
}
.listado {
  border-style: solid;
  border-radius: 10px;
  border-width: 0.5px;
  border-color: rgb(255, 255, 255);
  background-color: rgb(226, 226, 226);
  padding: 4pt 0 4pt 0;
  margin-top: 2pt;
}
.listado div.row {
  margin-left: 3pt;
}
.listado div.item {
  padding: 0 0 0 2pt;
}

</style>