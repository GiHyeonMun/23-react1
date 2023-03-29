
# 202130207 문기현의 README
---
## 03/23 4주차

### 오늘 배운 내용 : JSX의 개념과 실사용

#### <b>JSX</b> 
JSX는 '자바스크립트의 확장 문법(A syntax extension to JavaScript)'라는 뜻으로, JavaScript와 XML/HTML을 합친 존재이다.
```
const element = <h1>Hello there!</h1>

//위에 보이는 코드와 같이, JSX는 JS에서 쓰이는 const 변수 선언이랑 HTML에서 쓰이는 <h1></h1> 태그 선언을 사용한다. 
```
#### <b>JSX의 역할</b>
JSX기법 없이 JS를 사용하여 코딩을 실행할 수는 있다. 다만, JSX없이 나중에 배울 createElement()함수를 사용하면서 코딩한다면, JSX에 비해 코드가 더욱 복잡해지고 생산성과 가독성이 뒤떨어진다. 그렇기에 JSX를 적극적으로 사용하는 편이 권장된다.

#### <b>JSX의 장점</b>
JSX를 사용하면 얻을 수 있는 장점들에는

1. 간결해지는 코드
2. 향상된 가독성
3. Injection Attack이라는 해킹 방법을 차단함으로써 보안성 상승

등을 꼽을 수 있다. 여기서, Injection Attack은 입력창에 문자 혹은 숫자 같은 일반적인 값이 아닌 소스코드를 입력하면 해당 코드를 실행시키는 해킹 방법이다. 

#### <b>JSX 사용법</b>
JS의 문법을 확장시킨 존재가 JSX이므로, JS에서 사용 가능한 문법은 예외없이 사용할 수 있다. 단, 여기서 XML,HTML의 문법을 적절히 섞어서 사용하면 된다.

#### <b>JSX 예시</b>
```
//Book.jsx

import React from "react";

function Book(props) {
    return (
        <div>
          <h1>{`이 책의 이름은 ${props.name}입니다.`}</h1>
          <h2>{`이 책은 총 ${props.numOfPage}페이지 입니다.`}</h2>
        </div>
    )
}

export default Book;
```
```
//Library.jsx

import React from "react";
import Book from "./Book";

function Library(props) {
    return(
        <div>
            <Book name="처음 만난 파이썬" numOfPage={300} />
            <Book name="처음 만난 AWS" numOfPage={400} />
            <Book name="처음 만난 리액트" numOfPage={500} />
        </div>
    );
}

export default Library;
```
```
//index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    //<Library />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
위에 있는 소스코드들을 기준으로, Book.jsx에 있는 코드에 Library.jsx에 있는 요소들을 넣고나서, index.js에 가서
주석된 부분(원래는 빈칸)에 주석된 내용을 추가하고 나서 Terminal에서 npm start명령을 내리면
```
이 책의 이름은 처음 만난 파이썬입니다.
이 책은 300페이지 입니다.
이 책의 이름은 처음 만난 AWS입니다.
이 책은 400페이지 입니다.
이 책의 이름은 처음 만난 리액트입니다.
이 책은 500페이지 입니다.
```
라고 출력되는 것을 볼 수 있다.

---
## 03/16 3주차

### 오늘 배운 내용 : React의 정의랑 성질 및 실습

#### <b>리액트(React)</b> 
리액트 공식 웹사이트에 들어가자마자 "A JavaScript library for building user interfaces." 라는 문구를 볼 수 있다. 한국어로 직역하자면, "사용자 인터페이스를 제작하기 위한 자바스크립트 라이브러리"이다. 라이브러리라는 단어에서 유추할 수 있듯이, 자바스크립트와 관련된 무언가를 저장하는 역할을 할 수 있겠구나 라고 생각할 수 있다.비슷하게도, 도서관과 같이 필요한 기능들을 정해진 위치에 모아서 저장 시켜놓는 기능을 리액트가 시행한다고 생각하면 편하다. 리액트랑 비슷한 작업을 수행하는 프로그램에는 Angular.js(앵귤러.js)와 Vue.js(뷰.js)와 같은 프레임워크가 있다. Angular.js나 Vue.js같은 프레임워크랑 React같은 라이브러리는 얼핏보면 서로 같은 존재 같지만 세세하게 들여다보면 차이점이 있다. 결정적인 차이점은 바로 프로그램의 흐름에 대한 제어 권한에 있다. 프레임워크는 프로그램의 흐름에 대한 권한이 프레임워크에게 있는 반면에, 라이브러리의 흐름의 권한은 개발자에게 있다. 즉, 라이브러리는 흐름에 대한 제어를 개발자의 재량에 맡김으로써, 개발자가 필요로 하는 부분만 필요할 때 사용하는 방식을 사용합니다. 리액트를 사용함으로써, 개발자는 더욱 복잡해지는 웹페이지를 더욱 쉽고 빠르게 만들고 관리할 수 있게 도와주는 도구를 리액트라고 생각하면 된다. 

#### <b>리액트의 장점</b>
1. 빠른 업데이트와 랜더링 속도 : Virtual Document Object Model(==Virtual DOM)(가상 문서 객체 모델) 기법을 사용함으로써, 랜더링 및 업데이트 속도가 빠르다. Virtual DOM은 웹페이지와 실제 DOM을 이어주는 매개체 역할을 시행한다. 만약에 Virtual DOM 없이 실제 DOM으로 웹페이지를 움직인다면, 리소스를 지나치게 많이 사용함으로써 처리 속도가 극도록 느려질 수 있다.
하지만, Virtual DOM은 업데이트 해야하는 부분들 중에서 정말 필수적인 최소한의 부분들만 따로 모아서 업데이트 함으로써, 리소스 소모와 속도 감소를 극소화 시킨다.
2. 컴포넌트 기반 구조 : 컴포넌트(Component)는 '구성요소'라는 뜻으로, 리액트에는 모든 페이지가 컴포넌트로 구성되어 있고, 하나의 컴포넌트는 또 다른 여러 개의 컴포넌트로 구성되어 있다.일부 웹페이지를 보면, 영역의 폰트,크기,배치 등이 유사한 모습을 볼 수 있는데, 이는 컴포넌트의 영향을 받아서 규칙적으로 페이지를 제작한 결과이다. 이러한 컴포넌트의 대표적인 장점 중 하나가 재사용성이다.
3. 재사용성 : 재사용성은 말 그대로, 기존에 만들었던 리소스 등을 다시 계속해서 사용하는 방식을 의미한다. 소프트웨어의 재사용성을 높이기 위해서는 해당 소프트웨어 혹은 모듈이 다른 곳에도 쉽게 곧바로 쓰일 수 있도록 개발하는 것을 의미한다. 즉, 다른 모듈의 의존성(Dependency)를 낮추고 호환성 관련 문제를 사전에 예방하는 개발을 한다는 표현이다. 재사용성의 장점들을 간단하게 알아보자면, '개발기간 단축, 용이한 유지보수' 등을 고를 수 있다. 기존에 개발한 모듈을 조금만 손봐도 원하는 결과를 바로 얻을 수 있으며, 각 모듈이 독립적이기에 문제가 생긴 모듈만 수정해도 다른 모듈에게 가해지는 영향이 적거나 없기에 유지보수 측면에서도 유용하다. 리액트는 컴포넌트 기반의 구조로 구성되어 있어서 이러한 각 컴포넌트들은 웹사이트 곳곳에 존재하는데, 이 덕분에 웹페이지 제작에서 유지보수까지 모두 쉽고 빠르게 시행할 수 있다.
4. 든든한 지원군 : 리액트를 제작한 회사는 다름이 아닌 페이스북의 제작사인 '메타'이다. 메타에서 리액트를 꾸준히 투자하고 관리해주기에 적어도 몇년은 더욱 안정적으로 리액트를 믿고 사용할 수 있다.
5. 활발한 지식 공유 및 커뮤니티 : 깃허브(Github)를 기준으로, 리액트 관련 질문은 약 36만개 이며, 리액트 테그에 관심이 있는 사람만 약 30만명 정도이다. 또한, 오픈소스는 Star 갯수를 인기 지표로 사용한다. 리액트의 스타 갯수는 18만개 정도로 이는 오픈 소스를 기준으로 최상위 성적에 해당한다.
6. 모바일 앱 개발 가능 : 보통 모바일 앱을 개발한다면, Android를 기준으로는 Kotlin라는 프로그래밍 언어를 사용해야 하며, iOS를 기준으로는 Swift라는 프로그래밍 언어를 사용해야 한다. 추가로, 프로그래밍 언어랑 각각의 개발 프레임워크도 정확하게 알고 있어야 한다. 그러나, 리액트의 React Native(리액트 네이티브)라는  모바일 환경 UI 프레임워크를 사용한다면, 자바스크립트 코딩을 통해 Android와 iOS의 앱을 제작할 수 있다. 다만 성능은 Kotlin이나 Swift로 제작한 앱에 비해서는 뒤떨어질 수 있어도, 간단한 수준의 앱은 문제없이 사용할 수 있다.

#### <b>리액트의 단점</b>
1. 방대한 학습량 : 상당한 학습량을 요구하는 라이브러리 중에서 리액트는 기존과는 다른 UI 라이브러리라서 배워야 하는 것이 많다. 리액트의 버전이 업데이트 될 때마다 업데이트 된 부분을 정확하게 알고 넘어가야 한다.
2. 높은 상태 관리 복잡도 : 리액트는 state라는 중요한 개념을 보유하고 있다. state는 리액트 컴포넌트의 상태를 의미한다. 앞서 말했듯이 리액트의 장점 중에서 하나로, "Virtual DOM은 변한 부분만 찾아서 업데이트 한다" 라고 기술했다. 변한 부분이라 하면, state가 변한 컴포넌트를 의미함으로 state가 얼마나 리액트에서 중요한 역할을 담당하는지를 알 수 있다. 이러한 상태 관리 복잡도는 대규모 프로젝트 시행시 Redux, MobX, Recoil 등의 외부 상태 관리 라이브러리를 사용하는 경우가 많은데, 이러한 라이브러리들의 사용법도 추가로 공부해야하기에 리액트가 어려울 수 있다.

#### <b>리액트 직접 사용 해보기</b>
```
//JS+React를 모두 적용한 HTML / 파일 이름 : index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Add React in One Minute</title>
  </head>
  <body>

    <h2>Add React in One Minute</h2>
    <p>This page demonstrates using React with no build tooling.</p>
    <p>React is loaded as a script tag!</p>

    <!-- We will put our React component inside this div. -->
    <div id="like_button_container"></div>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

    <!-- Load our React component. -->
    <script src="like_button.js"></script>

  </body>
</html>
```
```
//index.html에 적용된 JS 파일(리액트 컴포넌트 제작 이후에 랜더링 까지 시행)
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
```
---
## 2주차

### 오늘 배운 내용 : 자바스크립트 기초

#### 자바스크립트 
자바스크립트는 웹페이지의 동작을 담당하는 스크립트 언어이다. C언어,Java,Python과 같은 프로그래밍 언어와 JS같은 스크립트 언어의 결정적인 차이점은 런타임(Runtime)에 코드 해석 여부에 따라 나뉜다. 프로그래밍 언어는 컴파일(compile)이라는 과정을 시행한 이후에 컴퓨터가 해석하고 실행하지만, 스크립트 언어는 작성과 동시에 인터프리터가 기계어로 번역해서 해석한다. 컴파일 언어는 운영체제에 따라 다르게 작성해야 하지만, 스크립트 언어는 운영체제에 상관없이 구동 가능 하다.

#### JS(자바스크립트)의 기초적인 성질

```
//Number Type => 숫자형 변수 선언
let n1 = 1234;
let n2 = 5.678;

//String Type => 문자열 변수 선언
let s1 = "Hello";
let s2 = "World";

//Boolean Type => 참,거짓 여부 변수 선언
let b1 = true;
let b2 = false;

// Null Type => Null값 선언
let n = null;

// Undefined Type => 변수를 선언하고 특정한 유형을 대입하지 않으면 Undefined상태 지정. 변수의; 값이 대입되는 순간 Undefined변수의 값 자동 선언
let u1;
let u2 = undefined;

//Array Type => 배열 선언
let arr = [1, 2, 3, 4];

//Object Type => 오브젝트는 JS가 객체를 다루기 위해 사용하는 개념으로, 이름(key || name)과 값(value)으로 이루어진 쌍의 집합을 의미한다. 
let obj = {a: "apple", b: "banana", c:"cherry"}

---
//JS의 연산자
let a = 10;
let b = 20;

console.log(a); //출력 결과 : 10
cons2le.log(b); //출력 결과 : 20
```

---
