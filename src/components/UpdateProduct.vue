<template>
  <q-dialog v-model="updateFormProduct" @hide="hideModal" @show="getProd">
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
            @submit="UpdateProducto"
            @reset="clearForm"
            class="q-gutter-md"
          >
            <q-input
              v-model="product.code"
              placeholder="Clave"
              dense
              :rules="[ val => val != '' || 'Campo requerido']"
            />

            <q-input 
              v-model="product.name"  
              placeholder="Nombre"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />
            <q-input 
              v-model="product.brand"  
              placeholder="Marca"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />

            <q-input 
              v-model="product.description"  
              placeholder="Descripcion"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />

            <q-input 
              v-model="product.type"  
              placeholder="Tipo"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />

            <q-input 
              v-model="product.model"  
              placeholder="Modelo"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />

            <q-input 
              v-model="product.color"  
              placeholder="Color"  
              :rules="[ val => val != '' || 'Campo requerido']"
              dense 
            />


            <q-input
              v-model="product.price"
              placeholder="Precio"
              type="number"
              dense
              :rules="[ val => val != '' || 'Campo requerido']"
            />

            <q-input
              v-model="product.stock"
              placeholder="En almacen"
              type="number"
              dense
              :rules="[ val => val != '' || 'Campo requerido']"
            />

            <div class="row">
              <p style="color:#9e9e9e;margin:0px;">Min - Max (De productos en almacen)</p>
              <q-range
                v-model="size"
                :min="0"
                :max="50"
                :step="1"
                label
                color="secondary"
              />
            </div>
            <div>
              <q-btn label="Crear" type="submit" color="primary"/>
               <!-- <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" /> -->
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
  name:'UpdateProduct',
  props:{
    prod:{
      requiered:true
    },
    ind:{
      required:true
    }
  },
  data(){
    return{
      product:{
      },
      size:{
        min:10,
        max:20
      }
    }
  },
  computed:{
    ...mapState('datos',['updateFormProduct','token','user']),


  },
  mounted(){
    console.log('hola');
  },
  methods:{
    ...mapMutations('datos',['setUpdateProd','setRemoveProduct','setAddProducts']),
    hideModal(){
      this.setUpdateProd(false)
    },
    UpdateProducto(){
      this.product.min = this.size.min
      this.product.max = this.size.max
      console.log(this.product);
      this.$axios.put(`/products/${this.prod}`,
        this.product,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res=>{
          this.$q.notify({
            color:'positive',
            message:'Producto actualizado'
          })
          console.log(res.data.data);
          this.setRemoveProduct(this.ind)
          this.setAddProducts(res.data.data)
          this.setUpdateProd(false)
        })
        .catch(err=>{
           this.$q.notify({
             color:'negative',
             message:'PIIntenta mas tarde'
           })
          console.log(err);
        })
    },
    clearForm(){
      this.prod = {}
    },
    back(){
       this.setUpdateProd(false)
    },
    getProd(){
      this.$axios.get(`/products/${this.prod}`,{
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }).then(res=>{
          console.log(res.data.data);
          this.product = res.data.data
          this.size.min = res.data.data.min_stock
          this.size.max = res.data.data.max_stock
        })
    }
  }
}
</script>

