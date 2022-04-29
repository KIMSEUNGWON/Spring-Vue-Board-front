// 게시판 조작과 관련된 CRUD API 함수 파일
import { board } from './index';

// 게시판 데이터 목록을 조회하는 API
function fetchBoards() {
  return board.get('/');
}

// 특정 게시판을 조회하는 API
function fetchBoard(boardName) {
  return board.get(boardName);
}

// 게시판 데이터를 생성하는 API
function createBoard(boardName) {
  return board.post('/', boardName);
}

// 게시판 데이터를 삭제하는 API
function deleteBoard(boardId) {
  return board.delete(boardId);
}

// 게시판 데이터를 수정하는 API
function editBoard(boardId, boardData) {
  return board.put(boardId, boardData);
}

export { fetchBoards, fetchBoard, createBoard, deleteBoard, editBoard };
