<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>

        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">
          <div v-if="origen=='ventas' && column=='accion'">
            <button @click="valor(index)">DETALLES</button>
          </div>
          <div v-if="column=='estado'&&itemValue(item, column)=='COMPLETO'">
            <span class="badge badge-success">{{itemValue(item, column)}} </span>
          </div>
          <div v-else-if="column=='estado'&&itemValue(item, column)!='COMPLETO'">
            <span class="badge badge-warning">{{itemValue(item, column)}} </span>
          </div>
          <div v-else>
            {{itemValue(item, column)}}
          </div>

        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex'


  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      origen: String
    },
    methods: {
      ...mapMutations(['seleccionarVenta']),
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      valor(index){

        this.$store.commit('compra/seleccionarCompra',index)

        //this.seleccionarVenta(index);
      }
    }
  }
</script>
<style>
</style>
