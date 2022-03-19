<template>
  <li class="dropdown nav-item"
      :is="tag"
      :class="{show: isOpen}"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggleDropDown"
      v-click-outside="closeDropDown">

    <a class="nav-link dropdown-toggle"
       >
      <slot name="title">
        <i :class="icon"></i>
        <span class="no-icon">{{title}}</span>
        <b class="caret"></b>
      </slot>
    </a>
    <div class=" show" v-show="isOpen">
      <slot>

      </slot>    
    </div>
  </li>
</template>
<script>
  export default {
    name: 'opc-drop',
    props: {
      title: String,
      icon: String,
      noClose: Boolean,
      tag: {
        type: String,
        default: 'li'
      }
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleDropDown () {
        this.isOpen = !this.isOpen
        this.$emit('change', this.isOpen)
      },
      closeDropDown () {
        this.isOpen = false
        this.$emit('change', this.isOpen)
      }
    }
  }
</script>
<style scoped>
  .dropdown .dropdown-toggle{
    cursor: pointer;
  }
  .item-drop{
    border-style: solid;
    border-width: 0 0 0.5pt 0;
    border-color: rgb(133, 133, 133);
    padding: 5pt 0 5pt 30pt;
    margin: 0 12pt 0 12pt;
    font-size: 10pt;
    /*font-weight: bold;*/
    cursor: pointer;
  }
  .item-drop:hover{
    background-color: rgba(65, 65, 65, 0.514);
  }
  .item-drop i{
    margin-right: 5pt;
  }
</style>
