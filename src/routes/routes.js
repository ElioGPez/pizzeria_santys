import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'
import Vue from 'vue';
import Router from 'vue-router';

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Notifications from 'src/pages/Notifications.vue'
import Ventas from 'src/pages/Ventas/index.vue'
import NuevaVenta from 'src/pages/Ventas/Nueva/index.vue'
import Compras from 'src/pages/Compras/index.vue'
import NuevaCompra from 'src/pages/Compras/Nueva/index.vue'
import ArqueoCaja from 'src/pages/Cajas/index.vue'
import MovimientoCaja from 'src/pages/Cajas/Movimientos/index.vue'

import Consultorios from 'src/pages/Admin/index.vue'
import Clientes from 'src/pages/Clientes/index.vue'
import NuevoCliente from 'src/pages/Clientes/Nuevo/index.vue'
import Cuenta from 'src/pages/Clientes/Cuenta/index.vue'



import Login from 'src/pages/Login.vue';
import Register from 'src/pages/Register.vue';
import Home from 'src/pages/Home.vue';


import NuevoArticulo from 'src/pages/Articulos/Nuevo/index.vue'
import Articulos from 'src/pages/Articulos/index.vue'
import NuevaCategoria from 'src/pages/Categorias/Nueva/index.vue'
import Categorias from 'src/pages/Categorias/index.vue'
import NuevaSubCategoria from 'src/pages/SubCategorias/Nueva/index.vue'
import SubCategorias from 'src/pages/SubCategorias/index.vue'
//PEDIDOS
import Pedidos from 'src/pages/Pedidos/index.vue'
import Mesas from 'src/pages/Pedidos/Mesas/index.vue'

import Upgrade from 'src/pages/Upgrade.vue'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/home',
    children: [

      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'clientes',
        name: 'Clientes',
        component: Clientes
      },
      {
        path: 'clientes/nuevo',
        name: 'nuevo_cliente',
        component: NuevoCliente
      },
      {
        path: 'clientes/cuenta/:id',
        name: 'Cuenta',
        component: Cuenta
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'ventas',
        name: 'Ventas',
        component: Ventas
      },
      {
        path: 'ventas/nueva',
        name: 'nueva_venta',
        component: NuevaVenta
      },
      {
        path: 'compras',
        name: 'Compras',
        component: Compras
      },
      {
        path: 'compras/nueva',
        name: 'nueva_compra',
        component: NuevaCompra      
      },
      {
        path: 'cajas',
        name: 'Cajas',
        component: ArqueoCaja
      },
      {
        path: 'cajas/movimiento',
        name: 'movimiento_caja',
        component: MovimientoCaja      
      },
      {
        path: 'productos/nuevo',
        name: 'nuevo_producto',
        component: NuevoArticulo      
      },
      {
        path: 'productos',
        name: 'productos',
        component: Articulos      
      },
      {
        path: 'categorias/nueva',
        name: 'nueva_categoria',
        component: NuevaCategoria      
      },
      {
        path: 'categorias',
        name: 'categorias', 
        component: Categorias      
      },
      {
        path: 'sub_categorias/nueva',
        name: 'nueva_sub_categoria',
        component: NuevaSubCategoria      
      },
      {
        path: 'sub_categorias',
        name: 'sub_categorias', 
        component: SubCategorias      
      },
      {
      path: 'pedidos',
      name: 'pedidos', 
      component: Pedidos      
      },
      {
        path: 'mesas',
        name: 'mesas', 
        component: Mesas      
        },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]
});



router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }

  
}

);
