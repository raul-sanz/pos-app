<template>
  <q-dialog v-model="updateFormUser" @hide="hideModal" @show="getUser">
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
              :rules="[ val => val != '' || 'Campo requerido']"
            />

            <q-input 
              v-model="usr.last_name"  
              placeholder="Apellidos"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />

            <q-input 
              v-model="usr.email"  
              placeholder="Correo"  
              :rules="[ 
                val => val != '' || 'Campo requerido',
                val => val.includes('@')  || 'Debe ser un correo'
                ]"
              dense 
            />

            <q-input 
              v-model="usr.address" 
              placeholder="Dirección"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />

            <q-input 
              v-model="usr.phone"  
              placeholder="Teléfono" 
              type="number" 
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />


            <q-input
              v-model="usr.age"
              placeholder="Edad"
              type="number"
              dense
              :rules="[ val => val != '' || 'Campo requerido']"
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
              <q-btn label="Guardar" type="submit" color="primary"/>
              
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
  name:'UpdateUser',
  props:{
    idi:{
      required:true
    },
    index:{
      required:true
    }
  },
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
    ...mapState('datos',['updateFormUser','token','user'])
  },
  created(){

  },
  methods:{
    ...mapMutations('datos',['setUpdateUser','setAddUsers','setRemoveUser','setAddUsers']),
    hideModal(){
      this.setUpdateUser(false)
    },
    CrearUsuario(){
      console.log(this.usr);
      this.$axios.put(
        `/users/${this.idi}`,
        this.usr,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      ).then(res=>{
        this.$q.notify({
            color:'positive',
            message:'Usuario actualizado'
          })
        this.setRemoveUser(this.index)
        this.setAddUsers(res.data.data[0])
        this.setUpdateUser(false)
      }).catch(err=>{
        this.$q.notify({
            color:'negative',
            message:'Intenta mas tarde'
          })
      })
      
    },
    clearForm(){
      this.usr = {}
    },
    back(){
      this.setUpdateUser(false)
    },
    getUser(){
      this.$axios.get(
        `/users/${this.idi}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      ).then(res=>{
        this.usr = res.data.data
      })
    }
  }
}
</script>

