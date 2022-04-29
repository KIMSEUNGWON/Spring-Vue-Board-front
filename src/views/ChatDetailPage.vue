<!--참고 사이트-->
<!--template 관련-->
<!--https://codepen.io/vishnuweb23/pen/MWeJYNB-->
<!--https://codepen.io/aaha/pen/abdmazo?editors=1010-->
<!--https://hing9u.tistory.com/91-->
<!--websocket 관련-->
<!--https://tjdans.tistory.com/25-->
<!--https://niceman.tistory.com/186-->
<!--https://dev-gorany.tistory.com/235?category=901854-->
<!--https://github.com/woowacourse-teams/2021-drop-the-code/blob/main/backend/src/main/java/com/wootech/dropthecode/repository/EmitterRepository.java-->
<template>
  <!--  https://programmer-ririhan.tistory.com/327?category=906131-->
  <div class="main list-container contents">
    <h1 class="page-header">{{ roomName }} 채팅방</h1>
    <v-alert dense type="info" color="teal lighten-3">
      두 개 이상의 브라우저를 띄워 간단한 채팅을 확인해 볼 수 있다
    </v-alert>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-else class="ma-7">
      <div>
        <span>연결 상태: </span>
        <template v-if="status === 'connected'">
          <span class="orange--text">{{ status }}</span>
          <v-btn @click="disconnect">
            연결끊기
          </v-btn>
        </template>
        <template v-else>
          <span class="blue--text">{{ status }}</span>
          <v-btn @click="connect" v-if="status === 'disconnected'">
            연결
          </v-btn>
        </template>

        <v-card class="overflow-hidden">
          <v-app-bar color="teal lighten-3" dark>
            <v-app-bar-nav-icon>
              <v-icon @click="goChatRoom">
                mdi-arrow-left
              </v-icon>
            </v-app-bar-nav-icon>
            <!--          https://stackoverflow.com/questions/56905360/center-v-toolbar-title-->
            <v-toolbar-title class="white--text flex text-center">
              {{ roomName }} 채팅방
            </v-toolbar-title>
          </v-app-bar>
          <v-sheet class="overflow-y-auto" max-height="500">
            <v-container>
              <v-row class="space-around d-flex flex-column">
                <v-card
                  v-for="(message, index) in receivedList"
                  :key="index"
                  tile
                  flat
                  color="grey"
                >
                  <v-list-item
                    :key="message.time"
                    v-if="message.writer != writer"
                  >
                    <v-list-item-avatar class="align-self-start mr-2">
                      <v-avatar size="40">
                        <v-img src="https://via.placeholder.com/50"></v-img>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content class="received-message">
                      <span class="text-caption">
                        {{ message.writer }}
                      </span>
                      <v-card color="success" class="flex-none">
                        <v-card-text
                          class="white--text pa-2 d-flex flex-column"
                        >
                          <span class="align-self-start text-subtitle-1">
                            {{ message.message }}
                          </span>
                          <span class="text-caption font-italic align-self-end">
                            {{ message.time }}
                          </span>
                        </v-card-text>
                      </v-card>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-else :key="index" id="pHidden">
                    <v-list-item-content class="sent-message justify-end">
                      <v-card color="primary" class="flex-none" flat>
                        <v-card-text
                          class="white--text pa-2 d-flex flex-column"
                        >
                          <span class="text-subtitle-1 chat-message">
                            {{ message.message }}
                          </span>
                          <span
                            class="text-caption font-italic align-self-start"
                          >
                            {{ message.time }}
                          </span>
                        </v-card-text>
                      </v-card>
                    </v-list-item-content>
                    <v-list-item-avatar class="align-self-start ml-2">
                      <v-img src="https://via.placeholder.com/50"></v-img>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-card>
              </v-row>
            </v-container>
          </v-sheet>
          <v-footer>
            <v-container class="ma-0 pa-0">
              <v-row no-gutters>
                <v-col>
                  <div class="d-flex flex-row align-center">
                    <v-text-field
                      v-model="message"
                      placeholder="Type Something"
                      @keypress.enter="sendMessage"
                    ></v-text-field>
                    <v-btn icon class="ml-4" @click="sendMessage"
                      ><v-icon>mdi-send</v-icon></v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-footer>
        </v-card>
      </div>
    </div>
    <v-dialog v-model="isUserNotValid" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5 red--text">
          ErrorCode: {{ logCode }}
        </v-card-title>
        <v-card-text>
          {{ logMessage }}
          다시 로그인 하세요.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="goToLogin">
            Go to Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { fetchBoards } from '@/api/board';
import { deleteCookie } from '@/utils/cookies';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';

export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      isUserNotValid: false,
      logCode: Number,
      logMessage: '',
      writer: this.$store.state.username,
      message: '',
      status: 'disconnected',
      roomName: this.$route.query.roomName,
      roomId: this.$route.query.roomId,
      receivedList: [],
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const { data } = await fetchBoards();
        console.log(data);
        this.isLoading = false;
        this.postItems = data.data;
      } catch (error) {
        this.isUserNotValid = true;
        console.log(error.response.data.code);
        this.logCode = error.response.data.code;
        this.logMessage = error.response.data.msg;
      }
    },
    goToLogin() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      deleteCookie('til_auth');
      deleteCookie('til_user');
      this.$router.push('/login');
    },

    connect() {
      const serverURL = 'http://localhost:8080/stomp/chat';
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        frame => {
          this.status = 'connected';
          console.log('소켓 연결 성공', frame);
          this.stompClient.subscribe(`/sub/chat/room/${this.roomId}`, chat => {
            // console.log('chat = ' + chat);
            let content = JSON.parse(chat.body);
            // console.log('구독으로 받은 content = ', content);
            // this.receiveList.push(chat.body);
            this.receivedList.push(content);
            document.getElementById('pHidden').scrollIntoView(false);
          });
          this.stompClient.send(
            '/pub/chat/enter',
            JSON.stringify({
              roomId: this.roomId,
              writer: this.writer,
            }),
            {},
          );
        },
        error => {
          console.log('소켓 연결 실패', error);
          this.status = 'disconnected';
        },
      );
    },

    sendMessage() {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send(
          '/pub/chat/message',
          JSON.stringify({
            roomId: this.roomId,
            message: this.message,
            writer: this.writer,
          }),
          {},
        );
        this.message = '';
        // document.getElementById('pHidden').scrollIntoView(true);
      }
    },

    disconnect() {
      this.stompClient.disconnect();
      this.status = 'disconnected';
    },

    goChatRoom() {
      this.$router.push('/chat');
    },
  },
  created() {
    this.connect();
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        let messages = this.$refs.messages;
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
      });
    },
  },
};
</script>

<style scoped>
/*https://stackoverflow.com/questions/53217709/how-to-set-up-toolbar-to-be-fixed-in-vuetify*/
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 6em;
  z-index: 2;
}

.chat-message {
  display: unset !important;
  white-space: break-spaces;
}
.flex-none {
  flex: unset;
}
.received-message::after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 54px;
  right: auto;
  top: 34px;
  bottom: auto;
  border: 12px solid;
  border-color: #4caf50 transparent transparent transparent;
}
.sent-message::after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 54px;
  top: 12px;
  bottom: auto;
  border: 12px solid;
  border-color: #1976d2 transparent transparent transparent;
}
</style>
