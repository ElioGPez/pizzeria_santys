import axios from 'axios'
import authHeader from './services/auth-header';


export const compra = {
  namespaced: true,
  state: {
    compras : [{
      fecha : '',
      total : '',
      linea_compras : []
    }],
    compra : {
      id : '',
      fecha : '',
      total : '',
      lineaCompras : []
    },

  },
  actions: {
    getCategorias({ commit }) {
      axios({ url: 'http://localhost:8090/api/categoria/', headers: authHeader() , method: 'GET' })
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
      axios({ url: 'http://localhost:8090/api/compra/', headers: authHeader() , method: 'GET' })
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

      axios.post('http://localhost:8090/api/compra/',
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
    seleccionarCompra(state,compra){
      console.log('pasa por seleccionarCompra')
      state.compra = compra;
      console.log(state.compra)
    },
  },
  getters : {
    compra : state => state.compra,
    compras : state => state.compras,
  }
};
