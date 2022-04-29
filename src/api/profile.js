// 회원 정보 조회, 회원 정보 수정, (ex) 회원 탈퇴
import { user } from './index';

// 회원 정보 조회 API
function getUserProfile(userEmail) {
  return user.get(`/${userEmail}`);
}

// 회원 비밀번호 수정 API
function changePassword(userEmail, userData) {
  return user.put(`/${userEmail}`, userData);
}

export { getUserProfile, changePassword };
