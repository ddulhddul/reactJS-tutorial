[React.JS](https://velopert.com/reactjs-tutorials)

# Basics

## 1편 소개 및 맛보기

### React ?
재사용 가능한 UI 생성
Virtual DOM : 상태가 변함에 따라 선택적으로 유저인터페이스 렌더링

### Virtual DOM 은 어떻게 작동 ?
DOM 은 동적 UI에 최적화 되어있지 않다.
reflow : 레이아웃을 새로 구성하면서 계산하는것
repaint : 색상변경같이 레이아웃에 관계없는 것들을 처리하는 것

```js
var style = document.body.style; // 캐싱

style.padding = "20px"; // reflow, repaint
style.border = "10px solid red"; reflow, repaint

style.color = "blue"; // repaint (레이아웃이 변경되진 않았기 때문에 reflow 안함)
style.backgroundColor = "#ffa"; // repaint

style.fontSize = "1em"; // reflow, repaint

// reflow, repaint
document.body.appendChild(document.createTextNode('hello world!'));
```

DOM 값을 읽을때도 reflow 가 계산될 때도 있다.
- element.offsetLeft
- element.clientWidth
- element.getClientRects()

### 브라우저의 성능저하 해결
브라우저는 짧은 시간 내에 여러 reflow 발생시, 모았다가 한꺼번에 처리한다.
하지만, offsetTop, scrollTop, getComputedStyle() 등의 코드는 여러번 reflow가 실행될 수 밖에 없고, 이 횟수를 줄이기 위해 코드를 최적화하는것이 중요하다.

[10 Ways to Minimize Reflows and Improve Performance](https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/)

### Virtual DOM
Virtual DOM 을 사용하면, DOM 직접 조작 대신, 추상화시킨 자바스크립트 객체를 구성하여 사용

#### React 의 DOM Update 절차
1. 데이터가 업데이트되면, 전체 UI 를 Virtual DOM 에 리렌더링 합니다.
2. 이전 Virtual DOM 에 있던 내용과 현재의 내용을 비교합니다.
3. 바뀐 부분만 실제 DOM 에 적용이 됩니다.

> React 버전 v15부터 IE8 이하 버전을 지원하지 않습니다. (IE8 이하 버전을 지원해야 할 경우 v0.14 버전을 사용 해야 합니다.

### React 해보자
> webpack 이라는 도구를 사용하여 마치 Node.js 에서 require 하는것과 같이 모듈을 불러올 수 있게 하는 것 입니다. 
> webpack 은 이렇게 import(혹은 require) 한 모듈들을 불러와서 한 파일로 합칩니다. 이 작업을 번들링(bundling) 이라고 합니다.

---
## 2편 작업환경 설정하기
```bash
## npm update
$ npm install -g npm
```

### 1) Global Package 설치
1. babel
2. webpack : 모듈 번들러, Browserify 처럼 브라우저 위에서 import 할수 있게 해주고, 자바스크립트파일들을 하나로 합쳐줌
3. webpack-dev-server : webpack에서 지원하는 간단한 개발서버, hot-loader를 통해 코드 수정시 리로드
```bash
$ npm install -g npm
```

### 2) 프로젝트 생성
```bash
$ npm init
```

### 3) Dependency 및 Plugin 설치
```bash
$ npm install --save react react-dom
## 개발환경에서만 사용
$ npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 webpack webpack-dev-server
```

### 4) 디렉토리 구조 이해 및 파일 생성
    react-tutorial
    ├── package.json         
    ├── public            # 서버 public path
    │   └── index.html    # 메인 페이지
    ├── src               # React.js 프로젝트 루트
    │   ├── components    # 컴포넌트 폴더
    │   │   └── App.js    # App 컴포넌트
    │   └── index.js      # Webpack Entry point
    └── webpack.config.js # Webpack 설정파일

```bash
mkdir src src/components public && touch public/index.html src/components/App.js src/index.js webpack.config.js
```


### 5) 컴파일러, 서버 및 로더 설정
#### webpack 설정하기 (webpack.config.js)
webpack ? 
> entry부터 필요모둘 불러온 후 한 파일로 합쳐 bundle.js 에 저장

> ES6 문법 코드를 ES5로 변환도 해줌


```js
module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname + '/public/'
    },

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
};
```

#### package.json
npm start 시, webpack-dev-server가 실행되도록
```json
"scripts": {
    "start": "webpack-dev-server --hot --host 0.0.0.0"
},
```

### 6) HTML 및 js 수정
- [public/index.html](./public/index.html)
```html
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <title>React App</title>
   </head>
   <body>
      <div id="root"></div>
      <script src="bundle.js"></script>
   </body>
</html>
```

- [src/components/App.js](./src/components/App.js)
```js
import React from 'react';

class App extends React.Component {
    render(){

        return (
                <h1>Hello React Skeleton !!</h1>
        );
    }
}

export default App;
```

- [src/index.js](./src/index.js)
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

### 7) webpack-dev-server 구동하기
```bash
$ npm start
```

[http://localhost:7777](http://localhost:7777)


## 2.1 손쉽게 React.js 작업환경 설정
```bash
## 프로젝트 클론하기
git clone https://github.com/velopert/react-skeleton.git
## Dependency 설치하기
npm install
## 개발 서버 실행하기 (포트: 7777)
npm start
```


2편 End...