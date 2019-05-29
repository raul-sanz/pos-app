<template>
  <div class="ticket">
    <img :src="user.company.logo" alt="">
    <p class="centrado">TICKET DE COMPRA
      <br>{{user.company.address}}
      <br>{{dateNow}} {{what}}</p>
    <table class="table">
      <thead>
        <tr class="tr">
          <th class="cantidad th">CANT</th>
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
</template>

<script>
import { Base64 } from "js-base64";
import { date } from 'quasar'
import { mapMutations, mapState } from "vuex";
let timeStamp = Date.now()
export default {
  data(){
    return{
      dateNow: date.formatDate(timeStamp, 'YYYY-MM-DD hh:mm:ss'),
      image:''
    }

  },
  computed:{
    ...mapState('datos',['ticket','user']),
    what(){
      if(Number(date.formatDate(timeStamp,'hh')) >= 12){
        return 'PM'
      }else{
        return 'AM'
      }
    }
  },
  mounted(){
    console.log(Number(date.formatDate(timeStamp,'hh')));
    /* this.$q.loading.show({
      message:'Generando ticket'
    })
    
    this.$q.loading.hide() */
       //window.print()


      html2canvas(document.querySelector('.ticket')).then(canvas =>{
       
      let img =canvas.toDataURL("image/png");
      //var doc = new jsPDF();
      //doc.addImage(img,'JPEG',0,0);
      //doc.output('dataurlnewwindow');
      /* var url = 'data:application/pdf;base64,' + Base64.encode(doc.output())
      
      console.log(url); */
      /* let nav = window.cordova.InAppBrowser.open(img, '_system', 'location=yes')

      nav.show() */
      //window.open(img, '_blank')
      //doc.save('tiket.pdf');
      var element = document.createElement('a');
      element.setAttribute('href', img);
      element.setAttribute('download', 'ticket.png');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
      this.$router.push('/home')
      }) 
    
   
    /* setTimeout(() => {
      
    }, 3000); */
  }
}
</script>

<style scoped>

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


