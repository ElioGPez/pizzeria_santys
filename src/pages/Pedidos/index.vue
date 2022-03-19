<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">PEDIDOS DELIVERY</h4>
            </template>

            <div class="row">
              <div class="col-12" align="right">
                <i
                  class="fa fa-filter"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  aria-hidden="true"
                >
                  FILTROS</i
                >
              </div>
              <div class="col-12 collapse" id="collapseExample">
                <div class="card card-body">
                  <div class="row">
                    <div class="col-6">
                      <base-input
                        type="date"
                        label="DESDE"
                        v-model="fecha_desde"
                      >
                      </base-input>
                    </div>
                    <div class="col-6">
                      <base-input
                        type="date"
                        label="HASTA"
                        v-model="fecha_hasta"
                      >
                      </base-input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 pt-2">
                      <button @click="obtenerVentasFechas()" class="btn">
                        FILTRAR
                      </button>
                    </div>
                    <div align="right" class="col-6 pt-2">
                      <button @click="getPedidosHoy()" class="btn">
                        PEDIDOS DE HOY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-6 pt-3">
                <button
                  data-toggle="modal"
                  data-target="#pedido_modal"
                  class="btn btn-primary"
                >
                  + Pedido
                </button>
              </div>

              <div class="col-6 pt-3">
                <select id="inputState" class="form-control" label="estado">
                  <option selected>Cambiar Estado...</option>
                  <option value="0">En curso</option>
                  <option value="1">En camino</option>
                  <option value="1">Finalizado</option>
                  <option value="1">TODOS</option>
                </select>
              </div>
            </div>

            <hr />

            <TPedidos :pedidos="pedidos"> </TPedidos>
          </card>
        </div>
        <div class="col-6">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Detalle del Pedido Nro.{{ pedido.id }}</h4>
            </template>

            <div>
              <div class="row">
                <div class="col-md-7">
                  <base-input
                    type="text"
                    label="Fecha"
                    :disabled="true"
                    placeholder="22-02-2020"
                    v-model="pedido.fecha"
                  >
                  </base-input>
                </div>

                <div class="col-md-5">
                  <base-input
                    type="text"
                    :disabled="true"
                    label="Total"
                    placeholder="$500"
                    v-model="pedido.total"
                  >
                  </base-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-7">
                  <base-input
                    type="text"
                    label="Cliente"
                    :disabled="true"
                    placeholder="22-02-2020"
                    v-model="pedido.cliente"
                  >
                  </base-input>
                </div>

                <div class="col-md-5">
                  <base-input
                    type="text"
                    :disabled="true"
                    label="Repartidor"
                    placeholder=""
                    v-model="pedido.empleado.nombre"
                  >
                  </base-input>
                </div>
              </div>
              <div v-if="pedido.repartidor != null" class="row">
                <div class="col-md-8">
                  <base-input
                    type="text"
                    label="repartidor"
                    :disabled="true"
                    placeholder="22-02-2020"
                    v-model="repartidor"
                  >
                  </base-input>
                </div>
              </div>
              <div v-if="pedido.estado!='Finalizado'" class="col-12 subtitulo mt-3">PRODUCTOS</div>
              <div v-if="pedido.estado!='Finalizado'" class="row mb-2">
                <div class="col-8">
                  <ProModal />
                </div>
                <div class="col-4 p-0">
                  <div class="row pt-4 pr-2">
                    <div class="col-4 pr-1" align="center">
                      <button
                        @click="cantidad--"
                        class="btn btn-warning btn-cantidad"
                      >
                        -
                      </button>
                    </div>
                    <div class="col-4 p-0">
                      <input
                        v-model="cantidad"
                        type="number"
                        class="cantidad form-control"
                      />
                    </div>
                    <div class="col-4 pl-1" align="center">
                      <button
                        @click="cantidad++"
                        class="btn btn-warning btn-cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-8 pt-2">
                  <base-input
                    type="text"
                    :disabled="false"
                    placeholder="Comentarios..."
                    v-model="comentarios"
                  >
                  </base-input>
                </div>
                <div align="center" class="col-4 pt-2 pr-0 pl-0">
                  <button @click="agregarProducto()" class="btn btn-primary">
                    AGREGAR
                  </button>
                </div>
              </div>
              <div class="col-12 subtitulo mt-3 mb-2">Linea de Pedidos</div>

              <TLineaPedido :pedido="pedido"> </TLineaPedido>
              <hr />
              <div v-if="pedido.estado!='Finalizado'" class="row">
                <div class="col-6">
                  <button @click="pedidoProceso()" class="btn btn-primary">
                    CONFIRMAR
                  </button>
                </div>
                <div v-if="pedido.esPedido" align="right" class="col-6">
                  <button
                    data-toggle="modal"
                    data-target="#envio_modal"
                    class="btn btn-info"
                  >
                    ENVIAR PEDIDO
                  </button>
                </div>
              </div>
              <br />
              <div v-if="pedido.estado!='Finalizado'" class="row">
                <div class="col-6">
                  <button @click="pedidoFinalizar()" class="btn btn-danger">
                    FINALIZAR
                  </button>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>

    <!-- Modal Pedido-->
    <div
      id="pedido_modal"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" class="modal-header">
            <div class="col-12"><h3 style="color: white">Nuevo Pedido</h3></div>
          </div>
          <div class="modal-body">
            <div v-if="esPedido" class="row">
              <div align="center" class="col-4 pt-2">
                <p>DIRECCION</p>
              </div>
              <div class="col-6">
                <input
                  v-model="direccion"
                  placeholder="Direccion..."
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div v-if="esPedido" class="row pt-3">
              <div align="center" class="col-4 pt-2">
                <p>CLIENTE</p>
              </div>
              <div class="col-6">
                <input
                  v-model="cliente"
                  placeholder="Cliente..."
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row pt-3">
              <div align="center" class="col-4 pt-2">
                <p>Entrega justo?</p>
              </div>
              <div class="col-6 ml-4">
                <input
                  v-model="entregaJusto"
                  style="width: 15pt; height: 15pt"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div v-if="!entregaJusto" class="row">
              <div align="center" class="col-4 pt-2">
                <p>VUELTO</p>
              </div>
              <div class="col-6">
                <input
                  v-model="vuelto"
                  placeholder="$.."
                  type="number"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="modal-footer row">
            <div class="col-5">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
            <div align="left" class="col-5">
              <button
                @click="abrirPedido()"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Generar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MENSAJE MODAL -->
    <div
      id="mensajeModal"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" class="modal-header">
            <div class="col-12"><h3 style="color: white">MENSAJE</h3></div>
          </div>
          <div class="modal-body">
            <div class="col-12">
              <h3 style="text-align: center">{{ mensaje }}</h3>
            </div>
          </div>
          <hr />
          <div class="modal-footer row">
            <div class="col-5">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
            <div v-if="msj_tipo == 'comanda'" align="left" class="col-5">
              <button
                @click="imprimirComanda()"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Imprimir
              </button>
            </div>
            <div v-else-if="msj_tipo == 'envio'" align="left" class="col-5">
              <button
                @click="imprimirRecibo()"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Imprimir
              </button>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Envio-->
    <div
      id="envio_modal"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" class="modal-header">
            <div class="col-12">
              <h3 style="color: white">Detalles de envio</h3>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div align="center" class="col-4 pt-2">
                <p>REPARTIDOR</p>
              </div>
              <div class="col-6">
                <select
                  v-for="item in empleados"
                  :key="item.id"
                  class="form-control"
                  v-model="empleado"
                  label="estado"
                >
                  <option selected>Seleccionar Repartidor...</option>
                  <option :value="item">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row pt-3">
              <div align="center" class="col-4 pt-2">
                <p>Entrega justo?</p>
              </div>
              <div class="col-6 ml-4">
                <input
                  v-model="entregaJusto"
                  style="width: 15pt; height: 15pt"
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
              </div>
            </div>
            <div v-if="!entregaJusto" class="row">
              <div align="center" class="col-4 pt-2">
                <p>VUELTO</p>
              </div>
              <div class="col-6">
                <input
                  v-model="vuelto"
                  placeholder="$.."
                  type="number"
                  class="form-control"
                />
              </div>
            </div>

          </div>
          <hr />
          <div class="modal-footer row">
            <div class="col-5">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
            <div align="left" class="col-5">
              <button
                @click="pedidoEnviar()"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="envio" hidden>
      <h4 align="center">Pedido Nro {{ pedido.id }}</h4>
          <div style="font-size: 9pt" class="col-6">
            <b>Repartidor: {{ pedido.empleado.nombre }}</b> 
          </div><br>
          <div style="font-size: 9pt" class="col-6">
            Direccion: {{ pedido.direccion }}
          </div>
          <div style="font-size: 9pt" class="col-6">
            Cliente: {{ pedido.cliente }}
          </div>
      <hr />
      <div v-for="item in pedido.lineaPedidos" :key="item.id">
        <div class="row">
          <div style="font-size: 9pt" class="col-6">
            <b>{{ item.producto.nombre }}</b>
          </div>
          <div style="font-size: 9pt" class="col-6">
            Cantidad: {{ item.cantidad }}
          </div>
          <div style="font-size: 8pt" class="col-6">
            Subtotal: ${{ item.cantidad * item.producto.precio }}
          </div>
        </div>
      </div>
      <hr><hr>
          <div style="font-size: 9pt" class="col-6">
            <b>TOTAL: ${{ pedido.total }}</b> 
          </div>
      <hr />
      <p style="separador">-</p>
    </div>
    <div id="imprimir" hidden>
      <h4 align="center">Pedido Nro {{ pedido.id }}</h4>
      <hr />
      <div v-for="item in pedido.lineaPedidos" :key="item.id">
        <div class="row">
          <div style="font-size: 9pt" class="col-6">
            <b>{{ item.producto.nombre }}</b>
          </div>
          <div style="font-size: 9pt" class="col-6">
            Cantidad: {{ item.cantidad }}
          </div>
          <div style="font-size: 8pt" class="col-6">
            NOTA: {{ item.comentarios }}
          </div>
        </div>
      </div>
      <hr />
      <p style="separador">-</p>
    </div>

    <hr />
  </div>
</template>

<script>
import LTable from "src/components/Table.vue";
import TPedidos from "src/components/Tables/TablaPedidos.vue";
import TLineaPedido from "src/components/Tables/TablaLineaPedido.vue";
import Card from "src/components/Cards/Card.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
import ProModal from "src/components/Reutilizable/ProModal.vue";
import EventBus from "../../common/EventBus";

export default {
  components: {
    LTable,
    Card,
    TPedidos,
    TLineaPedido,
    ProModal,
  },
  data() {
    return {
      fecha_desde: "",
      fecha_hasta: "",
      pedidoModal: false,
      cliente: null,
      direccion: null,
      pedidos: [],
      cantidad: 1,
      esPedido: true,
      btn_enviar: false,
      mesa: null,
      comentarios: null,
      repartidor: null,
      mensaje: "",
      msj_tipo: "",
      vuelto: null,
      entregaJusto: true,
      listado_ventas_aux: [],
      listado_ventas_aux2: [],
      empleados: [],
      empleado: {nombre : ''},
    };
  },
  computed: {
    ...mapGetters({
      pedido: "pedido/pedido",
      getVentas: "compra/compras",
      producto: "producto/producto",
    }),
  },
  mounted() {
    //Obtener los pedidos de delivey
    this.$store
      .dispatch("pedido/getPedidos")
      .then((res) => {
        this.pedidos = res;
        this.listado_ventas_aux = this.pedidos;
        this.listado_ventas_aux2 = this.pedidos;
        //Filtramos para que muestre por defecto los pedidos de HOY
        this.getPedidosHoy();
      })
      .catch((error) => {
        // catch the error
        alert(error);
        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      });
    //Obtener los empleados
    this.$store
      .dispatch("empleado/getEmpleados")
      .then((res) => {
        this.empleados = res.data;
      })
      .catch((error) => {
        // catch the error
        alert(error);
        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      });
      //Obtener Productos
    this.$store.dispatch("producto/getProductos")
      .then((res) => {})
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("pasa por el error");

          EventBus.dispatch("logout");
        }
      });
  },
  methods: {
    ...mapActions(["obtenerVentas"]),
  imprimirRecibo() {
    //alert('pasa')
      // Get HTML to print from element
      const prtHtml = document.getElementById("envio").innerHTML;

      // Open the print window     'left=0,top=0,bottom=30,width=170,height=900,toolbar=
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,bottom=30,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
  <style>
    h2{
      margin-bottom : 40pt;
    }
    .separador{
      margin-top:10pt;
    }
    body {margin : 0}
  </style>
  </head>
  <body>
    ${prtHtml}
  </body>
</html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.blur();
      setTimeout(myFunction, 1500)
      function myFunction() {
        WinPrint.close();
      }
      //
      $("#mensajeModal").modal("hide");
    },
    imprimirComanda() {
      // Get HTML to print from element
      const prtHtml = document.getElementById("imprimir").innerHTML;

      // Open the print window     'left=0,top=0,bottom=30,width=170,height=900,toolbar=
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,bottom=30,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
  <style>
    h2{
      margin-bottom : 40pt;
    }
    .separador{
      margin-top:10pt;
    }
    body {margin : 0}
  </style>
  </head>
  <body>
    ${prtHtml}
  </body>
</html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.blur();
      setTimeout(myFunction, 3000)
      function myFunction() {
        WinPrint.close();
      }
      //
      $("#mensajeModal").modal("hide");
    },
    pedidoProceso() {
      this.pedido.estado = "En Proceso";

      this.$store
        .dispatch("pedido/actualizarPedido", this.pedido)
        .then((res) => {
          //EN caso de exito, mostrar y parar el skeletor
          //alert("Pedido confirmado");
          this.msj_tipo = "comanda";
          this.mensaje = "Pedido confirmado!! Desea imprimir la comanda?";
          $("#mensajeModal").modal("show");
          //this.$store.dispatch('getOrders', this.active)
        })
        .catch((error) => {
          this.mensaje =
            "Error al confirmar! Revise su conexion a internet y vuelva a intentarlo";
          $("#mensajeModal").modal("show");
          // catch the error
          alert(error);
        });
    },
    pedidoEnviar() {
      this.pedido.empleado = this.empleado;
      this.pedido.estado = "En camino";
      this.$store
        .dispatch("pedido/enviarPedido", this.pedido)
        .then((res) => {
          //EN caso de exito, mostrar y parar el skeletor
          //alert("Pedido confirmado");
          this.msj_tipo = "envio";
          this.mensaje = "Pedido a enviar!! Desea imprimir el detalle?";
          $("#mensajeModal").modal("show");
          //this.$store.dispatch('getOrders', this.active)
        })
        .catch((error) => {
          this.mensaje =
            "Error al confirmar! Revise su conexion a internet y vuelva a intentarlo";
          $("#mensajeModal").modal("show");
          // catch the error
          alert(error);
        });
    },
    pedidoFinalizar() {
      this.pedido.estado = "Finalizado";
      this.$store
        .dispatch("pedido/finalizarPedido", this.pedido)
        .then((res) => {
          this.msj_tipo = "finalizado";
          this.mensaje = "Pedido finalizado!!";
          $("#mensajeModal").modal("show");
        })
        .catch((error) => {
          this.mensaje =
            "Error al confirmar! Revise su conexion a internet y vuelva a intentarlo";
          $("#mensajeModal").modal("show");
          // catch the error
          alert(error);
        });
    },
    agregarProducto() {
      if (this.producto != "") {
        var linea = new Object();
        linea.cantidad = this.cantidad;
        linea.producto = this.producto;
        linea.comentarios = this.comentarios;
        //linea.observaciones = this.observaciones;
        console.log(this.producto.precio);
        linea.subtotal = this.cantidad * this.producto.precio;
        this.pedido.lineaPedidos.push(linea);

        this.pedido.total += linea.subtotal;

        //LIMPIAR
        //this.vaciarProducto();
        this.cantidad = 1;
        this.observaciones = "";
      } else {
        console.log("Producto vacio");
      }
    },

    abrirPedido() {
      /*var cliente = new Object();
      if (this.cliente == "") {
        cliente.nombre = "";
      } else {
        cliente = this.cliente;
      }*/

      var pedido = new Object();
      pedido.comensales = "";
      pedido.estado = "En curso";
      pedido.total = 0;
      pedido.lineaPedidos = [];
      pedido.esPedido = this.esPedido;
      pedido.vuelto = this.vuelto;
      if (this.esPedido) {
        this.btn_enviar = true;
        pedido.cliente = this.cliente;
        pedido.direccion = this.direccion;
      } else {
        pedido.cliente = "cliente";
        pedido.direccion = "Mesa Nro " + this.mesa;
      }

      this.$store
        .dispatch("pedido/crearPedido", pedido)
        .then((res) => {
          //EN caso de exito, mostrar y parar el skeletor
          console.log(res);
          this.pedidos.push(res);
          this.pedidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          this.listado_ventas_aux = this.pedidos;
          this.listado_ventas_aux2 = this.pedidos;
          //this.$store.dispatch('getOrders', this.active)
        })
        .catch((error) => {
          // catch the error
          alert(error);
        });
      this.direccion = null;
      this.cliente = null;
      $("#pedido_modal").modal("hide");
    },
    getPedidosHoy() {
      this.pedidos = this.listado_ventas_aux;

      var n = new Date();
      var y = n.getFullYear();
      var m = n.getMonth() + 1;
      var d = n.getDate();
      var d2 = n.getDate() + 1;

      var hoy1 = new Date(y + "/" + m + "/" + d);
      var hoy2 = new Date(y + "/" + m + "/" + d2);

      var listadoResultante = [];
      this.pedidos.forEach(function (valor, indice, array) {
        if (hoy1 < new Date(valor.fecha) && hoy2 > new Date(valor.fecha)) {
          listadoResultante.push(valor);
        }
      });

      if (listadoResultante.length != 0) {
        this.pedidos = listadoResultante;
        //Para ser usado en el proximo filtro
        this.listado_ventas_aux2 = listadoResultante;
        console.log("pasa por aqui");
      } else {
        var nulo = new Object();
        nulo.id = "";
        var nulos = [nulo];
        this.pedidos = nulos;
      }
    },
    obtenerVentasFechas() {
      // this.getVentas = this.listado_ventas_aux;
      this.pedidos = this.listado_ventas_aux;

      var desde = new Date(this.fecha_desde);
      var hasta = new Date(this.fecha_hasta);
      console.log("FECHA DESDEEE: " + this.fecha_desde);
      var m1 = desde.getDate() + 1;
      var m2 = hasta.getDate() + 1;

      desde.setDate(m1);
      hasta.setDate(m2);
      desde.setHours(0);
      hasta.setHours(0);

      console.log(desde);

      if (this.fecha_desde == "" || this.fecha_hasta == "") {
        console.log("Los campos DESDE y HASTA no deben estar vacios!");
        /*$('#mensajeModal').modal('show');
            this.mensaje = 'Los campos DESDE y HASTA no deben estar vacios!';*/
      } else if (desde > hasta) {
        console.log("El campo DESDE no puede ser mayor que el campo HASTA");
        /*$('#mensajeModal').modal('show');
            this.mensaje = 'El campo DESDE no puede ser mayor que el campo HASTA';*/
      } else {
        console.log("pasa por aqui");
        var listadoResultante = [];
        console.log("Pedidos:::");
        console.log(this.pedidos);

        this.pedidos.forEach(function (valor, indice, array) {
          console.log("Fecha 1: " + desde);
          console.log("Fecha a Comparada: " + new Date(valor.fecha));
          console.log("Fecha 2: " + hasta);
          if (desde < new Date(valor.fecha) && hasta > new Date(valor.fecha)) {
            console.log("PASAAA");

            listadoResultante.push(valor);
          }
        });
        if (listadoResultante.length != 0) {
          console.log(listadoResultante);
          //this.listado_ventas_aux = listadoResultante;
          this.pedidos = listadoResultante;
          //Para ser usado en el proximo filtro
          this.listado_ventas_aux2 = listadoResultante;
          // this.listado_ventas = listadoResultante;
          //Para ser usado en el proximo filtro
          // this.listado_ventas_aux2 = listadoResultante;
          //this.actualizarTotal();
        } else {
          var nulo = new Object();
          nulo.id = "";
          var nulos = [nulo];
          this.pedidos = nulos;
        }
      }
    },
  },
};
</script>
<style>
.btn {
  padding: 4.5pt 10pt;
}
.btn-cantidad {
  padding: 4pt 16pt 4pt 8pt;
  text-align: center;
  width: 9pt;
}
.cantidad {
  text-align: center;
}
.fa {
  width: 65pt;
}

.modal-body {
  background-color: rgb(238, 238, 238);
}

td {
  font-size: 11pt !important;
}
</style>