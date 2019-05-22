<template>
  <q-layout view="lHh Lpr lFf">
    <q-header color="info" elevated v-if="isLogged" v-show="$router.currentRoute.fullPath != '/print'">
      <q-toolbar>
        <q-btn
          
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{namePage}}
        </q-toolbar-title>

        <q-btn 
          color="secondary" 
          rounded 
            
          @click="logout"
          label="Cerrar Sesión"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isLogged"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-toolbar class="q-mb-lg">
        <q-toolbar-title>
          Menú
        </q-toolbar-title>
      </q-toolbar>
      <q-separator  />
      <q-list v-for="(menuItem, index) in menuList" :key="index">

        <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple @click="$router.push(menuItem.to)">
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>

        <q-separator v-if="menuItem.separator" />

      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapMutations } from "vuex";
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      IsLogged:false,
      menuList:[
        {
          icon: 'img:https://img.icons8.com/dusk/64/000000/price-tag.png',
          label: 'Generar venta',
          separator: true,
          to:'/home'
        },
        {
          icon: 'img:https://img.icons8.com/dusk/64/000000/package.png',
          label: 'Inventario',
          separator: true,
          to:'/products'
        },
        {
          icon: 'img:https://img.icons8.com/dusk/64/000000/groups.png',
          label: 'Usuarios',
          separator: true,
          to:'/users'
        },
        {
          icon: 'img:https://img.icons8.com/plasticine/100/000000/combo-chart.png',
          label: 'Generar corte',
          separator: true,
          to:'/reports'
        },
        {
          icon: 'img:https://img.icons8.com/dusk/64/000000/todo-list.png',
          label: 'Generar pedido',
          separator: true,
          to:'/orders'
        }
      ]
    }
  },
  computed:{
    ...mapState('datos',['isLogged','namePage'])
  },
  methods: {
    ...mapMutations('datos',['setIsLogged','setUser','setToken']),
    openURL,
    logout(){
      this.$q.dialog({
        title: '¿Estas seguro de cerrar sesión?',
        message: `La sesión se cerrará y algunos datos prodrian perderse`,
        persistent: true,
        cancel:true,
        cancel:{
          label:'Cancelar',
          color:'red'
        },
        ok:{
          color:'primary'
        }
      }).onOk(() => {
        this.setIsLogged(false)
        this.setToken('')
        this.setUser({})
        this.$router.push('/login')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    }
  }
}
</script>

<style>
</style>
