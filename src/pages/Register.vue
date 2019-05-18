<template>
<div>
  <div class="flex flex-center">
    <h5 class="q-ma-sm">Registra tu empresa</h5>
  </div>
    
  <q-page padding >
    
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      vertical
      animated
    >
      <q-step
        :name="1"
        title="Datos de tu empresas"
        icon="settings"
        :done="step > 1"
      >
         <q-input class="q-mb-md" label="Nombre" v-model="datos.name"  dense />

         <q-input class="q-mb-md" label="Direccion" v-model="datos.address"  dense />

         <q-input class="q-mb-md" label="Telefono" v-model="datos.phone" type="tel" dense />

         <q-input class="q-mb-md" label="Razon social" v-model="datos.business_name"  dense />
      </q-step>

      <q-step
        :name="2"
        title="Datos personales"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-input class="q-mb-md" label="Nombre" v-model="datos.first_name"  dense />

         <q-input class="q-mb-md" label="Apellidos" v-model="datos.last_name"  dense />

         <q-input class="q-mb-md" label="Telefono" v-model="datos.user_phone" type="tel" dense />

         <q-input class="q-mb-md" label="Edad" v-model="datos.age"  dense />
      </q-step>

      <q-step
        :name="3"
        title="Datos de acceso"
        icon="assignment"
        :done="step > 3"
      >
        <q-input class="q-mb-md" label="Email" v-model="datos.email" type="email" dense :rules="[val => val.includes('@') || 'Verifica que el correo sea real']"/>

         <q-input class="q-mb-md" label="Contraseña" v-model="datos.password" type="password" dense />

         <q-input class="q-mb-md" label="Confirma tu contraseña" v-model="datos.password_confirm" type="password" dense :rules="[val => val == this.datos.password || 'La contraseñas no coinciden']"/>

      </q-step>

      <q-step
        :name="4"
        title="Terminar"
        icon="add_comment"
      >
      <div class="row">
        <div class="col-5">
          <q-card flat bordered class="">
          <q-card-section>
            <h6 class="titulo_">Datos de la empresa</h6>
          </q-card-section>
             
          <q-separator />
          
          <q-card-section>
            <p><span class="desc_">Nombre:</span> <span>{{datos.name}}</span></p>
            <p><span class="desc_">Direccion:</span> <span>{{datos.address}}</span></p>
            <p><span class="desc_">Telefono:</span> <span>{{datos.phone}}</span></p>
            <p><span class="desc_">Razon social:</span> <span>{{datos.business_name}}</span></p>
          </q-card-section>
        </q-card> 
        </div>
        <div class="col-5 offset-1">
          <q-card flat bordered class="">
          <q-card-section>
            <h6 class="titulo_">Datos del usuario</h6>
          </q-card-section>

          <q-separator />
          
          <q-card-section>
            <p><span class="desc_">Nombre:</span> <span>{{fullname}}</span></p>
            <p><span class="desc_">Telefono:</span> <span>{{datos.user_phone}}</span></p>
            <p><span class="desc_">Edad:</span> <span>{{datos.age}}</span></p>
            <p><span class="desc_">Correo:</span> <span>{{datos.email}}</span></p>
          </q-card-section>
        </q-card>
          
          
        </div>
      </div>
        
        
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step < 4 " @click="$refs.stepper.next()" color="secondary" label="Continua" />
          <q-btn v-if="step === 4 " @click="sendData" color="primary" label="Crear" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Volver" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    
  </q-page>
</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  data(){
    return{
      step:1,
      datos:{}
    }
  },
  computed:{
    ...mapState('datos',['isLogged']),
    fullname(){
      return `${this.datos.first_name} ${this.datos.last_name}`
    }
  },
  created(){
    if (this.isLogged == true) {
      this.$router.push('/home')
    }
  },
  methods: {
    ...mapMutations('datos',['setIsLogged','setUser','setToken']),
    sendData(){

      console.log(this.datos);
      let size = Object.keys(this.datos).length
      if (size < 11) {
        console.log('Nope');
        this.$q.notify({
          color:'negative',
          message:'Verifica que todos los datos esten completos correctamente',
          position: 'bottom'
        })
      }else{
        this.$q.loading.show()
        this.$axios.post('register',this.datos).then(res=>{
        this.$q.loading.hide()
        console.log(res.data);
        /* this.setIsLogged(true)
        this.setUser(res.data.user[0])
        this.setToken(res.data.token.token) */
        this.$router.push('/')
      }).catch(err=>{
        this.$q.loading.hide()
        this.$q.notify({
          color:'negative',
          message:err.response.data.message,
          position: 'bottom'
        })
      }) 
        /* setTimeout(() => {
          this.$q.loading.hide()
          this.$q.dialog({
            title: 'Exito',
            message: `Tu cuenta se ha creado satisfactoriamente`,
            persistent: true,
            cancel:false,
            ok:{
              color:'primary'
            }
          }).onOk(() => {
            this.$router.push('/login')
          })
        }, 3000); */
      }
      
    

      
       

    }
  }
}
</script>


<style scoped>
.center-top{
  margin-left: 40%;
}
.desc_{
  padding: 3px; 
  background-color: #027be3a8;
  border-radius: 4px; margin-right: 3px; 
  color: #ffffff;
  font-size: 12px;
}
.titulo_{
  /*  border-radius: 3px; */
  margin: 10px 0px; 
 /*  background-color: #0290e3; 
  padding: 5px; 
  box-shadow: 2px 2px 4px 0px #9e9e9e; 
  color: rgb(238, 238, 238); */
  font-size: 15px;
}
</style>

