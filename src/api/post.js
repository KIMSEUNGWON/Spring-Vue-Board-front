// 게시물 조작과 관련된 CRUD API 함수 파일
import { post } from './index';

// 게시물 데이터 목록을 조회하는 API
function fetchPosts(boardName) {
  return post.get(`/${boardName}/posts`);
}

// 특정 게시물을 조회하는 API
function fetchPost(boardName, postId) {
  return post.get(`/${boardName}/post/${postId}`);
}

// 게시물 데이터를 생성하는 API
function createPost(boardName, postData) {
  return post.post(`/${boardName}`, postData);
}

// 게시물 데이터를 삭제하는 API
function deletePost(boardName, postId) {
  return post.delete(`/${boardName}/post/${postId}`);
}

// 게시물 데이터를 수정하는 API
function editPost(boardName, postId, postData) {
  return post.put(`/${boardName}/post/${postId}`, postData);
}

export { fetchPosts, fetchPost, createPost, deletePost, editPost };
