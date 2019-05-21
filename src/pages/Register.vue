<template>
<div>
  <q-header elevated style="background-color:rgb(255, 253, 253);" @click="$router.push('/login')">
  <q-toolbar class="text-primary">
    <q-btn flat round dense icon="keyboard_backspace" />
    <q-toolbar-title>
        <div class="flex flex-center">
        <p class="q-ma-sm">Registra tu empresa</p>
      </div>
    </q-toolbar-title>
  </q-toolbar>
 </q-header>
    
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

         <q-input class="q-mb-md" label="Dirección" v-model="datos.address"  dense />

         <q-input class="q-mb-md" label="Teléfono" v-model="datos.phone" type="tel" dense />

         <q-input class="q-mb-md" label="Razón social" v-model="datos.business_name"  dense />
      </q-step>

      <q-step
        :name="2"
        title="Datos personales"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-input class="q-mb-md" label="Nombre" v-model="datos.first_name"  dense />

         <q-input class="q-mb-md" label="Apellidos" v-model="datos.last_name"  dense />

         <q-input class="q-mb-md" label="Teléfono" v-model="datos.user_phone" type="tel" dense />

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
          <q-card-section style="background-color: #00BCD4;padding:0;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://img.icons8.com/bubbles/50/000000/organization.png">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Empresa</q-item-label>
                <q-item-label caption>Datos de la empresa</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
             
          <q-separator />
          
          <q-card-section>
             <q-list separator>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Nombre</q-item-label>
                  <q-item-label caption>{{datos.name}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Dirección</q-item-label>
                  <q-item-label caption>{{datos.address}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Teléfono</q-item-label>
                  <q-item-label caption>{{datos.phone}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Razón social</q-item-label>
                  <q-item-label caption>{{datos.business_name}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card> 
        </div>
        <div class="col-5 offset-1">
          <q-card flat bordered class="">
          <q-card-section style="background-color: #00BCD4;padding:0;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://img.icons8.com/bubbles/50/000000/administrator-male.png">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Usuario</q-item-label>
                <q-item-label caption>Datos del usuario</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-separator />
          
          <q-card-section>
             <q-list separator>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Nombre</q-item-label>
                  <q-item-label caption>{{fullname}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Teléfono</q-item-label>
                  <q-item-label caption>{{datos.user_phone}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Edad</q-item-label>
                  <q-item-label caption>{{datos.age}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>Correo</q-item-label>
                  <q-item-label caption>{{datos.email}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            
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
      if (this.datos.first_name == undefined ) {
        return ''
      }else if(this.datos.last_name == undefined){
        return `${this.datos.first_name}`
      }else{
        return `${this.datos.first_name} ${this.datos.last_name}`
      }
      
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
        this.$axios.post('/register',this.datos).then(res=>{
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

