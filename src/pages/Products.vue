<template>
  <q-page padding>
    <div class="row">
      <div class="col-3">
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
      <div class="col-4 offset-1">

        <q-input filled v-model="strg" dense style="padding-top:15px;" @keyup="filter_products">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-3 offset-1">
        <q-input filled v-model="dateNow" readonly >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>   
      </div>
    </div>
    <div class="row">
      
      <div class="col-2 offset-10">
        <q-btn size="20px"
          
          color="cyan-1"
          icon="img:https://img.icons8.com/office/40/000000/add-tag.png" 
          @click="newproducto" />
      </div>
    </div>
    <div class="q-pa-md">
          <q-markup-table separator="cell" flat bordered>
      <thead>
        <tr>
          <th class="text-left">Nº</th>
          <th class="text-right">Clave</th>
          <th class="text-right">Producto</th>
          <th class="text-right">Descripcion</th>
          <th class="text-right">En Almacen</th>
          <th class="text-right">Precio</th>
          <th class="text-right">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td class="text-left">{{index + 1}}</td>
          <td class="text-right">{{product.code}}</td>
          <td class="text-right">{{product.name}}</td>
          <td class="text-right">{{product.description}}</td>
          <td class="text-right">{{product.stock}}</td>
          <td class="text-right">${{product.price}}</td>
          <td class="text-right">
            <q-btn round color="red" icon="delete" style="margin-right: 2px;" @click="deleteProduct(product,index)"/>
            <q-btn round color="secondary" icon="edit" style="margin-left: 2px;" @click="editProd(product.id,index)"/>
          </td>
          
        </tr>
        
       
      </tbody>
    </q-markup-table>
    </div>
    <div>
    
      <new-product newProp="true"></new-product>
      <update-product :prod="ide" :ind="ind"></update-product>
    </div>
  </q-page>
</template>

<script >
import NewProduct from "../components/NewProduct";
import UpdateProduct from "../components/UpdateProduct";
import AlertComponent from "../components/Alert";
import { date } from 'quasar'
import { mapState, mapMutations } from "vuex";
let timeStamp = Date.now()
export default {
  components:{NewProduct, AlertComponent,UpdateProduct},
  name:'ProductsPage',
  data(){
    return{
      dateNow:date.formatDate(timeStamp, 'YYYY-MM-DD'),
      data: [],
      ide:0,
      ind:0,
      strg:''
    }
  },
  computed:{
    ...mapState('datos',['user','products','token']),
    username(){
      return `${this.user.first_name} ${this.user.last_name}`
    },
  },
  created(){
    this.changeName('Inventario')
    this.$axios.get(
      '/products',
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    )
    .then(res=>{
      this.setProducts(res.data.data)
    })
  },
  methods:{
    ...mapMutations('datos',['setNewProd','changeName','setProducts','setRemoveProduct','setUpdateProd','filterProd']),
    newproducto(){
      this.setNewProd(true)
    },
    editProd(i,inde){
      this.ide = i
      this.ind = inde
      this.setUpdateProd(true)

    },
    deleteProduct(item,i){
      this.$q.dialog({
        title: '¿Desea eliminar este producto?',
        message: `El producto (${item.name}) se eliminará de manera permanente`,
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
          `/products/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        ).then(res=>{
          this.setRemoveProduct(i)
          this.$q.notify({
            color:'positive',
            message:'Producto removido'
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
    },
    filter_products(){
      if (this.strg != '') {
        //this.filterProd(this.strg)
        this.$q.loading.show()
         this.$axios.get(
            `/filtro/${this.strg}`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(res=>{
           this.$q.loading.hide()
            this.setProducts(res.data.data)
            console.log(res.data.data)
          })
      } else {
        this.$q.loading.show()
         this.$axios.get(
            '/products',
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(res=>{
           this.$q.loading.hide()
            this.setProducts(res.data.data)
          })
      }
      
    }
  }
}
</script>

