
# 202130207 문기현의 README
---
## 03/30 5주차

### 오늘 배운 내용 : 엘리먼트 렌더링 & 컴포넌트와 props

#### <b>엘리먼트</b>

##### <b>A.엘리먼트의 정의</b>
리액트 공식 홈페이지에서는 엘리먼트를 '리액트 앱의 가장 작은 빌딩 블록들' 이라고 정의하며, 리액트에서 배울 엘리먼트는 'DOM 엘리먼트의 가상표현'이라고 표현한다. 
```
const element = <h1>Hello there!</h1>

//지난 시간에 JSX 예제 구문에서 엘리먼트가 있다고만 설명했었다. 
//오늘 더 자세하게 설명하자면, 위의 코드는 변수가 elememt로 되어 있다. 
//이 코드를 실행 시 대입 연산자의 우측 부분은 리액트의 createElement() 함수를 사용하여 엘리먼트를 생성한다. 
//그렇게 리액트 엘리먼트가 되는 것이다.
```

##### <b>B.엘리먼트의 생김새</b>
리액트 앨리먼트는 자바스크립트 객체 형태로 존재한다. 엘리먼트는 컴포넌트 유형과 속성 및 내부의 모든 자식에 대한 정보를 포한하는 일반적인 자바스크립트 객체이다. 이러한 객체는 불변성을 갖고 있어서 초기 생성시 변경이 불가능하다. 
```
// no.1
{  
    type: 'button', 
    props: {
      calssName: 'bg-green',
      children: {
        type: 'b',
        props: {
          children: 'Hello, element!'
        }
      }
    }
}  
```
```
//no.2
{
  <button class='bg-green'>
    <b>
      Hello, elememt!
    </b>
  </button>
}
```

type에 HTMLM 태그 이름이 문자열로 들어가는 경우, 엘리먼트는 해당 태그 이름을 가진 DOM Node를 나타내고 props는 속성을 나타낸다. no.1 엘리먼트가 실제로 렌더링 된다면 no.2와 같은 DOM엘리먼트가 된다.

```
{
  type: Button,
  props: {
    color: 'green',
    children: 'Hello, element!'
  }
}

// 이와 같이 엘리먼트의 type에 HTML 태그 이름이 문자열로 들어가지 않은 경우도 있다. 
//이런 경우도 자바스크립트 객체로 인식 받는다. 
//다만 이런 경우에는 type에 HTML태그가 아닌 리액트 컴포넌트의 이름이 들어가있다.
```
```
React.createElement(
    type,
    [props],
    [...children]
)
```
위의 코드는 createElement()함수로, 자바스크립트 객체를 만드는 역할을 담당한다.

첫 번째 파라미터에는 타입이 들어간다. 이 곳에는 HTML 태그 이름이 문자열로 들어가거나 또 다른 리액트 컴포넌트가 들어간다.

두 번째 파라미터에는 props가 들어간다. props는 간단하게 보자면 엘리먼트의 속성이다.

세 번째 파라미터에는 children이 들어간다. children에는 해당 엘리먼트의 자식 엘리먼트들이 이 파라미터에 들어간다.

```
function Button(props) {
    return (
      <button className={`bg-${props.coclr}`}>
        <b>
          {props.children}
        </b>
      </button>
    )
}

function ConfirmDialog(props) {
  return (
    <div>
      <p>내용을 확인하셨으면 확인 버튼을 눌러주세요.</p>
      <Button color='green'>확인</Button>
    </div>
  )
}
```
위 코드는 createElement() 함수가 실제로 동작하는 과정을 나타낸 코드이다. 
이 코드에는 Button 컴포넌트와 ConfirmDialog 컴포넌트가 있는데, ConfirmDialog 컴포넌트가 Button 컴포넌트를 포함하고 있다.
```
{
    type: 'div',
    props: {
      children: [
        {
          type: 'p',
          props: {
              children: '내용을 확인하셨으면 확인 버튼을 눌러주세요.'
          }
        },
        {
          type: Button,
          props: {
            color: 'green',
            childern: '확인'
          }
        }
      ]
    } 
}
```
위의 코드는 ConfirmDialog 컴포넌트의 엘리먼트의 모습이다. 

첫 번째 children은 type이 HTML 태그인 p 태그이기 때문에 곧바로 렌더링이 될 수 있는 상황이다.

두번째 children의 type은 HTML 태그가 아린 리액트 컴포넌트 이름인 Button이라서 Button 컴포넌트의 엘리먼트를 생성해서 합쳐진다. 
따라서, 아래의 코드가 궁극적인 엘리먼트의 모습이다.
```
{
  type: 'div',
  props: {
    chindren: [
        {
          type: 'p',
          props: {
            children: '내용을 확인하셨으면 확인 버튼을 눌러주세요.'
          }
        },
        {
            type: 'button',
            props: {
              className: 'bg-green',
              children: {
                type: 'b',
                props: {
                  children: '확인'
                }
              }
            }
        }
    ]
  }
}

```
##### <b>c.엘리먼트의 특징</b>
엘리먼트의 대표적인 특징은 바로 불변성(immutable)이다. 엘리먼트의 불변성은 <b>엘리먼트 생성 후에는 children이나 attributes를 바꿀 수 없다.</b>는 뜻을 가지고 있다. 쉽게 생각하면, 컴포넌트는 붕어빵 틀이고 컴포넌트를 통해 생성된 엘리먼트는 붕어빵 틀에 맞춰서 구워진 붕어빵이라고 생각하면 이해하기 쉽다.
이를 통해서 빠른 랜더링속도 라는 리액트의 장점을 살릴 수 있다. <b>기존의 엘리먼트를 변경하지 않고, 새로운 앨리먼트를 만들어서 기존의 엘리먼트와 바꿔치기 함으로써, 렌더링 속도를 획기적으로 증가시킬 수 있다. </b>


#### <b>엘리먼트 렌더링</b>
엘리먼트를 생성한 후, 화면에 보여주기 위해서 렌더링이라는 과정이 필요하다. 과정은 다음과 같다.
```

<div id="root"></div> //01 Root DOM node 선언

//02 
const element - <h1>안녕, 리액트!</h1>
ReactDOM.render(element, document.getElementById('root')); //02 엘리먼트 생성 및 root div에 렌더링
```
#### <b>엘리먼트 렌더링 실습</b>
```
//tick.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        function tick() {
            const element = (
                <div>
                    <h1>방가워, 리액트!</h1>
                    <h2>현재 시간 : { new Date().toLocaleTimeString() }</h2>
                </div>
            );
            ReactDOM.render(element, document.getElementById('root'));
        }   
        setInterval(tick, 1000);
    </script>
</body>
</html>


```
이 코드는 tick()이라는 함수를 정의한다. 지금까지 배운 엘리먼트의 원리를 사용하여 초마다 시간을 갱신하여 웹페이지에서 반영하는 방식이다.
```
//Clock.jsx
import React from "react";

function Clock(props) {
    return (
        <div>
            <h1>안녕, 리액트</h1>
            <h2>현재 시간 : { new Date().toLocaleTimeString() }</h2>
        </div>
    );
}
export default Clock;


//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library'; 
import Clock from './chapter_04/Clock';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Clock />
    </React.StrictMode>
  );
}, 1000); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```
이 코드들의 목적은 바로 위에 있는 코드와 같다.   단, 이 코드들은 JSX의 방식을 사용하여 훨씬 간결한 형태로 작성할 수 있다.

#### <b>컴포넌트</b>
웹페이지에서 컴포넌트는 구성요소이다. 리액트의 컴포넌트는 작은 컴포넌트를 모아서 하나의 대형 컴포넌트로 구성하고, 또 이런 컴포넌트들을 모아서 전체 페이지로 구성한다. 앞서 설명한 엘리먼트들은 컴포넌트에 맞춰진 결과물들이다. 객체 지향 개념,붕어빵과 유사하게, 컴포넌트는 클래스,붕어빵 틀의 역할을 수행하고, 엘리먼트는 인스턴스,틀에 찍힌 붕어빵의 역할을 수행한다고 생각하면 편하다.

#### <b>Props</b>
##### <b>a.props의 개념</b>
Props에서 Prop는 Property(속성)의 약어이다. props는 붕어빵에서 붕어빵 속에 들어가는 속재료라고 생각하면 쉽다.
붕어빵에 팥을 넣으면 팥맛 붕어빵이 되고, 슈크림을 넣으면 슈크림맛 붕어빵이 되듯이 리액트 컴포넌트에서 눈에 보이는 글자,색 등의 속성을 변경할 때 사용하는 요소라고 생각하면 쉽다. props는 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 객체이다. 정리하자면, 엘리먼트는 컴포넌트를 통해 기초적인 특성은 공유하지만, props를 통해 각 엘리먼트마다의 개성을 챙길 수 있다.

##### <b>b.props의 특징</b>
props는 기본적으로 읽기 전용이다. 이는 엘리먼트를 생성하는 중간에 props를 변경할 수 없다는 뜻이다. 
함수에는 input을 변경할 수 없어서 항상 같은 output을 출력하는 Pure함수랑 input을 변경할 수 있어서 output을 변경할 수 있는 Impure함수가 있다. 여기서 리액트 컴포넌트는 같은 props에 대하여 항상 같은 결과를 출력해야 하기에 Pure함수의 속성을 보유해야만 한다. 따라서, 리액트 컴포넌트에서는 props를 변경할 수 없으며, 같은 props를 받으면 항상 같은 엘리먼트를 리턴해야한다.

##### <b>c.props 사용법</b>
```
function App(props) {
  return (
    <Profile
        name="Kyle"
        intro="Hi, My name is Kyle."
        viewCount={1500}
    />
  );
}
```
위의 코드는 Profile 컴포넌트에 name,intro,viewCount 라는 속성 부여했다.  앞서 JSX에 대해 배울 떄 "중괄호를 사용하면 반드시 자바스크립트 코드가 들어간다"라고 배웠습니다. 마찬가지로 props에 값을 넣을 때에도 문자열 이외에 정수,변수, 그리고 다른 컴포넌트 등이 들어갈 경우에는 중괄호를 사용해서 감싸주어야 한다.
```
function App(props) {
    return (
      <Layout 
        widthi={2560}
        height={1440}
        header = {
          <Header title = "It's Kyle's Blog"/>
        }
        footer = {
          <Footer />
        }
      />
    );
}
```
때로는 위의 코드와 같이 Layout 컴포넌트의 props로는 정숫값을 가진 width, height와 리액트 엘리먼트인 header, footer가 들어온다. 이처럼 JSX를 사용하면 이렇게 쉽게 컴포넌트에 props를 넣을 수 있다.

#### <b>컴포넌트 만들기</b>
##### <b>a.컴포넌트의 종류</b>
컴포넌트에는 클래스 컴포넌트와 함수 컴포넌트가 있다. 리액트의 초기 버전에서는 클래스 컴포넌트가 주로 쓰였는데, 여러 불편한 점들이 많았다. 그러한 불편한 부분들을 함수 컴포넌트로 개선하고 극복해냈다.
##### <b>b.함수 컴포넌트</b>
함수 컴포넌트는 리액트의 컴포넌트를 일종의 함수처럼 사용하는 방법이다. 아래의 코드를 보면,
```
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```
인데, Welcome이라는 이름을 가지고, props객체를 받아서 인사말이 담긴 리액트 엘리먼트를 리턴하는 함수가 된다.
이와 같은 리액트 컴포넌트를 함수 컴포넌트라 부르며, 간결한 코드가 특징이다.

##### <b>c.클래스 컴포넌트</b>
클래스 컴포넌트는 JS ES^의 클래스 라는 것을 사용해서 만들어진 형태의 컴포넌트이다. 함수 컴포넌트에 비해서 몇 가지 추가적인 기능을 더 사용할 수 있다.
```
class Welcome extexds React.Component {
    render () {
        return <h1>Hello, {this.props.name}</h1>
    }
}
```
함수 컴포넌트와의 가장 큰 차이점은 리액트의 모든 클래스 컴포넌트는 React.Component를 상속받는다는 부분이다.

##### <b>d.컴포넌트 이름 짓기</b>
컴포넌트의 이름을 지을 때는 항상 대문자로 시작해서 지어야 한다는 점이다. 왜냐하면 리액트는 소문자로 시작하는 컴포넌트를 DOM 태그로 인식하기 때문이다. 

##### <b>e.컴포넌트 렌더링</b>
```
// DOM 태그를 사용한 element
const element = <div />;

// 사용자가 정의한 컴포넌트를 사용한 element
const element = <Welcome name="Kyle" />;
```
```
funcion welcome(props) {
    return <h1>안녕, {props.name}</h1>;
}

const element = <Welcome name="Kyle" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
```
#### <b>컴포넌트 합성</b>
컴포넌트 합성은 여러 개의 컴포넌트를 합쳐서 하나의 컴포넌트로 만드는 작업이다. 복잡한 화면을 여러 개의 컴포넌트로 나눠서 구현할 수 있다. 아래는 Welcome 컴포넌트를 사용해서 컴포넌트 합성을 ㅎ는 예제 코드이다
```
fuction Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App(props) {
    return (
        <div>
          <Welcome name="Alex" />
          <Welcome name="Brian" />
          <Welcome name="Cindy" />
        </div>
    )
}

ReactDOM.render(
    <App />
    document.getElementById('root')
);
```
이 코드는 Welcome이라는 컴포넌트 안에 Alex,Brian,Cindy 라는 서로 다른 3개의 컴포넌트가 들어있다. 이를 통해서 복잡한 웹페이지도 어렵지 않게 구성할 수 있다.

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
