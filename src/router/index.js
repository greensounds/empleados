import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import newEmpleado from '@/components/newEmpleado'
import viewEmpleado from '@/components/viewEmpleado'
import editEmpleado from '@/components/editEmpleado'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-empleado',
      component: newEmpleado
    },
    {
      path: '/edit/:empleado_id',
      name: 'edit-empleado',
      component: editEmpleado
    },
    {
      path: '/:empleado_id',
      name: 'view-empleado',
      component: viewEmpleado
    },
  ]
})
