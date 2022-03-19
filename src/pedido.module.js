import axios from 'axios'
import { reject } from 'core-js/fn/promise';
import authHeader from './services/auth-header';
import api from './services/api';


export const pedido = {
  namespaced: true,
  state: {
    pedidos : [{
      fecha : '',
      total : '',
      linea_compras : []
    }],
    pedido : {
      id : '',
      fecha : '',
      total : '',
      lineaPedidos : [],
      empleado : {nombre:''}
    },

  },
  actions: {
    getPedidos({commit}){
      return new Promise((resolve,reject) => {
        api({ url: 'http://localhost:8090/api/pedido/', headers: authHeader() , method: 'GET' })
        .then(resp => {
          resp.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          resolve(resp.data)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
        })
        .catch(error => {//En caso de error al realizar la consulta al Servidor
          reject(error)
        })
      }
      )
    },
    finalizarPedido({commit},pedido){
      return new Promise((resolve, reject) => {
        api.post('http://localhost:8090/api/pedido/finalizar',
        {
          esPedido : pedido.esPedido,
          id : pedido.id,
          direccion : pedido.direccion,
          cliente : pedido.cliente,
          empleado : pedido.empleado,
          total : pedido.total,
          estado : pedido.estado,
          vuelto : pedido.vuelto,
          //fecha : pedido.fecha,
          comensales : pedido.comensales,
          lineaPedidos : pedido.lineaPedidos
        }, {headers: authHeader(), method: 'POST'})
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        }) 
    })
    },
    enviarPedido({commit},pedido){
      return new Promise((resolve, reject) => {
        api.post('http://localhost:8090/api/pedido/enviar',
        {
          esPedido : pedido.esPedido,
          id : pedido.id,
          direccion : pedido.direccion,
          cliente : pedido.cliente,
          empleado : pedido.empleado,
          total : pedido.total,
          estado : pedido.estado,
          vuelto : pedido.vuelto,
          //fecha : pedido.fecha,
          comensales : pedido.comensales,
          lineaPedidos : pedido.lineaPedidos
        }, {headers: authHeader(), method: 'POST'})
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        }) 
    })
    },
    actualizarPedido({commit},pedido){
      return new Promise((resolve, reject) => {
        api.post('http://localhost:8090/api/pedido/actualizar',
        {
          esPedido : pedido.esPedido,
          id : pedido.id,
          direccion : pedido.direccion,
          cliente : pedido.cliente,
          total : pedido.total,
          estado : pedido.estado,
          vuelto : pedido.vuelto,
          comensales : pedido.comensales,
          lineaPedidos : pedido.lineaPedidos
        }, {headers: authHeader(), method: 'POST'})
        .then(resp => {
          //console.log(resp.data)
          //commit('setClientes', resp.data.data)

          resolve(resp.data)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
        })
        .catch(error => {//En caso de error al realizar la consulta al Servidor
          reject(error)
          //alert(error)
        }) 
    })
    },
    crearPedido({ commit },pedido){
      console.log(pedido)
        return new Promise((resolve, reject) => {
          api.post('http://localhost:8090/api/pedido/crear',
          {
            esPedido : pedido.esPedido,
            direccion : pedido.direccion,
            cliente : pedido.cliente,
            total : pedido.total,
            estado : pedido.estado,
            vuelto : pedido.vuelto,
            comensales : pedido.comensales,
            lineaPedidos : pedido.lineaPedidos
          }, {headers: authHeader(), method: 'POST'})
          .then(resp => {
            //console.log(resp.data)
            //commit('setClientes', resp.data.data)

            resolve(resp.data)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(error => {//En caso de error al realizar la consulta al Servidor
            reject(error)
            //alert(error)
          }) 
      })
    },
    getCategorias({ commit }) {
      api({ url: 'http://localhost:8090/api/categoria/', headers: authHeader() , method: 'GET' })
      .then(resp => {
        console.log(resp.data)

        commit('setCategorias', resp.data)

        //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
        //resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
      })
      .catch(err => {//En caso de error al realizar la consulta al Servidor
        alert(err)
      })
    },
    getCompras({commit}){
      api({ url: 'http://localhost:8090/api/compra/', headers: authHeader() , method: 'GET' })
      .then(resp => {
        console.log("pasa"+resp.data)
        resp.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        commit('llenarCompras', resp.data)

        //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
        //resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
      })
      .catch(err => {//En caso de error al realizar la consulta al Servidor
        alert(err)
      })
    },
    guardarCompra( { commit }, compra){

      api.post('http://localhost:8090/api/compra/',
      {
        total : compra.total,
        lineaCompras : compra.lineaCompra
      }, {headers: authHeader(), method: 'POST'})
      .then(resp => {
        console.log(resp.data)
        //commit('setClientes', resp.data.data)

        //resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
      })
      .catch(err => {//En caso de error al realizar la consulta al Servidor
        alert(err)
      })    
    },


  },
  mutations: {
    llenarCompras(state,compras){
      state.compras = compras;
    },
    seleccionarPedido(state,pedido){
      console.log('pasa por seleccionarPedido')
      state.pedido = pedido;
      console.log(state.pedido)
    },
  },
  getters : {
    pedido : state => state.pedido,
    compras : state => state.compras,
  }
};
