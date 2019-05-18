<template>
  <q-dialog v-model="alert"  @hide="hideModal">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="highlight_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Estas apunto de eliminar {{who}} {{data.id}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Continuar" color="primary"  @click="$emit('remove',data)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name:'AlertComponent',
  props:{
    data:{
      required: true
    },
    who:{
      required: true
    },

  },
  data(){
    return{

    }
  },
  computed:{
    ...mapState('datos',['alert'])
  },
  methods:{
    ...mapMutations('datos',['setAlert']),
    hideModel(){
      this.setAlert(false)
    }
  }
}
</script>

