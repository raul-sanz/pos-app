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
      <div class="col-4">
         <q-select
        filled
        label="Selecciona tu proveedor"
        v-model="provider"
        :options="providers"
        :option-value="opt => opt"
        :option-label="opt => opt.name"
        :option-disable="opt => opt.inactive"
        emit-value
        map-options
      />
      </div>
      <div class="col-1">
        <q-btn round color="positive" icon="add_circle_outline" style="margin-left: 10px;" @click="newProv = true"></q-btn>
      </div>
      <div class="col-2 offset-2">
        <q-btn label="Cancelar" @click="clearOrder" color="negative"/>
      </div>
      <div class="col-2 offset-1">
        <q-btn color="info" label="Generar" @click="sendOrder" />
      </div>
      
    </div>
    <q-dialog v-model="newProv" persistent>
      <q-card style="min-width: 400px">
        <q-toolbar>
          <q-avatar>
            <img src="https://img.icons8.com/color/48/000000/supplier.png">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Agrega un nuevo</span> proveedor</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <q-input label="Nombre" v-model="prov.name" autofocus />
          <q-input label="Correo" v-model="prov.email"  />
          <q-input label="Telefono" v-model="prov.phone"  />
          <q-input label="Dirección" v-model="prov.address"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancelar" color="negative" v-close-popup />
          <q-btn label="Agregar proveedor" @click="addProv" color="positive" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <table style="display:none;" class="sales">
      <thead>
        <tr>
          <th class="text-right">Producto</th>
          <th class="text-right">Marca</th>
          <th class="text-right">Color</th>
          <th class="text-right">Modelos</th>
          <th class="text-right">Cantidad</th>
          <th class="text-right">Unidad</th>
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
            
          </tr>
      </tbody>
    </table>

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
      provider:'',
      newProv:false,
      providers: [],
      prov:{}
    }
  },
  computed:{
    ...mapState('datos',['user','car','order','token']),
    username(){
      return `${this.user.first_name} ${this.user.last_name}`
    },
  },
  created(){
    this.changeName('Generar Pedido')
    this.$axios.get('/providers',{headers: {Authorization: `Bearer ${this.token}`}})
      .then(res=>{
        this.providers = res.data.data
      })
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
      //this.$q.loading.show()
      console.log(this.provider);
        var doc = new jsPDF();
        let img = this.user.company.logo
         doc.addImage(img,'JPEG', 15, 2, 15,15);
        
         doc.text('Orden de pedido', 78,8);
         doc.setFontSize(10)
         doc.text(`${this.user.company.name}`, 150,13);
         doc.text(`${this.user.company.address}`,150, 18);
         doc.setFontSize(8)
         doc.text(`${this.dateNow}`, 150, 8);
         doc.autoTable({startY:30,html: '.sales'});
        /*doc.line(130,245,200,245)
        doc.text('SUBTOTAL',130,250)
        doc.text(`$ ${this.subtotal}`,170,250)
        doc.text('IVA',130,256) */
        
        doc.text(`Firma de ${this.user.company.name}`,69,289)
        
        doc.text(`Firma de  ${this.provider.name}`,119,289)
        doc.setDrawColor(0, 0, 0);
        doc.line(60,285,100,285)
        doc.line(110,285,150,285)
        doc.save()
        /* var myBase64 = Base64.encode(doc.output())
        
        function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

              var blob = new Blob(byteArrays, {type: contentType});
              return blob;
        }
        let self = this
        function savebase64AsPDF(folderpath,filename,content,contentType){
            
            var DataBlob = b64toBlob(content,contentType);
            console.log("Starting to write the file :3");
            window.resolveLocalFileSystemURL(folderpath,(dir) => {
                console.log("Access to the directory granted succesfully");
            dir.getFile(filename, {create:true}, (file) =>{
                    console.log("File created succesfully.");
                    file.createWriter(function(fileWriter) {
                        console.log("Writing content to file");
                        fileWriter.write(DataBlob);
                        self.$q.loading.hide()
                        window.cordova.plugins.email.open({
                            to:      self.provider.email,
                            subject: `Orden de pedido`,
                            attachments: `file:///storage/emulated/0/${filename}`
                        });
                    }, ()=>{
                        alert('Unable to save file in path '+ folderpath);
                    });
            });
            });
        }
        
        // To define the type of the Blob
        var contentType = "application/pdf";
        // if cordova.file is not available use instead :
        // var folderpath = "file:///storage/emulated/0/";
        var folderpath = cordova.file.externalRootDirectory;
        var filename = `orden_${this.dateNow}.pdf`;
 
        savebase64AsPDF(folderpath,filename,myBase64,contentType);
      */
    },
    addProv(){
      this.$q.loading.show()
      this.prov.company_id = this.user.company_id
      this.$axios.post('/providers',this.prov,{headers: {Authorization: `Bearer ${this.token}`}})
        .then(res => {
          this.$q.loading.hide()
          console.log(res.data.data);
          this.providers.push(res.data.data)
          this.prov = {}
          this.$q.notify({
            color:'positive',
            message:'Proveedor creado con éxito'
          })
        })
        .catch(err=>{
          this.$q.loading.hide()
          this.$q.notify({
            color:'negative',
            message:'Ocurrio un error, intenta mas tarde'
          })
        })
    }
  }
}
</script>

