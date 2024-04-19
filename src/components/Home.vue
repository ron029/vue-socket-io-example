<template>
  <div>
    <v-card v-if="!logged_in">
      <v-card-title><h1>Hi there!</h1></v-card-title>
      <input v-model="data.role" placeholder="Role">
      <input v-model="data.username" placeholder="Username">
      <input v-model="data.user_id" placeholder="User ID">
      <button @click="userLogged">Submit</button>
      <v-divider />
    </v-card>
    <v-card-text v-else>
      <SocketList :user_info="userInfoData" :oppa_list="oppaList"/>
    </v-card-text>
  </div>
</template>

<script>
import SocketList from '@/components/SocketList'

export default {
  data() {
    return {
      data: {
        role: null,
        username: null,
        user_id: null,
      },
      oppaList: [],
      logged_in: false,
      log_status: false,
      userInfoData: null,
    }
  },
  components: {
    SocketList,
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    oppa_list(data) {
      this.oppaList = data
      console.log('data: ', data)
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
  },
  methods: {
    userLogged() {
      this.userInfoData = this.data
      this.logged_in = true
      this.$socket.emit('user-connected', this.data)
    },
  },
}
</script>
  