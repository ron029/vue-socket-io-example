<template>
  <div>
    <div v-if="user_info.role === 'admin'">
      <h3>Dashboard</h3>
      <v-list two-line>
        <template v-for="(item, index) in oppa_list">
          <!-- <v-list-tile v-if="$socket.id !== item" :key="item" avatar @click="clickedOnClient(item)">
            <v-list-tile-avatar>
              [dp]
              <img src="http://placekitten.com/50/50">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> -->
          <!-- <v-list-title> -->
            <p>{{ item }}</p>
          <!-- </v-list-title> -->
        </template>
      </v-list>
    </div>
    <div v-else>
      <h3>Create new oppa</h3>
      <form v-on:submit.prevent="addOppa">
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-small">OPPAN:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="oppan.oppa" id="input-small" size="sm" placeholder="OPPA Number"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-small">STATUS:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="oppan.status" id="input-small" size="sm" placeholder="Status"></b-form-input>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary">Submit</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      oppan: {
        oppa: null,
        status: null,
      },
      oppan_list: [],
      userInfo: this.user_info,
    }
  },
  computed: {
    ...mapGetters([
      'clientList',
    ]),
  },
  watch: {
    oppa_list: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(val, oldVal) {
        this.oppan_list = val
      },
    },
    user_info: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(val, oldVal) {
        this.oppan_list = val
      },
    },
    // user_info: function(newVal, oldVal) {
    //   console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    // },
  },
  props: {
    user_info: Object,
    oppa_list: Array,
  },
  methods: {
    ...mapActions([
      // 'getConnectedClients',
    ]),
    clickedOnClient(id) {
      // this.$socket.emit('nudge-client', {
      //   from: this.$socket.id,
      //   to: id,
      // })
    },
    addOppa() {
      this.$socket.emit('new_oppa', this.oppan)
      console.log(this.oppan)
    },
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
  },
  mounted() {
    // this.sockets.subscribe('OPPA_LIST', (data) => {
    //   console.log('data: ', data)
    // })
    // this.$socket.$subscribe('oppa_list', payload => {
    //   console.log(payload)
    // })
    // this.$socket.on('oppa_list', data => {
    //   this.oppan_list = data
    // })
    // this.$socket.on('user-connected', this.getConnectedClients)
    // this.$socket.on('user-disconnected', this.getConnectedClients)

    // this.getConnectedClients()
  },
}
</script>
