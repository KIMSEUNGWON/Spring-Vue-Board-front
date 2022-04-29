// 모든 방 조회, 방 조회, 방 생성
import { chat } from './index';

// 모든 방 조회 API
function getRooms() {
  return chat.get('/rooms');
}

// 단일 방 조회 API
function getRoom(roomId) {
  return chat.get(`/room?${roomId}`);
}

// 방 생성 API
function createRoom(roomName) {
  return chat.post(`/room?name=${roomName}`);
}

export { getRooms, getRoom, createRoom };
