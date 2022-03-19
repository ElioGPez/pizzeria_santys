import axios from 'axios'
import authHeader from './services/auth-header';


export const cliente = {
  namespaced: true,
  state: {
    clientes : [
      {
        nombre : '',
        cuenta : {
          saldo : ''
        }
      },
    ],
    cliente: {
      nombre : '',
      cuenta : {
        saldo : ''
      }
    }
  },
  actions: {
    guardarCliente( { commit }, cliente){
      //console.log("PASA POR AQUIIIIIII")
      commit('setCliente', cliente)
    },
    getClientes({ commit }) {
      axios({ url: 'http://localhost:8090/api/clientes/todos', headers: authHeader() , method: 'GET' })
      .then(resp => {
        console.log(resp.data.data)

        commit('setClientes', resp.data.data)

        //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
        resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
      })
      .catch(err => {//En caso de error al realizar la consulta al Servidor
        reject(err)
      })
    },
    guardarMovimiento({ commit }, movimiento){

      var n = new Date();
      var y = n.getFullYear();
      var m = n.getMonth() + 1;
      var d = n.getDate();
      var fecha = d + "-" + m + "-" + y;

      movimiento.fecha = fecha;

      console.log(fecha)

      axios.post('http://localhost:8090/api/cuenta/todos?id_cuenta='+movimiento.id_cuenta,
      {
        tipo : movimiento.tipo,
        monto : movimiento.monto,
        fecha : fecha
      }, {headers: authHeader(), method: 'POST'})
      .then(resp => {
        console.log(resp.data)
        commit('addMovimiento',resp.data)
        //commit('setClientes', resp.data.data)

        resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
      })
      .catch(err => {//En caso de error al realizar la consulta al Servidor
        reject(err)
      })
    }
  },
  mutations: {
    setClientes(state,clientes){
      state.clientes = clientes;
    },
    setCliente(state,cliente){
      state.cliente = cliente;
    },
    addMovimiento(state,movimiento){
      let date = new Date(movimiento.createdDate)
      movimiento.createdDate = date.toLocaleString();
      state.cliente.cuenta.movimientos.unshift(movimiento)
      //state.cliente.cuenta.movimientos.push(movimiento)
      //Ordena la fecha por la mas reciente
      //state.cliente.cuenta.movimientos.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    
      if(movimiento.tipo.toUpperCase() === 'pago'.toUpperCase()){
        console.log("Entra por aqui")
        state.cliente.cuenta.saldo -= parseFloat(movimiento.monto);
      }else{
        state.cliente.cuenta.saldo += parseFloat(movimiento.monto);
      }

    }  
  }
};
