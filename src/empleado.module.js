import axios from 'axios'
import authHeader from './services/auth-header';
import api from './services/api';


export const empleado = {
  namespaced: true,
  state: {
    empleados: [
      {
        nombre: '',
        direccion: '',
        cargo: '',
        telefono: '',
        email: ''
      },
    ],
    empleado: ''
  },
  actions: {
    getEmpleados({ commit }) {
      return new Promise((resolve, reject) => {
        api({ url: 'http://localhost:8090/api/empleado/', headers: authHeader(), method: 'GET' })
          .then(resp => {
            console.log(resp.data)
            commit('setEmpleados', resp.data)

            resolve(resp)
          })
          .catch(error => {
            reject(error)
          })
      })

    },
  },
  mutations: {
    setEmpleados(state, empleados) {
      state.empleados = empleados;
    },
  },
  getters: {
    empleados: state => state.empleados,
  }
};
