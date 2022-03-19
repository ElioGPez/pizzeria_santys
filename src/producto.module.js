import axios from 'axios'
import authHeader from './services/auth-header';
import api from './services/api';


export const producto = {
  namespaced: true,
  state: {
    categorias: [
      {
        nombre: '',
        descripcion: ''
      },
    ],
    sub_categorias: [
      {
        nombre: '',
        descripcion: ''
      },
    ],
    productos: [
      {
        nombre: '',
        descripcion: '',
        stock: '',
        precio: ''
      },
    ],
    producto: ''
  },
  actions: {
    getCategorias({ commit }) {
      return new Promise((resolve, reject) => {

        api({ url: 'http://localhost:8090/api/categoria/', headers: authHeader(), method: 'GET' })
          .then(resp => {
            console.log(resp.data)

            commit('setCategorias', resp.data)

            //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
            resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(error => {//En caso de error al realizar la consulta al Servidor
            reject(error)
          })
      })

    },
    getProductos({ commit }) {
      return new Promise((resolve, reject) => {

        api({ url: 'http://localhost:8090/api/producto/', headers: authHeader(), method: 'GET' })
          .then(resp => {
            console.log(resp.data)

            commit('setProductos', resp.data)

            //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
            resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(error => {//En caso de error al realizar la consulta al Servidor
            reject(error)
          })
      })
    },
    getSubCategorias({ commit }) {
      return new Promise((resolve, reject) => {

        api({ url: 'http://localhost:8090/api/sub_categoria/', headers: authHeader(), method: 'GET' })
          .then(resp => {
            console.log("pasa" + resp.data)

            commit('setSubCategorias', resp.data)

            //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
            resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(error => {//En caso de error al realizar la consulta al Servidor
            reject(error)
          })
      })
    },
    guardarCategoria({ commit }, categoria) {
      return new Promise((resolve, reject) => {

        api.post('http://localhost:8090/api/categoria/',
          {
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
          }, { headers: authHeader(), method: 'POST' })
          .then(resp => {
            console.log(resp.data)
            //commit('setClientes', resp.data.data)

            resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(error => {//En caso de error al realizar la consulta al Servidor
            reject(error)
          })
      })
    },
    guardarSubCategoria({ commit }, sub_categoria) {
      return new Promise((resolve, reject) => {

        api.post('http://localhost:8090/api/sub_categoria?categoria_id=' + sub_categoria.categoria_id,
          {
            nombre: sub_categoria.nombre,
            descripcion: sub_categoria.descripcion,
            categoria_id: sub_categoria.categoria_id
          }, { headers: authHeader(), method: 'POST' })
          .then(resp => {
            console.log(resp.data)
            //commit('setClientes', resp.data.data)

            resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(error => {//En caso de error al realizar la consulta al Servidor
            reject(error)
          })
      })
    },
    guardarProducto({ commit }, producto) {
      return new Promise((resolve, reject) => {

        api.post('http://localhost:8090/api/producto/?subcategoria_id=' + producto.sub_categoria_id,
          {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            stock: producto.stock,
            precio: producto.precio
          }, { headers: authHeader(), method: 'POST' })
          .then(resp => {
            console.log(resp.data)
            //commit('setClientes', resp.data.data)

            resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(error => {//En caso de error al realizar la consulta al Servidor
            reject(error)
          })
      })
    },
    setProducto({ commit }, producto) {
      commit('setProducto', producto)
    }
  },
  mutations: {
    setCategorias(state, categorias) {
      state.categorias = categorias;
    },
    setSubCategorias(state, sub_categorias) {
      state.sub_categorias = sub_categorias;
    },
    setProductos(state, productos) {
      state.productos = productos;
    },
    setProducto(state, producto) {
      state.producto = producto;
    },
    limpiarProducto(state) {
      state.producto = '';
    },
  },
  getters: {
    producto: state => state.producto,
    sub_categorias: state => state.sub_categorias,
    categorias: state => state.categorias,
  }
};
