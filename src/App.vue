<template>
  <div :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import EventBus from "./common/EventBus";

export default {
  mounted() {
    /*this.$store
      .dispatch("producto/getCategorias")
      .then((res) => {})
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("pasa por el error");

          EventBus.dispatch("logout");
        }
      });
    this.$store.dispatch("producto/getSubCategorias")
      .then((res) => {})
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("pasa por el error");

          EventBus.dispatch("logout");
        }
      });
    this.$store.dispatch("producto/getProductos")
      .then((res) => {})
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("pasa por el error");

          EventBus.dispatch("logout");
        }
      });*/
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  methods: {
    //...mapMutations(['iniciarMesas','llenarCajas']),
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  beforeDestroy() {
    EventBus.remove("logout");
  },
};
</script>
<style lang="scss">
.content {
  background-color: rgb(240, 240, 240) !important;
}
.dropdown-menu.show {
  margin-top: 35pt;
  margin-left: -55pt;
}
.text-divider {
  margin: 2em 0;
  line-height: 0;
  text-align: center;
  padding: 10pt 0 10pt 0;
}
.text-divider span {
  background-color: #ffffff;
  padding: 1em;
}
.text-divider:before {
  content: " ";
  display: block;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #f7f7f7;
}

.vue-notifyjs.notifications {
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>
