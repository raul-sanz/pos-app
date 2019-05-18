<template>
  <q-page padding>
    <div class="row">
      <div class="col-4">
        <q-input label="Usuario" bottom-slots v-model="username" readonly>
        <template v-slot:before>
          <q-avatar>
            <img src="https://img.icons8.com/bubbles/50/000000/administrator-male.png">
          </q-avatar>
        </template>
      </q-input>
      </div>
      <div class="col-4 offset-4">
        <q-input filled v-model="dateNow" readonly >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>   
      </div>
    </div>
    <div class="row q-mt-sm" style="background-color:rgba(189, 189, 189,0.2);">
      <div class="row q-ml-md q-mt-sm" style="height: 45px;">
          <div class="col-4">
            <q-input label="Del" filled dense v-model="dateStart" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="dateStart" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-4 offset-1">
            <q-input label="Al" filled dense v-model="dateEnd" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="dateEnd" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-1 offset-2">
              <q-btn class="float-left" color="info" label="Consultar" @click="filtrar"/>  
          </div>
        </div>
    </div>
    <div class="q-pa-md">
          <q-markup-table separator="cell" flat bordered>
      <thead>
        <tr>
          <th class="text-left">No.</th>
          <th class="text-right">Clave</th>
          <th class="text-right">Producto</th>
          <th class="text-right">Descripcion</th>
          <th class="text-right">Cantidad</th>
          <th class="text-right">Precio unitario</th>
          <th class="text-right">Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in car" :key="product.clave">
          <td class="text-left">{{product.id}}</td>
          <td class="text-right">{{product.clave}}</td>
          <td class="text-right">{{product.name}}</td>
          <td class="text-right">{{product.description}}</td>
          <td class="text-right">{{product.cantidad}}</td>
          <td class="text-right">${{product.price}}</td>
          <td class="text-right">${{product.total}}</td>
        </tr>
        
       
      </tbody>
    </q-markup-table>
    </div>
    <div class="row q-mt-lg">
      <div class="col-7 row">
        <div class="col-4">
          <q-btn color="primary" label="Enviar" @click="enviar"/>
        </div>
        <div class="col-4">
          <q-btn color="secondary" label="Imprimir" @click="imprimir"/>
        </div>
        <div class="col-4">
          <q-btn color="red" label="Cancelar" @click="cancelar"/>
        </div>
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
  </q-page>
</template>

<style>
</style>

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
      options:['Targeta de Credito','Efectivo','Credito','Paypal','Bitcoins'],
      pago:'',
      payType:null,
      totalNumber:161,
      dateStart: '2019/05/01',
      dateEnd: date.formatDate(timeStamp, 'YYYY/MM/DD')
    }
  },
  created(){
    this.changeName('Generar corte')
  },
  computed:{
    ...mapState('datos',['user','car']),
    username(){
      return `${this.user.first_name} ${this.user.last_name}`
    },
    totalString(){
      return this.NumeroALetras(this.totalAll,"PESOS")
    },
    subtotal(){
      let toal = 0
      this.car.map(el=>{
        toal += el.total
      })
      return toal
    },
    iva(){
      return this.subtotal*0.16
    },
    totalAll(){
      return this.subtotal + this.iva
    }

  },methods:{
    ...mapMutations('datos',['changeName']),
    enviar(){
      console.log('aceptar');
    },
    imprimir(){
      console.log('imprimir');
    },
    cancelar(){
      console.log('cancelar');
    },
    filtrar(){
      console.log('filtrado');
    }
  }
}
</script>
