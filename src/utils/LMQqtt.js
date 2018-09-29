import stroage from '@/store/storage'

const LMqtt = {
  client: null,
  cfg: {
    host: 'emqtt.anoah.com',
    port: 8083,
    username: 'youxuepai',
    password: "822scmxQjHW0PuAz",
    client_id: "c_"
  },
  onConnect () {
    if (this.client) {
      return false
    }
    // client_id随机生成
    for (let i = 0; i < 13; i++) {
      let num = Math.floor(Math.random() * 9 + 1);
      this.cfg.client_id += num;
    }
    this.client = new Paho.MQTT.Client(this.cfg.host, this.cfg.port, this.cfg.client_id);
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
  },
  onConnectionLost (response) {
    console.log(response)
    if (response.errorCode !== 0) {
      console.log(response.errorMessage)
      setTimeout(() => {
        this.connect()
      }, 3000);
    }
    console.log('连接断开');
  },
  onMessageArrived (message) {
    console.log(message)
    let channelId = parseInt(JSON.parse(message.payloadString).channelId)
    let mqttId = JSON.parse(message.payloadString).id
    let userIdentity = window.bus.$store.getters['account/userIdentity']
    if (mqttId) {
      console.log(mqttId)
      if (!stroage['persistent'].get('mqtt')) {
        if (channelId === 1 && userIdentity.indexOf(2) >= 0) {
          window.bus.$store.commit('news/setMsg', true)
          window.bus.$store.commit('news/setDepositMsg', true)
          window.bus.$store.commit('news/setMqtt', {newDepositMsg: mqttId})
        } else if (channelId === 2 && userIdentity.indexOf(2) >= 0) {
          window.bus.$store.commit('news/setMsg', true)
          window.bus.$store.commit('news/setGuardianMsg', true)
          window.bus.$store.commit('news/setMqtt', {newGuardianMsg: mqttId})
        } else if (channelId === 3) {
          window.bus.$store.commit('news/setSystemMsg', true)
          window.bus.$store.commit('news/setMqtt', {newSystemMsg: mqttId})
        }
      } else {
        let mqtt = stroage['persistent'].get('mqtt')
        if (mqtt.indexOf(mqttId) < 0) {
          if (channelId === 1 && userIdentity.indexOf(2) >= 0) {
            window.bus.$store.commit('news/setMsg', true)
            window.bus.$store.commit('news/setDepositMsg', true)
            window.bus.$store.commit('news/setMqtt', {newDepositMsg: mqttId})
          } else if (channelId === 2 && userIdentity.indexOf(2) >= 0) {
            window.bus.$store.commit('news/setMsg', true)
            window.bus.$store.commit('news/setGuardianMsg', true)
            window.bus.$store.commit('news/setMqtt', {newGuardianMsg: mqttId})
          } else if (channelId === 3) {
            window.bus.$store.commit('news/setSystemMsg', true)
            window.bus.$store.commit('news/setMqtt', {newSystemMsg: mqttId})
          }
        }
      }
      console.log('收到消息')
    }
  },
  connect(succ) {
    this.onConnect();
    let me = this
    var options = {
      userName: this.cfg.username,
      password: this.cfg.password,
      cleanSession: true,
      keepAliveInterval: 10,
      onSuccess: function(e) {
        console.log('连接成功')
        let envStr = window.bus.$store.getters['runEnv/env']
        let env = envStr === "" ? 'p' : (envStr.substring(0, envStr.length - 1));
        console.log(env)
        let schoolId = window.bus.$store.getters['account/schoolId']
        let userId = window.bus.$store.getters['account/userId']
        let userIdentity = window.bus.$store.getters['account/userIdentity']
        let classId = window.bus.$store.getters['account/classId']
        console.log(schoolId, userId, classId)
        if (userIdentity.indexOf(1) >= 0) {
          me.client.subscribe(`d56_${env}_all`)
          me.client.subscribe(`d56_${env}_manager`)
          me.client.subscribe(`d56_${env}_school_${schoolId}`)
          me.client.subscribe(`d56_${env}_user_${userId}`)
        }
        if (userIdentity.indexOf(2) >= 0) {
          me.client.subscribe(`d56_${env}_all`)
          me.client.subscribe(`d56_${env}_teacher`)
          me.client.subscribe(`d56_${env}_school_${schoolId}`)
          me.client.subscribe(`d56_${env}_school_${schoolId}_teacher`)
          classId.forEach((v, i) => {
            me.client.subscribe(`d56_${env}_class_${v}`)
            me.client.subscribe(`d56_${env}_class_${v}_teacher`)
          })
          me.client.subscribe(`d56_${env}_user_${userId}`)
        }
      },
      onFailure: function(e) {
        console.log('连接失败')
        console.log(e)
        setTimeout(() => {
          this.connect();
        })
      }
    };
    this.client.connect(options);
  }
}
export default LMqtt
