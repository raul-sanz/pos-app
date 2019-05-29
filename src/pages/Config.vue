<template>
  <q-page padding>
    <div class="row">
      <div class="col-sm-6">
         <q-uploader
            :factory="factoryFn"
            @uploaded="upload"
            label="Logo de la empresa"
            color="positive"
            auto-upload
            bordered
            style="max-width: 300px"
          />
      </div>
      <div class="col-sm-5 offset-sm-1">
        <p>Selecciona impuesto</p>
        <q-radio checked v-model="iva" color="positive" val="0.08" label="0.08" />
        <q-radio v-model="iva" color="info" val="0.16" label="0.16" />
      </div>
      <div class="col-12 q-mt-md">
        <q-form
          @submit="send"
          class="q-gutter-md"
        >
          <q-input
            :disable="edit"
            filled
            v-model="dat.name"
            label="Nombre de la empresa"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'El campo no debe esta vacio']"
          />

          <q-input
            :disable="edit"
            filled
            v-model="dat.address"
            label="Dirección"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'El campo no debe esta vacio']"
          />

          <q-input
            :disable="edit"
            filled
            v-model="dat.phone"
            label="Telefono"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'El campo no debe esta vacio']"
          />

          <q-input
            :disable="edit"
            filled
            v-model="dat.business_name"
            label="Razón social"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'El campo no debe esta vacio']"
          />
        
          

          <div>
            <q-btn label="Enviar" type="submit" color="primary"/>
          </div>
        </q-form>
      </div>
      
    </div>
    
  </q-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data(){
    return{
      dat:{},
      iva:'',
      edit:true,
      company:{},
      img:''
    }
  },
  computed: {
    ...mapState('datos',['user','token'])
  },
  created() {
    this.$axios.get(`/companies/${this.user.company_id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    ).then(res=>{
      this.dat = res.data.data
    })
  },
  mounted() {
    this.changeName('Ajustes de la empresa')
  },
  methods: {
    ...mapMutations('datos',['setCompany','changeName']),
    send(){
      let obj = {
        iva: this.iva
      }
      this.$axios.post('/iva',
        obj,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      ).then(res=>{
        this.$q.notify({
          message:'IVA asignado',
          color:'positive'
        })

        this.$axios.get(`/companies/${this.user.company_id}`,{
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        ).then(res=>{
          this.setCompany(res.data.data)
        })
      })

     
    },
    factoryFn(){
      return {
        url: 'http://127.0.0.1:3333/logo',
        method: 'POST',
        fieldName:'profile_pic',
        headers:[{name: 'Authorization', value: `Bearer ${this.token}`}]
         
      }
    },
    upload(){
      this.$axios.get(`/companies/${this.user.company_id}`,{
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      ).then(res=>{
        this.setCompany(res.data.data)
      })
    }
  },
}
</script>

