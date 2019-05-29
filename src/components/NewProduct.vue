<template>
  <q-dialog v-model="showFormProduct" @hide="hideModal" @show="random">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://img.icons8.com/bubbles/50/000000/product.png">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Crea</span> tu producto</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section >
          <q-form
            @submit="CrearProducto"
            @reset="clearForm"
            class="q-gutter-md"
          >
            <q-input
              
              v-model="prod.code"
              placeholder="Clave"
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
            />

            <q-input 
              autofocus
              v-model="prod.name"  
              placeholder="Nombre"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />
            <q-input 
              v-model="prod.brand"  
              placeholder="Marca"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />

            <q-input 
              v-model="prod.description"  
              placeholder="Descripcion"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />

            <q-input 
              v-model="prod.type"  
              placeholder="Tipo"  
              :rules="[ val => val != '' || 'Campo requierido']"
              dense 
            />

            <q-input 
              v-model="prod.model"  
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
              v-model="prod.price"
              placeholder="Precio"
              type="number"
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
            />

            <q-input
              v-model="prod.stock"
              placeholder="En almacen"
              type="number"
              dense
              :rules="[ val => val != '' || 'Campo requierido']"
            />

            <div class="row">
              <p style="color:#9e9e9e;margin:0px;">Min - Max (De productos en almacen)</p>
              <q-range
                v-model="prod"
                :min="0"
                :max="50"
                :step="1"
                label
                color="secondary"
              />
            </div>
            <div>
              <q-btn label="Crear" type="submit" color="primary"/>
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
  name:'NewProduct',
  data(){
    return{
      prod:{
        min:10,
        max:20
      }
    }
  },
  computed:{
    ...mapState('datos',['showFormProduct','token','user'])
  },
  mounted() {
    this.random()
  },
  methods:{
    ...mapMutations('datos',['setNewProd','setAddProducts']),
    hideModal(){
      this.setNewProd(false)
    },
    CrearProducto(){
      this.prod.company_id = this.user.company_id
      console.log(this.prod);
      this.$axios.post(
        '/products',
        this.prod,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res=>{
          console.log(res.data.data);
          //this.data.push(res.data.data)
          this.prod = {
              min:10,
              max:20
            }
          this.setAddProducts(res.data.data)
          this.setNewProd(false)
        })
        .catch(err=>{
          console.log(err);
        })
    },
    clearForm(){
      this.prod = {}
    },
    back(){
       this.setNewProd(false)
    },
    random(){
      
      let num = this.aleatorio(1000,20000)
      console.log(num);
      this.prod.code = num
    },
    aleatorio(a,b) {
      return Math.round(Math.random()*(b-a)+parseInt(a));
    }
  }
}
</script>

