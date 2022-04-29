// 모든 방 조회, 방 조회, 방 생성
import { notifications } from './index';

// 모든 알림 조회 API
function getNotifications() {
  return notifications.get('/');
}

// 읽지 않은 모든 알림 조회 API
function getUnReadNotifications() {
  return notifications.get('/unread');
}

// 단일 알림 읽음 API
function readNotifications(notificationId) {
  return notifications.post(`/${notificationId}/`);
}

// 모든 알림 읽음 API
function readAllNotifications(notificationIdsDto) {
  return notifications.post(`/readAll`, notificationIdsDto);
}

// 알림 생성 API
function createNotifications(targetUserId, commentId, notificationCreateDto) {
  return notifications.post(
    `/targetUserId=${targetUserId}&commentId=${commentId}`,
    notificationCreateDto,
  );
}

export {
  getNotifications,
  getUnReadNotifications,
  readNotifications,
  readAllNotifications,
  createNotifications,
};
