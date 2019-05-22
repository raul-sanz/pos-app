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
      <div class="col-6 offset-2">
        <div class="row">
          <div class="col-6">
            <div class="q-gutter-md">
              <!-- <q-btn label="Forma de pago" class="no-shadow">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section>New tab</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn> -->
            <q-select
              filled
              v-model="payType"
              :options="options"
              label="Forma de pago"
              stack-label
              color="teal"
            >
              <template v-slot:option="scope" >
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  
                </q-item>
              </template>
            </q-select>
            </div>
          </div>
          <div class="col-5 offset-1">
            <q-input filled v-model="dateNow" readonly >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>   
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4 offset-8">
        <q-btn color="green-13" class="float-right" icon="add_shopping_cart"  @click="addProductToList" />
      </div>
    </div>
    <div class="q-pa-md" >
          <q-markup-table separator="cell" flat bordered >
      <thead >
        <tr>
          <th class="text-left">No.</th>
          <th class="text-right">Clave</th>
          <th class="text-right">Producto</th>
          <!--  <th class="text-right">Descripcion</th>-->
          <th class="text-right">Cantidad</th>
          <th class="text-right">Precio unitario</th>
          <th class="text-right">Importe</th>
          <th class="text-right">Opciones</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="(product, index) in carrito" :key="index">
          <td class="text-left">{{product.id}}</td>
          <td class="text-right">{{product.code}}</td>
          <td class="text-right">{{product.name}}</td>
         <!-- <td class="text-right">{{product.description}}</td>  -->
          <td class="text-right">{{product.size}}</td>
          <td class="text-right">${{product.price}}</td>
          <td class="text-right">${{product.total}}</td>
          <td class="text-right">
            <q-btn round color="red" icon="highlight_off" style="margin-right: 2px;" @click="removeOneProd(product, index)"/>
            <q-btn round color="positive" icon="add_circle_outline" style="margin-right: 2px;" @click="addOneProd(product, index)"/>
          </td>
        </tr>
        
       
      </tbody>
    </q-markup-table>
    </div>
    <div class="row q-mt-lg">
      <div class="col-7">
        <q-input filled v-model="totalString" dense readonly />
      </div>
      <div class="col-4 offset-1 ">
        <q-card>
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label>Subtotal</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>${{subtotal}}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Iva 16%</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>${{iva}}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Total</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>${{totalAll}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-3">
        <q-btn color="primary" label="Grabar e imprimir" @click="aceptar"/>
      </div>
      <div class="col-3">
        <q-btn color="red" label="Cancelar" @click="cancelar"/>
      </div>
    </div>
    <!-- Add modal to add product -->
    <q-dialog v-model="addPro" full-height full-width @hide="closeModal">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://img.icons8.com/bubbles/50/000000/checklist.png">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Seleciona</span>  los productos que quieras agregar a la lista de ventas</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <div class="q-pa-md">
            <q-table
              title="Treats"
              :data="data"
              :columns="columns"
              row-key="name"
              :selected-rows-label="getSelectedString"
              selection="multiple"
              :selected.sync="selected"
            />
          </div>
        </q-card-section>
        <q-card-actions>
        <q-btn color="primary" @click="addToCarrito">Agregar</q-btn>
        <q-btn flat color="red" @click="addPro = false">Cancelar</q-btn>
      </q-card-actions>
      </q-card>
    </q-dialog>
  
  </q-page>
</template>

<script>
import toString from '../mixins/toString'
import { date } from 'quasar'
import { mapState, mapMutations } from "vuex";
let timeStamp = Date.now()

export default {
  mixins:[toString],
  name: 'PageIndex',
  data(){
    return {
      dateNow: date.formatDate(timeStamp, 'YYYY-MM-DD'),
     options: [
        {
          
          icon: 'img:https://img.icons8.com/color/48/000000/paypal.png'
        },
        {
          
          icon: 'img:https://img.icons8.com/color/48/000000/mastercard-credit-card.png'
        },
        {
          
          icon: 'img:https://img.icons8.com/color/48/000000/visa.png'
        },
        {
         
          icon: 'img:https://img.icons8.com/office/16/000000/bitcoin.png'
        },
        {
          
          icon: 'img:https://img.icons8.com/color/48/000000/cash-.png'
        }
      ],
      pago:'',
      payType:null,
      totalNumber:161,
      addPro:false,
      selected: [],
      carrito: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Producto',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'description', align: 'center', label: 'Descripcion', field: 'description', width:'100px'},
        { name: 'type', label: 'Tipo', field: 'type'},
        { name: 'stock', label: 'En Alamcen', field: 'stock' },
        { name: 'code', label: 'Clave', field: 'code' },
        { name: 'price', label: 'Precio', field: 'price',format: val => `$${val}` }
      ] 
      ,
      data: []
    }
  },
  created(){
    this.changeName('Venta')
    this.$axios.get(
      '/products',
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    )
    .then(res=>{
      console.log(res);
      this.data = res.data.data
    })
  },
  computed:{
    ...mapState('datos',['user','car','allProducts','token']),
    username(){
      return `${this.user.first_name} ${this.user.last_name}`
    },
    totalString(){
      return this.NumeroALetras(this.totalAll,"PESOS")
    },
    subtotal(){
      let toal = 0
      if (this.carrito.length > 0) {
        this.carrito.map(el=>{
          toal += el.total
        })
      }
      return toal
    },
    iva(){
      return this.subtotal*0.16
    },
    totalAll(){
      return this.subtotal + this.iva
    },

  },
  watch:{

  },
  methods:{
    ...mapMutations('datos',['changeName','addToCar','removeTocar','setTicket']),
    aceptar(){
     
      let tick = {}
      tick.productos = this.carrito

      tick.subtotal = this.subtotal
      tick.total = this.totalAll
      tick.iva = this.iva

      this.setTicket(tick)

       this.$router.push('/print')

    },
    imprimir(){
      console.log('imprimir');
    },
    cancelar(){
      console.log('cancelar');
    },
    removeProduct(pro,i){
      console.log(i);
    },
    addProductToList(){
      this.addPro = true
    },
    closeModal(){
      this.addPro = false
     
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} productos ${this.selected.length > 1 ? 's' : ''} seleccionados de ${this.data.length}`
    },
    addToCarrito(){
      this.selected.map(el=>{
        if(this.carrito.indexOf(el) === -1){
          this.carrito.push(el)
        }
      })
      this.selected = []

       this.carrito.map(el=>{
         if (el.size == undefined) {
            this.$set(el,'size',1)
            this.$set(el,'total',el.price)
         }
         
        //el.size = 1
        //el.total = el.price
      })
      this.addPro = false
    },
    removeOneProd(pro,i){
      this.$q.dialog({
        title: 'Estas seguro de eliminar un producto',
        message: `Se reducirá la cantidad de el producto en venta`,
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
        if (pro.size == 1) {
          this.carrito.splice(i,1)
        }else if(pro.size){
          //this.carrito[i].size -1
          pro.size -= 1
          pro.total = pro.price*pro.size
        }
        console.log(pro);
        this.$q.notify('Producto removido')
      })
    },
    addOneProd(pro,i){
      pro.size += 1
      pro.total = pro.price*pro.size

      console.log(this.carrito);
      this.$q.notify('Producto agregado')
    }
  }
}
</script>
<style  lang="stylus">
.q-select__dialog{
  width: 150px !important;
}
</style>

