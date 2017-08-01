# [React.JS](https://velopert.com/reactjs-tutorials)
> 개인적인 노트필기입니다. 자세한내용은 위의 강좌를 참고하세요.
---

```bash
# How to Start
$ npm install -g npm
$ npm init
$ npm install --save react react-dom
$ mkdir src src/components public && touch public/index.html src/components/App.js src/index.js webpack.config.js

## 개발환경에서만 사용
$ npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 webpack webpack-dev-server

### package.json
npm start 시, webpack-dev-server가 실행되도록
"scripts": {
    "start": "webpack-dev-server --hot --host 0.0.0.0"
},

## yarn 이용
$ create-react-app %ProjectName%
```

---
# Basics

#### [1편 소개 및 맛보기](./notes/basics/1.md)
#### [2편 작업환경 설정하기](./notes/basics/2.md)
#### [3편 JSX](./notes/basics/3.md)
#### 4편 Component 생성 및 모듈화
#### [5편 컴포넌트의 State 와 Props 사용하기](./notes/basics/5.md)
#### [6-1편 컴포넌트 Iteration (반복) – Map](./notes/basics/6.1.md)
#### [6-2편 Immutability Helper – State 내부 Array 에 원소 삽입/제거/수정](./notes/basics/6.2.md)
#### [7편 Component LifeCycle API](./notes/basics/7.md)
#### [8편 ref: DOM에 이름을 달아주자](./notes/basics/8.md)
#### [함수형 컴포넌트 (Functional Component)](./notes/basics/9.md)
---
# Router

#### [리액트 라우터 (react-router v4) 강의 [1/3] : 사용 방법](./notes/router/router1.md)
---
# Redux
#### [10-1편 Redux: React 앱의 효율적인 데이터 교류](./notes/redux/10-1.md)
#### [10-2편 Redux: 예제를 통해 사용해보기](./notes/redux/10-2.md)
