<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- BTN HIDE -->
        <i @click="$store.dispatch('hideSidebar')" style="width:20pt" class="fa fa-align-justify hide-menu" aria-hidden="true"></i>
      <!-- MENU -->
      <router-link to="/home">
        
        <i style="width:20pt" class="fa fa-home" aria-hidden="true"></i>
        MENU</router-link>

      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">

        <ul class="navbar-nav ml-auto">

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <div style="margin-right:10pt">
                      {{ currentUser.username }}

          </div>
        </li>
        |
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            CERRAR SESION
          </a>
        </li>
      </div>

        </ul>
      </div>
    </div>
  </nav>
</template>
<script>

import UserService from '../services/user.service';
import EventBus from "../common/EventBus";
import { mapGetters, mapActions } from "vuex";

  export default {
    
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },

      currentUser() {
        return this.$store.state.auth.user;
      },
      showAdminBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_ADMIN');
        }

        return false;
      },
      showModeratorBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_MODERATOR');
        }

        return false;
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      hideSidebar(){
        console.log('hdie presionado');
        this.$store.dispatch("hideSidebar");
      },
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    },



  }

</script>
<style>
.hide-menu{
  color: rgb(23, 105, 143);
  padding-right: 40pt;
}
.hide-menu:hover{
  cursor:pointer !important; cursor: hand !important;
  color: rgb(11, 56, 77);
}
@media (max-width: 991px){
.hide-menu{
  visibility: hidden;
}
.sidebar{
  visibility: inherit !important;
}
}
</style>
