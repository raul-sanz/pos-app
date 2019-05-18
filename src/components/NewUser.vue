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
              v-model="usr.Password"  
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
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
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
      usr:{}
    }
  },
  computed:{
    ...mapState('datos',['showFormUser'])
  },
  methods:{
    ...mapMutations('datos',['setNewUser']),
    hideModal(){
      this.setNewUser(false)
    },
    CrearUsuario(){
      console.log(this.usr);
      this.setNewUser(false)
      this.user = {}
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

