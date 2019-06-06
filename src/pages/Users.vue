<template>
  <q-page padding>
    <div class="row">
      <div class="col-4">
        <q-input bottom-slots v-model="username" readonly>
        <template v-slot:before>
          <q-avatar>
            <img :src="user.company.logo != null ? user.company.logo : 'https://img.icons8.com/bubbles/50/000000/administrator-male.png'">
          </q-avatar>
        </template>
        <template v-slot:hint>
          Usuario
        </template>
      </q-input>
      </div>
      <div class="col-3 offset-5">
        <q-input filled v-model="dateNow" readonly >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>   
      </div>
    </div>
    <div class="row">
      <div class="col-2 offset-10">
        <q-btn size="20px" color="cyan-1" icon="img:https://img.icons8.com/color/48/000000/add-user-group-man-man.png" @click="newproducto" />
      </div>
    </div>
    <div class="q-pa-md">
          <q-markup-table separator="cell" flat bordered>
      <thead>
        <tr>
          <th class="text-left">Nº</th>
          <th class="text-right">Nombre</th>
          <th class="text-right">Apellidos</th>
          <th class="text-right">Rol</th>
          <th class="text-right">Email</th>
          <th class="text-right">Telefono</th>
          <th class="text-right">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td class="text-left">{{index + 1}}</td>
          <td class="text-right">{{user.first_name}}</td>
          <td class="text-right">{{user.last_name}}</td>
          <td class="text-right">{{user.role.name}}</td>
          <td class="text-right">{{user.email}}</td>
          <td class="text-right">{{user.phone}}</td>
          <td class="text-right">
            <q-btn round color="red" icon="delete" style="margin-right: 2px;" @click="deleteUser(user,index)"/>
            <q-btn round color="secondary" icon="edit" style="margin-left: 2px;" @click="updateUser(user.id, index)"/>
          </td>
        </tr>
        
       
      </tbody>
    </q-markup-table>
    </div>
    <div>
    
      <new-user ></new-user>
      <update-user :idi="ide" :index="ind"></update-user>
    </div>
  </q-page>
</template>

<script >
import UpdateUser from "../components//UpdateUser";
import NewUser from "../components/NewUser";
import { date } from 'quasar'
import { mapState, mapMutations } from "vuex";
let timeStamp = Date.now()
export default {
  components:{NewUser, UpdateUser},
  name:'UserPage',
  data(){
    return{
      dateNow:date.formatDate(timeStamp, 'YYYY-MM-DD'),
      ide:0,
      ind:0
    }
  },
  computed:{
    ...mapState('datos',['user','car','users','token']),
    username(){
      return `${this.user.first_name} ${this.user.last_name}`
    },
  },
  created(){
    this.changeName('Usuarios')
    this.$axios.get(
      '/users',
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    )
    .then(res=>{
      console.log(res);
      this.setUsers(res.data.data)
    })
  },
  methods:{
    ...mapMutations('datos',['setNewUser','changeName','setUsers','setRemoveUser','setUpdateUser']),
    newproducto(){
      this.setNewUser(true)
    },
    updateUser(id,index){
      this.ide = id
      this.ind = index
      this.setUpdateUser(true)
    },
    deleteUser(item,i){
      this.$q.dialog({
        title: '¿Desea eliminar este usuario?',
        message: `El usuario (${item.first_name}) se eliminará de manera permanente`,
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
        this.$axios.delete(
          `/users/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        ).then(res=>{
          this.setRemoveUser(i)
          this.$q.notify({
            color:'positive',
            message:'Usuario removido'
          })
        }).catch(err=>{
          console.log(err);
          this.$q.notify({
            color:'negative',
            message:'Upss algo salio mal, intenta mas tarde'
          })
        })
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    }
  }
}
</script>

