// 댓글 조작과 관련된 CRUD API 함수 파일
import { comment } from './index';

// 댓글 데이터 목록을 조회하는 API
function fetchComment(postId) {
  return comment.get('/', {
    params: {
      postId: postId,
    },
  });
}

// 특정 댓글을 조회하는 API
function fetchSpecificComment(postId) {
  return comment.get(postId);
}

// 댓글 데이터를 생성하는 API
function createComment(postId, commentAddDto) {
  return comment.post(`/?postId=${postId}`, commentAddDto);
}

// 대닷글 데이터를 생성하는 API
function createReply(commentId, commentAddDto) {
  return comment.post(`/reply/?commentId=${commentId}`, commentAddDto);
}

// 댓글 데이터를 수정하는 API
function editComment(commentId, commentEditDto) {
  return comment.put(`/?commentId=${commentId}`, commentEditDto);
}

// 댓글 데이터를 삭제하는 API
function deleteComment(commentId) {
  return comment.delete(`/?commentId=${commentId}`);
}

export {
  fetchComment,
  fetchSpecificComment,
  createComment,
  createReply,
  editComment,
  deleteComment,
};
