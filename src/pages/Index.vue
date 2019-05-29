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
      <div class="col-6 offset-2">
        <div class="row">
          <div class="col-6">
            <div class="q-gutter-md">
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
                  <q-item-label>IVA {{cantIva}}%</q-item-label>
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
    <q-dialog v-model="print">
      <q-card>
        <q-card-section >
          <div class="ticket">
            <img :src="user.company.logo" alt="">
            <p class="centrado">TICKET DE COMPRA
              <br>{{user.company.address}}  
              <br>{{dateHourNow}} {{what}}<br>Orden #{{order}}</p>
            <table class="table">
              <thead>
                <tr class="tr">
                  <th class="cantidad th" style="padding-right: 5px;word-break: normal;">CANT</th>
                  <th class="producto th">PRODUCTO</th>
                  <th class="precio th">$$</th>
                </tr>
              </thead>
              <tbody>
                <tr class="tr" v-for="product in ticket.productos" :key="product.id">
                  <td class="cantidad td">{{product.size}}</td>
                  <td class="producto td">{{product.name}}</td>
                  <td class="precio td">${{product.total}}</td>
                </tr>
                <tr class="tr" style="background-color: #e0e0e0;">
                  <td class="cantidad td"></td>
                  <td class="producto td">Subtotal</td>
                  <td class="precio td">${{ticket.subtotal}}</td>
                </tr>
                <tr class="tr" style="background-color: #e0e0e0;">
                  <td class=" td"></td>
                  <td class=" td">IVA</td>
                  <td class=" td">${{ticket.iva}}</td>
                </tr>
                <tr class="tr" style="background-color: #e0e0e0;">
                  <td class=" td"></td>
                  <td class=" td">TOTAL</td>
                  <td class=" td">${{ticket.total}}</td>
                </tr>
              </tbody>
            </table>
            <p class="centrado">¡GRACIAS POR SU COMPRA!</p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Aceptar" @click="saveSale" color="positive" v-close-popup />
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
     dateHourNow: date.formatDate(timeStamp, 'YYYY-MM-DD HH:MM:SS'),
     options: [
        {icon: 'img:https://img.icons8.com/color/48/000000/paypal.png'},
        {icon: 'img:https://img.icons8.com/color/48/000000/mastercard-credit-card.png'},
        {icon: 'img:https://img.icons8.com/color/48/000000/visa.png'},
        {icon: 'img:https://img.icons8.com/office/16/000000/bitcoin.png'},
        {icon: 'img:https://img.icons8.com/color/48/000000/cash-.png'}
      ],
      pago:'',
      payType:null,
      totalNumber:161,
      addPro:false,
      selected: [],
      carrito: [],
      columns: [
        {name: 'name',required: true,label: 'Producto',align: 'left',field: row => row.name,format: val => `${val}`,sortable: true},
        { name: 'description', align: 'center', label: 'Descripcion', field: 'description', width:'100px'},
        { name: 'type', label: 'Tipo', field: 'type'},
        { name: 'stock', label: 'En Alamcen', field: 'stock' },
        { name: 'code', label: 'Clave', field: 'code' },
        { name: 'price', label: 'Precio', field: 'price',format: val => `$${val}` }
      ] 
      ,
      data: [],
      ticket:{},
      print:false,
      cantIva:0,
      order:0
    }
  },
  created(){
    this.changeName('Venta')
    this.$axios.get(
      '/products',
      {headers: {Authorization: `Bearer ${this.token}`}}
    ).then(res=>{
      this.data = res.data.data
    })
  },
  mounted() { //|| this.user.company.logo == null
    if (this.user.company.iva == null) {
      this.$q.dialog({
        title: 'Antes de empezar',
        message: 'Debes agregar tu logo y configurar el iva',
        persistent: true
      }).onOk(() => {
        this.$router.push('/config')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    }else{
      if (this.user.company.iva == 0.16) {
        this.cantIva = 16
      } else {
        this.cantIva = 8
      }
    }
  },
  computed:{
    ...mapState('datos',['user','car','allProducts','token']),
    what(){
      if(Number(date.formatDate(timeStamp,'HH')) >= 12){
        return 'PM'
      }else{
        return 'AM'
      }
    },
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
      return Math.round(this.subtotal*this.user.company.iva*100)/100;
    },
    totalAll(){
      return Math.round((this.subtotal + this.iva)*100)/100;
    }
  },
  methods:{
    ...mapMutations('datos',['changeName','addToCar','removeTocar','setTicket']),
    aceptar(){

      let tick = {}
      tick.productos = this.carrito
      tick.subtotal = this.subtotal
      tick.total = this.totalAll
      tick.iva = this.iva
      this.order = this.aleatorio(1000,10000)
      this.ticket = tick
      this.print = true
       //this.setTicket(tick)
       //this.$router.push('/print')
       
    },
    imprimir(){
    },
    cancelar(){
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
      })
      this.addPro = false
    },
    removeOneProd(pro,i){
      this.$q.dialog({
        title: 'Estas seguro de eliminar un producto',
        message: `Se reducirá la cantidad de el producto en venta`,
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
          pro.size -= 1
          pro.total = pro.price*pro.size
        }
        this.$q.notify('Producto removido')
      })
    },
    addOneProd(pro,i){
      pro.size += 1
      pro.total = pro.price*pro.size
      this.$q.notify('Producto agregado')
    },
     saveSale(){
       this.$q.loading.show()
      let tick = {}
       html2canvas(document.querySelector('.ticket')).then(canvas =>{
        let img = canvas.toDataURL("image/png")
        tick.ticket =  img
        tick.company_id = this.user.company_id
        tick.products = JSON.stringify(this.carrito)
        tick.subtotal = this.subtotal
        tick.total = this.totalAll
        tick.iva = this.iva
        tick.seller = this.username
        tick.order = this.order
        this.$axios.post('/sales',tick,{headers: {Authorization: `Bearer ${this.token}`}})
          .then(res=>{
            console.log(res.data.data);
            this.$q.loading.hide()
            var params = {data: res.data.data.ticket, prefix: 'ticket_', format: 'JPG', quality: 80, mediaScanner: true};
            window.imageSaver.saveBase64Image(params,
               (filePath)=>{
                this.$q.dialog({
                  title: 'Exito',
                  message: 'Puedes encontrar el ticket listo para la impresión en tu galeria de imagenes',
                  persistent: true
                }).onOk(() => {
                  console.log('>>>> OK')
                })
                this.carrito = {}
              },
              (msg)=>{
                console.error(msg);
              }
            );
          })
          .catch(err=>{
            this.$q.notify({
              color:'red',
              message:'ops, intentalo mas tarde'
            })
          })
        
      })
      
      
    },
    aleatorio(a,b) {
      return Math.round(Math.random()*(b-a)+parseInt(a));
    }
  }
}
</script>
<style  lang="stylus">
.q-select__dialog{
  width: 150px !important;
}

.td,
.th,
.tr,
.table {
  border-top: 1px solid black;
  border-collapse: collapse;
}

td.producto,
th.producto {
  width: 75px;
  max-width: 75px;
}

td.cantidad,
th.cantidad {
  width: 50px;
  max-width: 50px;
  word-break: break-all;
}

td.precio,
th.precio {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

.centrado {
  text-align: center;
  align-content: center;
}

.ticket {
  width: 155px;
  max-width: 155px;
}

img {
  max-width: inherit;
  width: inherit;
}
</style>

