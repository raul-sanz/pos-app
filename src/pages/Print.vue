<template>
  <div class="ticket">
    <img src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Logotipo">
    <p class="centrado">TICKET DE COMPRA
      <br>5 de mayo #1006
      <br>23/08/2017 08:22 a.m.</p>
    <table>
      <thead>
        <tr>
          <th class="cantidad">CANT</th>
          <th class="producto">PRODUCTO</th>
          <th class="precio">$$</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in ticket.productos" :key="product.id">
          <td class="cantidad">{{product.size}}</td>
          <td class="producto">{{product.name}}</td>
          <td class="precio">${{product.total}}</td>
        </tr>
        <tr style="background-color: #e0e0e0;">
          <td class="cantidad"></td>
          <td class="producto">Subtotal</td>
          <td class="precio">${{ticket.subtotal}}</td>
        </tr>
        <tr style="background-color: #e0e0e0;">
          <td class=""></td>
          <td class="">IVA</td>
          <td class="">${{ticket.iva}}</td>
        </tr>
        <tr style="background-color: #e0e0e0;">
          <td class=""></td>
          <td class="">TOTAL</td>
          <td class="">${{ticket.total}}</td>
        </tr>
      </tbody>
    </table>
    <p class="centrado">¡GRACIAS POR SU COMPRA!</p>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data(){
    return{

    }

  },
  computed:{
    ...mapState('datos',['ticket'])
  },
  mounted(){
    this.$q.loading.show({
      message:'Generando ticket'
    })
    setTimeout(() => {
        this.$q.loading.hide()
       window.print()
    }, 2000);
   
    setTimeout(() => {
      this.$router.push('/home')
    }, 3000);
  }
}
</script>

<style scoped>

td,
th,
tr,
table {
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


