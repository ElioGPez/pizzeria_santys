<template>
    <div class="row">
      <div class="col-2 pt-4">
        <button
          data-toggle="modal"
          data-target="#productos_modal"
          type="button"
          class="btn"
        >
          <i style="width: 12pt" class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <div class="col-10">
        <base-input
          type="text"
          label=" "
          disabled
          placeholder="Producto..."
          v-model="producto.nombre"
        >
        </base-input>
      </div>

    <PModal />
  </div>
</template>

<script>
import PModal from "src/components/Modals/ProductosModal.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ProModal",
  components: { PModal },
  computed: {
    ...mapGetters({
      producto: "producto/producto",
    }),
  },
};
</script>
<style scoped>

</style>