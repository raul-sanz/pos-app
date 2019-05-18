<template>
  <q-page padding>
    <div class="row">
      <div class="col-4">
        <q-input bottom-slots v-model="username" readonly>
        <template v-slot:before>
          <q-avatar>
            <img src="https://img.icons8.com/bubbles/50/000000/administrator-male.png">
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
        <q-btn color="cyan-1" size="20px" @click="newproducto" icon="img:https://img.icons8.com/dusk/64/000000/add.png" />
          
      </div>
    </div>
    <div class="q-pa-md">
      <q-markup-table separator="cell" flat bordered>
        <thead>
          <tr>
            <th class="text-right">Producto</th>
            <th class="text-right">Marca</th>
            <th class="text-right">Color</th>
            <th class="text-right">Modelo</th>
            <th class="text-right">Cantidad</th>
            <th class="text-right">Unidad</th>
            <th class="text-right">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in order" :key="index">
            <td class="text-right">{{product.name}}</td>
            <td class="text-right">{{product.marca}}</td>
            <td class="text-right">{{product.color}}</td>
            <td class="text-right">{{product.modelo}}</td>
            <td class="text-right">{{product.size}}</td>
            <td class="text-right">{{product.unity}}</td>
            <td class="text-right">
              <q-btn round color="red" icon="highlight_off" style="margin-right: 2px;" @click="removeItem(product, index)"/>
            </td>
          </tr>
          
        
        </tbody>
      </q-markup-table>
    </div>
    <div class="row">
    
      <add-product ></add-product>
      
      <div class="col-2 offset-8">
        <q-btn label="Cancelar" @click="clearOrder" />
      </div>
      <div class="col-2">
        <q-btn color="info" label="Enviar" @click="sendOrder" />
      </div>
      
    </div>
  </q-page>
</template>

<script >
import AddProduct from "../components/AddProduct";
import { date } from 'quasar'
import { mapState, mapMutations } from "vuex";
let timeStamp = Date.now()
export default {
  components:{AddProduct},
  name:'OrderPage',
  data(){
    return{
      dateNow:date.formatDate(timeStamp, 'YYYY-MM-DD'),
    }
  },
  computed:{
    ...mapState('datos',['user','car','order']),
    username(){
      return `${this.user.first_name} ${this.user.last_name}`
    },
  },
  created(){
    this.changeName('Generar Pedido')
  },
  methods:{
    ...mapMutations('datos',['setAddProd','removeToOrder','clearOrder','changeName']),
    newproducto(){
      this.setAddProd(true)
    },
    removeItem(item,i){
      this.$q.dialog({
        title: 'Estas seguro de remover el producto',
        message: `El producto (${item.name}) se removera de el pedido`,
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
        this.removeToOrder(i)
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    },
    sendOrder(){
      console.log(this.order);
    }
  }
}
</script>

