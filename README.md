# Vue.js 애플리케이션

인프런 Vue.js Endgame 강의에서 다루는 애플리케이션 소스 코드를 활용했습니다.

## 개발 환경
+ WebStorm
+ GitHub

## 기술 스택
- Vue.js
- Vue Router
- Vuex
- Axios
- Vue Test Utils
- Vuetify
- Toast ui editor
- Stomp

## 핵심 키워드
+ Vue와 Axios를 이용해 서버와 통신
+ Vuex와 Props를 이용한 데이터 관리
+ Vuetify를 활용한 디자인 구성

## 핵심 기능
### 로그인
로그인을 하기 위해서 사용자 이메일과 비밀번호를 서버에 전달하고 서버로부터 유효한 토큰을 받습니다 이 과정에서 웹 브라우저의 쿠키를 사용해서 토큰값을 저장합니다 이 토큰값을 활용해서 HTTP 통신을 할 때 인증 정보를 추가합니다

### 게시글 작성
인증된 사용자는 게시글을 작성할 수 있습니다.
게시글은 Toast ui editor를 활용해서 Markdown 형식으로 작성하게 됩니다.
기존에 작성한 게시글을 불러올 때는 Toast ui viewer를 사용해서 Markdown 형식을 유지하게 됩니다

### 댓글 기능
댓글은 기본적인 HTML Form을 사용해서 서버와 통신하게 됩니다

### 채팅 기능
Stomp를 활용해서 연결된 서버와 지속적인 통신을 하게 됩니다.

## License & Copyright

**Copyright © 2019 Captain Pangyo**
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivs 4.0 Unported License</a>.
