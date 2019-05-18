<template>
  <q-dialog v-model="showFormAddProduct" @hide="hideModal">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://img.icons8.com/bubbles/50/000000/todo-list.png">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Agrega</span> producto a la orden</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section >
          <q-form
            @submit="CrearProducto"
            @reset="clearForm"
            class="q-gutter-md"
          >

            <q-input 
              v-model="prod.name"  
              placeholder="Nombre"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />
            <q-input 
              v-model="prod.marca"  
              placeholder="Marca"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />

            <q-input 
              v-model="prod.modelo"  
              placeholder="Modelo"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />

            <q-input 
              v-model="prod.color"  
              placeholder="Color"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />


            <q-input
              v-model="prod.size"
              placeholder="Cantidad"
              type="number"
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
            />

            <q-input
              v-model="prod.unity"
              placeholder="Unidad"
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
            />

            <div>
              <q-btn label="Agregar" type="submit" color="primary"/>
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
  name:'AddProduct',
  data(){
    return{
      prod:{}
    }
  },
  computed:{
    ...mapState('datos',['showFormAddProduct'])
  },
  methods:{
    ...mapMutations('datos',['setAddProd','addToOrder']),
    hideModal(){
      this.setAddProd(false)
    },
    CrearProducto(){
      console.log(this.prod);
      this.addToOrder(this.prod)
      this.setAddProd(false)
      this.prod = {}
    },
    clearForm(){
      this.prod = {}
    },
    back(){
       this.setAddProd(false)
    }
  }
}
</script>

