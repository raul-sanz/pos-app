<template>
<div>
  <div class="flex flex-center">
    <h5 class="q-ma-sm">Inicio de Sesión</h5>
  </div>
    
  <q-page padding class="flex flex-center">
    
    <div class="">
      <div class="">
      <q-input 
        type="email" 
        rounded 
        outlined 
        label="Correo" 
        v-model="email" 
        class="q-mb-sm"
        :rules="[val => val.includes('@') || 'Correo requerido']"
      >
        <template v-slot:append>
          <q-avatar>
            <img src="https://img.icons8.com/bubbles/100/000000/user.png">
          </q-avatar>
        </template>
      </q-input>

      <q-input 
        type="password" 
        rounded 
        outlined 
        label="Contraseña" 
        v-model="password" 
        class="q-mb-md"
        :rules="[val => val != '' || 'Contraseña requerida']"
      >
        <template v-slot:append>
          <q-avatar>
            <img src="https://img.icons8.com/color/96/000000/lock-2.png">
          </q-avatar>
        </template>
      </q-input>
      <q-btn 
      unelevated 
      rounded 
      color="info" 
      class="full-width"  
      icon="how_to_reg" 
      label="Iniciar Sesión"
      @click="login"
      :disable="validado"
       />
      
      <q-btn 
      unelevated 
      flat 
      color="secondary" 
      class="full-width"  
      icon="add" 
      label="Crear una cuenta"
      @click="$router.push('/register')"
       />
    </div>
    </div>
    
  </q-page>
</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  data(){
    return{
      email:'',
      password:''
    }
  },
  computed:{
    ...mapState('datos',['isLogged','token']),
    validado(){
      if(this.mail != '' && this.password != ''){
        return false
      }else{
        return true
      }
    }
  },
  created(){
    if (this.isLogged === true) {
      this.$router.push('/home')
    }
  },
  mounted() {
    if (this.token != '') {
      this.$router.push('/home')
    }
  },
  methods: {
    ...mapMutations('datos',['setIsLogged','setUser','setToken']),
    login(){
      this.$q.loading.show()
      let userData = {
        email:this.email,
        password:this.password
      }

      
      this.$axios.post('/login',userData).then(res=>{
        this.$q.loading.hide()
        console.log(res.data);
        this.setIsLogged(true)
        this.setUser(res.data.user[0])
        this.setToken(res.data.token.token)
        window.localStorage.setItem('key',res.data.token.token );
        this.$router.push('/')
      }).catch(err=>{
        this.$q.loading.hide()
        this.$q.notify({
          color:'negative',
          message:err.response.data.message,
          position: 'bottom'
        })
      }) 
      /*let confirmData = {
        email:this.email,
        password:this.password
      }

       let user = {id: 1, role_id: 1, username: "superadmin", email: "super@admin.com",first_name:'usuario',last_name:'de prueba'}
      if(JSON.stringify(userData) == JSON.stringify(confirmData)){
        this.$q.loading.hide()
        this.setIsLogged(true)
        this.setUser(user)
        this.$router.push('/')
      }else{
        this.$q.loading.hide()
        this.$q.notify({
          color:'negative',
          message:err.response.data.message,
          position: 'bottom'
        })
      }*/
    }
  }
}
</script>


<style scoped>
.center-top{
  margin-left: 40%;
}
</style>

