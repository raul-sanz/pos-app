<template>
  <q-page padding>
    <div class="row">
      <div class="col-2">
        <q-input label="Usuario" bottom-slots v-model="username" readonly>
        <template v-slot:before>
          <q-avatar>
            <img :src="user.company.logo != null ? user.company.logo : 'https://img.icons8.com/bubbles/50/000000/administrator-male.png'">
          </q-avatar>
        </template>
      </q-input>
      </div>
      <div class="col-4 offset-1">
        <div class="datepicker-trigger">
          <q-input
            label="Seleccione fechas a filtrar"
            id="datepicker"
            :value="formatDates(dateOne, dateTwo)"
          />

          <AirbnbStyleDatepicker
            :trigger-element-id="'datepicker'"
            :mode="'range'"
            :fullscreen-mobile="false"
            :date-one="dateOne"
            :date-two="dateTwo"
            @date-one-selected="val => { dateOne = val }"
            @date-two-selected="val => { dateTwo = val }"
          />
        </div>
      </div>
      <div class="col-1">
        <q-btn size="15px"
          style="margin-top: 15px;margin-left: 5px;"
          color="white"
          round
          icon="img:https://img.icons8.com/color/80/000000/search.png" 
          @click="getReport" />
      </div>
      <div class="col-3 offset-1">
        <q-input filled v-model="dateNow" readonly >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>   
      </div>
    </div>
    <!--<div class="row q-mt-sm" style="background-color:rgba(189, 189, 189,0.2);">
      <div class="row q-ml-md q-mt-sm" style="height: 45px;">
           <div class="col-8">
            
            <q-input label="Del" filled dense v-model="dateStart" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="dateStart" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input> 
          </div>-->
          <!-- <div class="col-4 offset-1">
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
          <div class="col-2 offset-11">
              <q-btn  color="info" label="Consultar" @click="filtrar"/>  
          </div>
        </div>
    </div>-->
    <!-- <div class="row">
      <div class="col-2 offset-10">
        <q-btn size="20px"
          
          color="cyan-1"
          icon="img:https://img.icons8.com/color/80/000000/search.png" 
          @click="getReport" />
      </div>
    </div> -->
    <div class="q-pa-md">
          <q-markup-table separator="cell" flat bordered >
      <thead>
        <tr>
          <th class="text-right">Fecha</th>
          <th class="text-right">N.Orden</th>
          <th class="text-right">Vendedor</th>
          <th class="text-right">Subtotal</th>
          <th class="text-right">IVA</th>
          <th class="text-right">Total</th>
          <th class="text-right">Productos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id">
          <td class="text-left">{{fecha.formatDate(sale.created_at, 'DD-MM-YYYY')}}</td>
          <td class="text-right">{{sale.order}}</td>
          <td class="text-right">{{sale.seller}}</td>
          <td class="text-right">${{sale.subtotal}}</td>
          <td class="text-right">${{sale.iva}}</td>
          <td class="text-right">${{sale.total}}</td>
          <td class="text-right"><q-btn clean flat label="Ver" color="primary" @click="showProductModal(sale.products)" /></td>
        </tr>
      </tbody>
    </q-markup-table>
    </div>
    <div class="row q-mt-lg">
      <div class="col-7 row">
        <div class="col-4">
          <q-btn color="primary" label="Enviar" @click="showFromMail = true"/>
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
    <q-dialog v-model="showProductSale">
      <q-card>
        <q-card-section>
          <div class="text-h6">Productos de la order </div>
        </q-card-section>

        <q-card-section>
          <q-markup-table separator="cell" flat bordered >
            <thead>
              <tr>
                <th class="text-right">Nº</th>
                <th class="text-right">Producto</th>
                <th class="text-right">Piezas</th>
                <th class="text-right">Precio unitario</th>
                <th class="text-right">total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product,index) in productos" :key="index" >
                <td class="text-right">{{index + 1}}</td>
                <td class="text-left">{{product.name}}</td>
                <td class="text-right">{{product.size}}</td>
                <td class="text-right">${{product.price}}</td>
                <td class="text-right">${{product.total}}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <table style="display:none;" class="sales">
      <thead>
        <tr>
          <th class="text-right">Fecha</th>
          <th class="text-right">N.Orden</th>
          <th class="text-right">Vendedor</th>
          <th class="text-right">Subtotal</th>
          <th class="text-right">IVA</th>
          <th class="text-right">Total</th>
          <!-- <th class="text-right">Productos</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id">
          <td class="text-left">{{fecha.formatDate(sale.created_at, 'DD-MM-YYYY')}}</td>
          <td class="text-right">{{sale.order}}</td>
          <td class="text-right">{{sale.seller}}</td>
          <td class="text-right">${{sale.subtotal}}</td>
          <td class="text-right">${{sale.iva}}</td>
          <td class="text-right">${{sale.total}}</td>
          <!-- <td>
           <ol v-for="prod in sale.products" :key="prod.id">
             <li >{{prod.size}} {{prod.name}}</li>
           </ol>
          </td> -->
        </tr>
      </tbody>
    </table>
    <q-dialog v-model="showFromMail" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Datos de contactos a enviar</div>
        </q-card-section>

        <q-card-section>
          <q-input label="Para" dense type="mail" v-model="to" autofocus />
          <q-input label="CC" dense type="mail" v-model="cc"  />
          <q-input label="BCC" dense type="mail" v-model="bcc"  />
        </q-card-section>

        <q-card-actions align="right"  class="text-primary">
          <q-btn flat label="Enviar" color="positive"  v-close-popup @click="enviar"/>
          <q-btn flat label="Cancelar" color="negative"  v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>


<script>
import { Base64 } from "js-base64";
import format from 'date-fns/format'
import toString from '../mixins/toString'
import { date } from 'quasar'
import { mapState, mapMutations } from "vuex";
let timeStamp = Date.now()
const { addToDate } = date

export default {
  mixins:[toString],
  name: 'PageIndex',
  data(){
    return {
      dateNow: date.formatDate(timeStamp, 'YYYY-MM-DD'),
      options:['Targeta de Credito','Efectivo','Credito','Paypal','Bitcoins'],
      pago:'',
      payType:null,
      products:[],
      totalNumber:161,
      dateStart: '2019/05/01',
      dateEnd: date.formatDate(timeStamp, 'YYYY/MM/DD'),
      dateFormat: 'D MMM YY',
      dateOne: '',
      dateTwo: '',
      sales:[],
      fecha: date,
      showProductSale:false,
      productos:[],
      showFromMail:false,
      to:'',
      cc:'',
      bcc:[]
    }
  },
  created(){
    this.changeName('Generar corte')
  },
  computed:{
    ...mapState('datos',['user','car','token']),
    username(){
      return `${this.user.first_name} ${this.user.last_name}`
    },
    totalString(){
      return this.NumeroALetras(this.totalAll,"PESOS")
    },
    subtotal(){
      let total = 0
      if (this.sales.length > 0) {
        this.sales.map(el=>{
        total += Number(el.subtotal)
        console.log(el);
      })
      }
      return total
    },
    iva(){
      let total = 0
      if (this.sales.length > 0) {
        this.sales.map(el=>{
        total += Number(el.iva)
      })
      }
      return total
    },
    totalAll(){
      let total = 0
      if (this.sales.length > 0) {
        this.sales.map(el=>{
        total += Number(el.total)
      })
      }
      return total
    }

  },methods:{
    ...mapMutations('datos',['changeName']),
    mailSend(){

    },
    enviar(){
      //this.$q.loading.show()
        var doc = new jsPDF();
        doc.addImage(this.user.company.logo,'JPEG', 15, 2, 15,15);
        doc.setFontSize(12)
        doc.text(`Reporte del ${this.dateOne} al ${this.dateTwo}`, 68,8);
        doc.setFontSize(10)
        doc.text(`${this.user.company.name}`, 150,13);
        doc.text(`${this.user.company.address}`,150, 18);
        doc.setFontSize(8)
        doc.text(`${this.dateNow}`, 150, 8);
        doc.autoTable({startY:30,html: '.sales'});
        
        doc.line(130,275,200,275)
        doc.text('SUBTOTAL',130,280)
        doc.text(`$ ${this.subtotal}`,170,280)
        doc.text('IVA',130,286)
        doc.text(`$ ${this.iva}`,170,286)
        doc.text('TOTAL',130,292)
        doc.text(`$ ${this.totalAll}`,170,292)
        doc.line(130,294,200,294)
       
        //doc.save()
        var myBase64 = Base64.encode(doc.output())
        
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
                            to:      self.to,
                            cc:      self.cc,
                            bcc:      self.bcc,
                            subject: `Reporte generado del ${self.dateOne} al ${self.dateTwo}`,
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
        var filename = `reporte_${this.dateOne}_${this.dateTwo}.pdf`;

        savebase64AsPDF(folderpath,filename,myBase64,contentType);
     
    },
    imprimir(){
      //this.$q.loading.show()
        var doc = new jsPDF();
        doc.addImage(this.user.company.logo,'JPEG', 15, 2, 15,15);
        doc.setFontSize(12)
        doc.text(`Reporte del ${this.dateOne} al ${this.dateTwo}`, 68,8);
        doc.setFontSize(10)
        doc.text(`${this.user.company.name}`, 150,13);
        doc.text(`${this.user.company.address}`,150, 18);
        doc.setFontSize(8)
        doc.text(`${this.dateNow}`, 150, 8);
        doc.autoTable({startY:30,html: '.sales'});
        
        doc.line(130,275,200,275)
        doc.text('SUBTOTAL',130,280)
        doc.text(`$ ${this.subtotal}`,170,280)
        doc.text('IVA',130,286)
        doc.text(`$ ${this.iva}`,170,286)
        doc.text('TOTAL',130,292)
        doc.text(`$ ${this.totalAll}`,170,292)
        doc.line(130,294,200,294)
        //doc.save()
        /*doc.line(130,245,200,245)
        doc.text('SUBTOTAL',130,250)
        doc.text(`$ ${this.subtotal}`,170,250)
        doc.text('IVA',130,256)
        doc.text(`$ ${this.iva}`,170,256)
        doc.text('TOTAL',130,262)
        doc.text(`$ ${this.totalAll}`,170,262)
        doc.line(130,264,200,264) */
        var myBase64 = Base64.encode(doc.output())
        
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
                        self.$q.dialog({
                          title:'Éxito',
                          message:'Encontrara el reporte en sus documentos, listo para la impresión '
                        })
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
        var filename = `reporte_${this.dateOne}_${this.dateTwo}.pdf`;

        savebase64AsPDF(folderpath,filename,myBase64,contentType);
    },
    cancelar(){
      console.log('cancelar');
    },
    filtrar(){
      console.log(`${this.dateOne}-${this.dateTwo}`);
    },
    formatDates(dateOne, dateTwo) {
      let formattedDates = ''
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat)
      }
      if (dateTwo) {
        formattedDates += ' - ' + format(dateTwo, this.dateFormat)
      }
      return formattedDates
    },
    getReport(){
      this.$q.loading.show()
      console.log(this.dateOne);
      console.log(this.dateTwo);
      let d = new Date(this.dateTwo)
      console.log(date.addToDate(d, { days: 1}));
      this.$axios.get(`/range/${this.dateOne}/${this.dateTwo}`,{headers: {Authorization: `Bearer ${this.token}`}})
        .then(res=>{
          this.sales = res.data.data
          this.$q.loading.hide()

        })
    },
    showProductModal(json){
      console.log(json);
      this.showProductSale = true
      this.productos = json
    }
  
  }
}
</script>
