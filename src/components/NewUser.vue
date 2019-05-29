<template>
  <q-dialog v-model="showFormUser" @hide="hideModal">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://img.icons8.com/bubbles/50/000000/groups.png">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Crea</span> tu Usuario</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section >
          <q-form
            @submit="CrearUsuario"
            @reset="clearForm"
            class="q-gutter-md"
          >
            <q-input
              v-model="usr.first_name"
              placeholder="Nombre"
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
            />

            <q-input 
              v-model="usr.last_name"  
              placeholder="Apellidos"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />

            <q-input 
              v-model="usr.email"  
              placeholder="Correo"  
              :rules="[ 
                val => val != '' || 'Campo requierido',
                val => val.includes('@')  || 'Debe ser un correo'
                ]"
              dense 
            />

            <q-input 
              v-model="usr.password"  
              type="password"
              placeholder="Contraseña"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />

            <q-input 
              v-model="usr.phone"  
              placeholder="Teléfono" 
              type="number" 
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />


            <q-input
              v-model="usr.age"
              placeholder="Edad"
              type="number"
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
            />
           
            <q-select
              filled
              v-model="usr.role_id"
              :options="options"
              label="Rol de usuario"
              emit-value
              map-options
            />

            <div>
              <q-btn label="Crear" type="submit" color="primary"/>
               <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
               <q-btn label="Regresar" @click="back" type="reset" color="secondary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name:'NewUser',
  data(){
    return{
      usr:{},
       options: [
        {
          label: 'Dirección',
          value: 1
        },
        {
          label: 'Gerencia',
          value: 2
        },
        {
          label: 'Contabilidad',
          value: 3
        },
        {
          label: 'Vendedor',
          value: 4
        }
      ]
    }
  },
  computed:{
    ...mapState('datos',['showFormUser','token','user'])
  },
  methods:{
    ...mapMutations('datos',['setNewUser','setAddUsers']),
    hideModal(){
      this.setNewUser(false)
    },
    CrearUsuario(){
      this.usr.username = `${this.usr.first_name}${this.usr.last_name}`
      this.usr.company_id = this.user.company_id
      console.log(this.usr);
      this.$axios.post(
        '/users',
        this.usr,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      ).then(res=>{
        this.setAddUsers(res.data.data)
        this.setNewUser(false)
        this.user = {}
      }).catch(err=>{

      })
      
    },
    clearForm(){
      this.usr = {}
    },
    back(){
      this.setNewUser(false)
    }
  }
}
</script>

