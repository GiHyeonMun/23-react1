
# 202130207 문기현의 README
---
## 05/18 12주차
### 오늘 배운 내용 : 합성 vs 상속 & 컨텍스트
#### <b>A.합성</b>
합성(Composition)은 "여러개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 행위"를 지칭한다. 조합 방법에 따라 합성의 사용 기법은 다음과 같이 나눌 수 있다.

##### <b>a.Containment(담다,포함하다,격리하다)</b>
특정 컴포넌트가 하위 컴포넌트를 포함하는 형태의 합성 방법이다.<br>
컴포넌트에 따라서는 어떤 자식 엘리먼트가 들어올지 미리 예상 불가능한 경우가 있다.<br>
범용적인 '박스' 역할을 하는 sidebar 혹은 Dialogㅗ아 같은 컴포넌트에서 특히 자주 볼 수 있다.<br>
이런 경우에는 Containment 방법을 사용하여 합성을 사용하게 된다.<br>

다음과 같이 props.children을 사용하면 해당 컴포넌트의 하위 컴포넌트가 모두 children으로 들어온다.

children은 다음 구조에서 세 번째 들어가는 파라미터이다. 파라미터가 배열로 되어있는 이유는 여러 개의 하위 컴포넌트를 가질 수 있기 때문이다. children이 배열로 되어있는 것은 여러개의 하위 컴포넌트를 위한 것이다.
```js
// jsx를 사용한 간단한 방법

const jsxElement = <h1 className="jsx">JSX Element</h1>


// 리액트 기능을 사용한 방법

const reactElement = React.createElement(
  'h1', 
  {className: 'obj'},
  'Obj Element'
)
```
위의 코드들은 jsx를 사용했을 때와 사용하지 않았을 때를 비교한 경우이다.<br>
아래의 코드는  FancyBorder 컴포넌트를 사용하는 예제이다. WelcomeDialog 컴포넌트는 FancyBorder 컴포넌트를 사용하고, FancyBorder 컴포넌트는 h1과 b 두 개의 태그를 children이 props로 전달된다.
```js
function FancyBorder(props){
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```
```js
function welcomeDialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        어서오세요
      </h1>
      <p className="Dialong-message">
        방문을 환영합니다.
      </p>
    </FancyBorder>
  );
}
```
```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App(props) {
  return (
    <SplitPane 
      left={
        <Contacts />
      }
      right={
        <Chat />
      }
    />
  );
}
```
#### <b>b.Specialize(특수화,전문화)</b>
웰컴다이얼로그는 다이얼로그의 특별한 경우이다. 범용적인 개념을 구별이 되게 구체화하는 것을 특수화라고 한다. 객체지향 언어에서는 상속을 사용하여 특수화를 구현한다. 리액트에서는 합성을 사용하여 특수화를 구현한다. <br>
다음 예와 같이 특수화는 범용적으로 사용할 수 있는 컴포넌트를 만들어 놓고 이를 특수한 목적으로 사용하는 합성 방식이다.
```js
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog(props) {
  return (
    <Dialog 
      title="어서오세요."
      message="방문을 환영합니다."
    />
  );
}
```
#### <b>c.Containment와 Specialization을 동시에 사용하기</b>
Containment를 위해서 props.children을 사용하고, Specialization을 위해 직접 정의한 props를 사용하면 된다. Dialog컴포넌트는 이전의 것과 비슷한데 Containment를 위해 끝부분에 props.children을 추가한다. 
```js
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

function SignUpDialog(props) {
  const [nickname, setNickname] = useState('');

  const handleChange = (event) => {
    setNickname(event.target.value);
  }

  const handleSignUp = () => {
    alert(`어서 오세요. ${nickname}님!`);
  }

  return (
    <Dialog
      title="화성 탐사 프로그램"
      message="닉네임을 입력해 주세요.">
      <input 
        value={nickname}
        onChange={handleChange} />
      <button onClick={handleSignUp}>
        가입하기
      </button>
    </Dialog>
  );
}
```
### <b>B.상속</b>
합성과 대비되는 개념으로는 상속이 있다. 자식 클래스는 부모 클래스가 가진 변수나 함수 등의 속성을 모두 갖게 되는 개념이다. <b>하지만 리액트에서는 상속보다는 합성을 통해 새로운 컴포넌트를 생성한다.</b><br>
<b>복잡한 컴포넌트를 분해해서 여러 개의 컴포넌트로 만들고, 만든 컴포넌트들을 오합하여 새로운 컴포넌트를 만든다.</b>
### <b>C.실습</b>
```js
// Card.jsx

function Card(props) {
    const { title, backgroundColor, children } = props;

    return (
        <div
            style={{
                margin: 8,
                padding: 8,
                borderRadius: 8,
                boxShadow: "0px 0px 4px grey",
                backgroundColor: backgroundColor || "white",
            }}
        >
            {title && <h1>{title}</h1>}
            {children}
        </div>
    );
}

export default Card;
```
```js
import Card from "./Card";

function ProfileCard(props) {
    return (
        <Card title="Mark Mun" backgroundColor="#4ea04e">
            <p>안녕하십니까, 마크입니다</p>
            <p>저는 리액트를 사용하면서 개발하고 있습니다</p>
        </Card>
    );
}

export default ProfileCard;
```
```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library'; 
//import Clock from './chapter_04/Clock';
//import CommentList from './chapter_05/CommentList';
//import NotificationList from './chapter_06/NotificationList';
//import Accommodate from './chapter_07/Accommodate';
//import midterm from './midterm';
//import ConfirmButton from './chapter_08/ConfirmButton';
//import LandingPage from './chapter_09/LandingPage';
//import AttendanceBook from './chapter_10/AttendanceBook';
//import SignUp from './chapter_11/SignUp';
//import Calculator from './chapter_12/Calculator';
import ProfileCard from './chapter_13/ProfileCard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <ProfileCard />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### <b>A.컨텍스트</b>
기존의 일반적인 리액트에서는 데이커가 컴포넌트의 props를 통해 부모에서 자식으로 단방향으로 전달되었다. 컨텍스트는 리액트 컴포넌트들 사이에서 데이터를 기존의 props를 통해 전달하는 방식 대힌 '컴포넌트 트리를 통새 곧바로 컴포넌트에 전달하는 새로운 방식'을 제공한다. 이를 통해 어떤 컴포넌트라도 쉽게 데이터에 접근할 수 있다. 컨텍스트를 사용하면 일일히 props로 전달할 필요 없이 데이터를 필요로 하는 컴포넌트에 곧바로 데이터를 전달할 수 있다.
### <b>컨텍스트를 사용해야 하는 경우</b>
여러 컴포넌트에서 자주 필요로 하는 데이터는 로그인 여부, 로그인 정보, UI 테마, 현재 선택받은 언어 등이 있다. 이런 데이터들을 기존의 방식대로 컴포넌트의 props를 통해넘겨주는 예를 382page에서 보여준다.
```js
function App(props) {
  // 이 Toolbar 컴포넌트는 ThemedButton에 theme을 넘겨주기 위해서 'theme'prop을 거쳐야만 한다
  // 현재 테마를 알아야 하는 모든 버튼에 대해서 props로 전달하는 것은 상당히 비효율적이다.
  return <Toolbar theme="dark" />;
}

function Toolbar(props) {
  retrun(
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

function ThemedButton(props) {
  return <Button theme={props.theme} />;
}
```
 예제처럼 props를 통해 데이터를 전달하는 기존 방식은 실제 데이터를 필요로 하는 컴포넌트까지의 깊이가 깊어질 수록 복잡해진다. 또한 반복적인 코드를 계속 작성해야 하기에 효율성과 가독성을 뒤떨어뜨린다. 단, 컨텍스트를 사용하면 이러한 문제점들을 깔끔하게 개선할 수 있다.
 ```js
// 컨텍스트는 데이터를 매번 컴포넌트를 통해 전달할 필요 없이 컴포넌트 트리로 즉시 전달한다.
// 여기서는 현제 테마를 위한 컨텍스트를 생성하며, 기본값은 'light'이다.
const ThemeContext = React.createContext('light');

// Provider를 사용하여 하위 컴포넌트들에게 현재 테마 데이터를 전달한다.
// 모든 하위 컴포넌트들은 컴포넌트 트리 하단에 깊이의 정도에 상관없이 데이터를 읽을 수 있다.
///여기서는 현재 테마값으로 'dark'를 전달한다.
function App(props) {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 이제 중간에 위치한 컴포넌트는 테마 데이터를 하위 컴포넌트로 전달할 필요가 없다.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // 리액트는 가장 가까운 상위 테마 provider를 찾아서 해당되는 값을 사용한다.
  // 만약 해당되는 Provider가 없을 경우 기본값을 사용한다.
  // 여기서는 상위 Provider가 있기에 현제 테마는 'dark'이다.
  return (
    <ThemeContext.Consumer>
      {value => <Button theme={value} />}
    </ThemeContext.Consumer>
  );
}
```
383page의 예제는 컨텍스트를 사용한 예시이다. React.createContext()함수를 사용해서 ThemeContext라는 이름의 컨텍스트를 생성한다. 컨텍스트를 사용하려면 컴포넌트의 상위 컴포넌트에서 Provider로 감싸줘야 한다.
### <b>C.컨텍스트를 사용하기 전에 고려할 부분</b>
컨텍스트는 다른 레벨의 많은 컴포넌트가 특정 데이터를 필요로하는 경우에 주로 사용한다. 하지만, 무조건 컨텍스트를 사용하는 것이 좋은 것만은 아니다. 왜냐하면 컴포넌트와 컨텍스트가 연동될 경우 재사용성이 극도록 감소하기 때문이다. 따라서 다른 레벨의 많은 컴포넌트가 데이터를 필요로 하는 경우가 아니면 props를 통해 데이터를 전달하는 컴포넌트 합성 방법이 더욱 적합하다.
```js
<Page user={user} avatarSive={avatarSize} />

<PageLayout user={user} avatarSive={avatarSize} />

<NavigationBar user={user} avatarSive={avatarSize} />

<Link href={user.permalink}>
    <Avatar user={user} size={avatarSize} />
</Link>
```
385Page의 예제처럼 실제 user와 avatarSize를 사용하는 것은 Avatar 컴포넌트 뿐인데 여러 단계에 걸쳐 props를 전달하고 있다. 이런 경우 컨텍스트를 사용하지 않고 문제를 해결할 수 있는 방법은 Avatar 컴포넌트를 변수에 저장하여 직접 넘겨주는 것이다.(9장 참고) 이렇게 하면 중간 단계의 컴포넌트들은 user와 avatarSize에 대해 몰라도 상관 없다. 386Page 참고.
```js
function Page(props) {
  const user = props.user;

  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );

  // Page 컴포넌트는 PageLayout 컴포넌트를 렌더링
  // 이때 props로 userLink를 함께 전달.
  return <PageLayout userLink={userLink} />;
}

// PageLayout 컴포넌트는 NavegationBar 컴포넌트를 렌더링
<PageLayout userKink={...} />

// NavigationBar 컴포넌트는 props로 전달받은 userLink element를 리턴
<NavigationBar userLink={...} />
```
단, 386Page의 예제가 모든 상황에서 좋은 것은 아니다. 데이터가 많아질수록 상위 컴포넌트가 점점 더 복잡해지기 때문이다. 

#### <b>D.컨텍스트 API</b>
이번에는 리액트에서 제공하는 컨텍스트 API를 통해 컨텍스트를 어떻게 사용하는지에 대해 알아봅니다.
##### <b>a. React.createContext</b>
컨텍스트를 생성하기 위한 함수이다. Parameter에는 기본값을 넣으면 된다. 하위 컴포넌트는 가장 가까운 사우이 수준의 Provider로부터 컨텍스트를 받게 되지만, 만일 Provider를 찾을 수 없다면 위에서 설정한 기본값을 사용한다.
##### <b>b. Context.Provider</b>
Context.Provider 컴포넌트로 하위컴포넌트들을 감싸주면 모든 하위 컴포넌트들이 해당 컨텍스트의 데이터에 접근할 수 있게 된다. Provider 컴포넌트에는 value라는 prop이 있고, 이것은 Provider 컴포넌트 하위에 있는 컴포넌트에게 전달된다. 하위 컴포넌트를 consumer 컴포넌트라고 부른다.
##### <b>c. Class.contextType</b>
Provider 하위에 있는 클래스 컴포넌트에서 컨텍스트ㅡ이 데이터에 접근하기 위해 사용한다. Class 컴포넌트는 더 이상 사용하지 않으므로 참고만 한다.
##### <b>d. Context.Consumer</b>
함수형 컴포넌트에서 Context.Consumer를 사용하여 컨텍스트를 구독할 수 있다.
```js
<MyContext.Consumer>
  {value => /* 컨텍스트의 값에 따라 컴포넌트들을 렌더링 */}
</MyContext.Consumer>
```
컴포넌트의 자식으로 함수가 올 수 있는데 이것을 function as a child라고 부른다. Context.Consumer로 감싸주면 자식으로 들어간 함수가 현재 컨텍스트의 value를 받아서 리액트 노드로 리턴한다. 함수로 전달되는 value는 Provider의 value prop와 동일하다.
##### <b>e. Context.displayName</b>
컨텍스트 객체는 displayName이라는 문자열 속성을 갖는다. 크롬의 리액트 개발자 도구에서는 컨텍스트의 Provider나 Consumer를 표시할 때 displayName을 함께 표시한다.
```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

// 개발자 도구에 "MyDisplayName.Provider"로 표시
<MyContext.Provider>

// 개발자 도구에 "MyDisplayName.Consumer"로 표시
<MyContext.Consumer>
```
---
## 05/11 11주차 
### 오늘 배운 내용 : State 끌어 올리기

#### <b>A.Shared State</b>
shared state는 말 그대로 공유받는 state를 의미한다. 자식 컴포넌트들이 가장 가까운 공통된 부모 컴포넌트의 state를 공유해서 사용하는 것이다. shared state는 어떤 컴포넌트의 state에 있는 데이터를 여러 개의 하위 컴포넌트에서 공통적으로 사용하는 경우를 지칭한다. 

#### <b>B.하위 컴포넌트에서 State 공유하기</b>
지금부터 ㄴ사용자로부터 온도를 입력받아서 각각 섭씨온도와 화씨온도로 표현하고 해당 온도에서 물이 끓는지 안 끓는지를 출력하는 컴포넌트를 만들어 보면서 state를 공유하는 방법에 대해 자세히 본다.
##### <b>a.물의 끓음 여부를 알려주는 컴포넌트</b>
먼저 섭씨온도 값을 props로 받아서 물이 끓는지에 대한 여부를 문자열로 출력하는 컴포넌트를 만들어본다.
```js
function BoilingVerdict(props) {
  if(props.celsius >= 100) {
    return <p>물이 끓는다</p>
  }
  return <p>물이 안 끓는다.</p>
}
```
```js
function Calculator(props) {
  const [temperature, setTemperature] = useState('');

  const handleChange = (event) => {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>섭씨 온도를 입력하세요.</legend>
      <input 
        value={temperature}
        onChange={handleChange} />
      <BoilingVerdict 
          celsius={parseFloat(temperature)} />
    </fieldset>
  )
}
```
##### <b>b.입력 컴포넌트 추출</b>
```js
const scaleNames = {
  c: '섭씨',
  f: '화씨'
};

function TemperatureInput(props) {
  const [temperature, setTemperature] = useState('');

  const handleChange = (event) => {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>온도를 입력하세요(단위:{scaleNames[props.scale]}):</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  )
}
```
```js
function Calculator(props) {
  return(
    <div>
      <Temperature scale="c" />
      <Temperature scale="f" />
    </div>
  )
}
```
##### <b>c.온도 변환 함수 작성</b>
```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```
```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```
##### <b>d.Shared State 적용</b>
```js
return (
  // 변경 전 : <input value={temperature} onChange={handleChange} />
  <input value={props.temperature} onChange={handleChange} />
)

const handleChange = (event) => {
    // 변경 전 : setTemperature(event.target.value);
    props.setTemperature(event.target.value);
  }
```
```js
function TemperatureInput(props) {
  const handleChange = (event) => {
    props.onTemperatureChange(event.target.value);
  }

  return (
    <fieldset>
      <legend>온도를 입력하세요(단위:{scaleNames[props.scale]}):</legend>
      <input value={props.temperature} onChange={handleChange} />
    </fieldset>
  )
}
```
##### <b>e.Calculator 컴포넌트 변경</b>
```js
function Calculator(props) {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const handleCelsiusChange = (temperature) => {
    setTemperature(temperature);
    setScale('c');
  }

  const handleFahrenheitChange = (temperature) => {
    setTemperature(temperature);
    setScale('f');
  }

  const celsius = 
        scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = 
        scale === "c" ? tryConvert(temperature, toFrahrenheit) : temperature;

  return(
    <div>
      <TemperatureInput 
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput 
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}
```
#### <b>C.실습</b>
```js
// TemperatureInput.jsx
const scaleNames = {
    c: "썹씨",
    f: "화씨",
};

function TemperatureInput(props){
    const handleChange = (event) => {
        props.onTemperatureChange(event.target.value);
    };

    return (
        <fieldset>
            <legend>
                온도를 입력하세요(단위:{scaleNames[props.scale]}):
            </legend>
            <input value={props.temperature} onChange={handleChange} />
        </fieldset>
    );
}

export default TemperatureInput;
```
```js
// Calculator.jsx
import React from "react";
import TemperatureInput from "./TemperatureInput";
import { useState } from "react";

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>물이 끓는다</p>
    }
    return <p>물이 끓지 않는다</p>
}

function toCelsius(fahrenheit) {
    return((fahrenheit - 32) * 5) / 9;
}

function toFrahrenheit(celsius) {
    return(celsius  * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if(Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function Calculator(props) {
    const [temperature, setTemperature] = useState("");
    const [scale, setScale] = useState("c");

    const handleCelsiusChange = (temperature) => {
        setTemperature(temperature);
        setScale("c");
    };

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale("f");
    };

    const celsius = 
        scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = 
        scale === "c" ? tryConvert(temperature, toFrahrenheit) : temperature;

    return (
        <div>
            <TemperatureInput 
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput 
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange}
            />
            <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
    );
}

export default Calculator;
```

---
## 05/04 10주차

### 오늘 배운 내용 : 리스트와 키 & 폼

#### <b>A.리스트와 키란 무엇인가?</b>
리스트는 JS의 변수나 객체를 하나의 변수로 묶어놓은 배영과 같은 존재이다. 키는 각 객체나 아이템을 구분할 수 있는 고유의 값을 의미한다. 리액트에서는 배열과 키를 사용하는 반복되는 다수의 엘리먼트를 쉽게 렌더링할 수 있다.

#### <b>B.여러 개의 컴포넌트 렌더링 하기</b>
예시의 AirBnB의 화면처럼 같은 컴포넌트를 화면에 반복적으로 나타내야 할 경우 배열에 덜어있는 엘리먼트를 map()함수를 사용하여 렌더링 한다.
다음은 numbers 배열에 들어있는 각각의 요소를 map()를 사용하여 하나씩 추출하여, 2를 곱한 후 doubled라는 배열에 다시 넣는 코드이다.
```js
const doubled = numbers.map((number) => number * 2);
```

다음은 리액트에서 map()함수를 사용한 예제이다.
```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
      <li>{number}</li>
);
```
```js
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
```js
ReactDOM.render(
  <ul>
    <li>{1}</li>
    <li>{2}</li>
    <li>{3}</li>
    <li>{4}</li>
    <li>{5}</li>
  </ul>,
  document.getElementById('root')
);
```
위 코드를 렌더링 하면 다음과 같은 출력 결과를 볼 수 있다.
```
*1
*2
*3
*4
*5
```
#### <b>C.기본적인 리스트 컴포넌트</b>
앞서 작성한 코드를 별도의 컴포넌트로 분리하면 다음과 같다.
이 컴포넌트는 props로 받은 숫자를 numbers로 받아 리스트로 렌더링해 준다.
```js
function NumberList(props) {
  const {numbers} = props;

  const listItems = numbers.map((number) =>
      <li>{number}</li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
단, 이 코드를 실행하면 "리스트 아이템에 반드시 키가 있어야 한다" 는 경고 문구를 받는다. 이는 각각의 아이템에 key props가 없기 때문이다.

#### <b>D.리스트의 키에 대해 알아보기</b>
리스트에서의 키는 "리스트에서 아이템을 구별하기 위한 고유한 문자열" 이다. 이 키는 리스트에서 어떤 아이템이 변경,추가 또는 제거되엇는지 구분하기 위해 사용한다. 키는 같은 리스트에 있는 엘리먼트 사이에서만 고유한 값이면 된다.<br>
아래는 고유한 id를 보유한 리스트들을 만드는 방법이다.<br>
```js
// key값으로 숫자 사용

const numbers = [1,2,3,4,5];
const listItems = numbers.map((number) => 
      <li key={number.toString()}>
        {number}
      </li>
);
```
단, numbers배열에 중복되는 숫자가 있다면, 고유해야하는 id의 속성을 위반하기에 id가 중복된다는 경고가 출력되니 조심해야 한다.
```js
// key값으로 index를 사용하기

const todoItems = todos.map((todo) =>
    <li key={todo.id}>
      {todo.text}
    </li>
);
```
단, 배열에서 아이템의 순서가 바뀔 수 있는 경우에는 기기의 성능과 컴포넌트의 state에 악영향을 미칠 수 있어서 키값으로 index를 사용하는 것을 권장하지 않는다. <br>
리액트에서는 키를 명시적으로 넣어 주지 않으면 기본적으로 이 인텍스 값을 키값으로 사용한다.
```js
const todoItems = todos.map((todo,index) =>
    <li key={index}>
      {todo.text}
    </li>
);
```

#### <b>E.실습 : 리스트와 키를 사용하여 간이 출석부 제작</b>
```js
// AttendanceBook.jsx

import React from "react";

const students = [
    {
        id : 1,
        name : "Temple",
    },
    {
        id : 2,
        name : "Hospitaller",
    },
    {
        id : 3,
        name : "Teutonic",
    },
    {
        id : 4,
        name : "Santiago",
    },
];

function AttendanceBook(props) {
    return (
        <ul>
            {students.map((students) => {
                return <li>key={students.id} {students.name}</li>
            } )}
        </ul>
    );
}

export default AttendanceBook;
```
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library'; 
//import Clock from './chapter_04/Clock';
//import CommentList from './chapter_05/CommentList';
//import NotificationList from './chapter_06/NotificationList';
//import Accommodate from './chapter_07/Accommodate';
//import midterm from './midterm';
//import ConfirmButton from './chapter_08/ConfirmButton';
//import LandingPage from './chapter_09/LandingPage';
import AttendanceBook from './chapter_10/AttendanceBook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <AttendanceBook />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

#### <b>A.폼이란</b>
폼은 일반적으로 사용자로부터 정보를 입력받기 위한 양식이다.

#### <b>B.제어 컴포넌트</b>
제어 컴포넌트는 사용자가 입력한 값에 접근하고 제어할 수 있도록 동작하는 컴포넌트이다.
다음 코드는 사용자의 이름을 입력받는 HTML폼을 ㅇ리액트 제어 컴포넌트로 만든 코드이다.
```js
fuction NameForm(props) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    alert('입력한 이름 : ' + vlaue);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름 :
        <input type="text" value{value} onChange={handleChange} />
        <button type="submit">제출</button>
      </label>
    </form>
  )
}
```

#### <b>C.textarea태그</b>
HTML에서는 <textarea>의 children으로 텍스트가 들어가는 형태이다.
```html
<textarea>
  Hi, Textarea is located like this comment.
</textarea>
```
#### <b>D.select 태그</b>
select 태그는 드롭다운 목록을 보여주기 위한 HTML태그이다. 트롭다운 목록은 여러가지 옵션 중에서 하나를 선택할 수 있는 기능을 제공하며, HTML에서는 다음 코드와 같이 <option>태그를 <select>태그가 감싸는 형태로 사용한다.
```html
<select>
  <option selected value="east">동</option>
  <option value="west">서</option>
  <option value="south">남</option>
  <option value="north">북</option>
</select>
```
<option>태그를 보면 기본적으로 선택되어있는 옵션의 경우에는 selected라는 속성을 가지고 있다. 이에 따르면 east라는 값을 가진 option이 기본적으로 선택되어있음을 알 수 있다. 리액트에서는 <option>태그에 selected 속성을 사용하지 않고 대신 <select> 태그에 value라는 속성을 사용하여 값을 표시한다. 다음 예시를 통해 더 자세하게 볼 수 있다.
```js
function FruitSelect(props) {
  const [value, setValue] = useState('grape');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    alert('선택한 과일 : ' + value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        과일을 선택하세요 : 
        <select value={value} onChange={handleChange}>
          <option value="apple">사과</option>
          <option value="banana">바나나</option>
          <option value="grape">포도</option>
          <option value="cherry">체리</option>
        </select>
      </label>
    </form>
  )
}
```
만약 목록에서 다중선택이 가능하도록 설정하고 싶다면 아래와 같이 multiple이라는 속성값을 true로 하고, value로 선택된 옵션의 값ㅇ 들어있는 배열을 넣어 주면 된다.
```js
<select multiple={true} value={['B', 'C']}>
```

#### <b>E.File input 태그</b>
File input 태그는 그 값이 읽기 전용이기에 리엑트에서는 비제어 컴포넌트가 된다.
```js
<input type="file" />
```

#### <b>F.여러 개의 입력 다루기</b>
여러 개의 입력을 다뤄야 하는 경우에는 여러 개의 state를 선언하여 각각의 입력에 대해 사용하면 된다. 아래의 코드를 참고하면 된다.
```js
function Reservation(props) {
  const [haveBreakfast, setHaveBreakfast] = useState(true);
  const [numberOfGuest, setNumberOfGuest] = useState(2);

  const handleSubmit = (event) => {
    alert(`아침식사 여부 : ${haveBreakfast}, 방문객 수 : ${numberOfGuest}`);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        아침식사 여부 : 
        <input 
          type="checkbox"
          checked={haveBreakfast}
          onChange{(event) => {
            setHaveBreakfast(event.target.checked);
          }} />
      </label>
      <br />
      <label>
        방문객 수 : 
        <input
          type="number"
          value={numberOfGuest}
          onChange{(event) => {
            setNumberOfGuest(event.target.value);
          }} />
      </label>
      <button type="submit"></button>
    </form>
  );
}
```
위의 코드와 같이 클래스 컴포넌트에서는 setState() 함수 하나로 모든 state의 값을 업데이트했지만 함수 컴포넌트에서는 각 state의 변수마다 set 함수가 따로 존재하기 때문에 위와 같은 형태로 각각의 set 함수를 사용해서 구현하면 된다.

#### <b>G.Input Null Value</b>
앞에서 배웠듯이 제어 컴포넌트에 value prop을 정해진 값으로 넣으면 코드를 수정하지 않는 한 값 변경이 불가능하다. 만약 value prop은 넣되 자유롭게 입력할 수 있게 만들고 싶다면 값에 undefined 혹은 null을 넣으면 된다. 아래의 코드를 참고하면 된다.
```js
ReactDoM.render(<input value="hi" />, rootNode);

setTimeout(function() {
    ReactDOM.render(<input value={null} />, rootNode);
}, 1000);
```
이와 같이 input의 값이 hi로 정해져 있지만, 1초 후에 value가 null인 <input>태그가 렌더링되면서 입력 가능한 상태로 바뀐다.

#### <b>H.실습</b>
```js
// SignUp.jsx

import React, { useState } from "react";

function SignUp(props) {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("남자");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = (event) => {
        alert(`이름 : ${name}, 성별 : ${gender}`);
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                이름 : 
                <input type="text" value={name} onChange={handleChangeName} />
            </label>
            <br />
            <label>
                성별 :
                <select value={gender} onChange={handleChangeGender}>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                </select>
            </label>
            <button type="submit">제출</button>
        </form>
    );
}

export default SignUp;
```
```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library'; 
//import Clock from './chapter_04/Clock';
//import CommentList from './chapter_05/CommentList';
//import NotificationList from './chapter_06/NotificationList';
//import Accommodate from './chapter_07/Accommodate';
//import midterm from './midterm';
//import ConfirmButton from './chapter_08/ConfirmButton';
//import LandingPage from './chapter_09/LandingPage';
//import AttendanceBook from './chapter_10/AttendanceBook';
import SignUp from './chapter_11/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <SignUp />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

---
## 04/27 9주차

### 오늘 배운 내용 : 이벤트와 핸들링 & 조건부 렌더링

#### <b>이벤트 처리</b>
DOM에서 클릭 이벤트를 처리하는 예제 코드
```js
<button onclick="activate()">
    Activate
</button>
```
React에서 클릭 이벤트를 처리하는 예제 코드
```js
<button onClick={activate}>
    Activate
</button>
```
둘의 차이점은 
1.이벤트 이름이 onclick에서 onClick으로 변경.(Camel case)
2.전달하려는 함수는 문자열에서 함수 그대로 전달

이벤트가 발생했을 때 해당 이벤트를 처리하는 함수를 "이벤트 핸들러(Event Handler)"라고 한다. 혹은 이벤트가 발생하는 것을 계속 듣고 있다는 의미로 "이벤트 리스너(Event Listener)"라고 하기도 한다.

이벤트 핸들러를 추가하는 방법은 무엇인가?

1. 버튼을 클릭하면 이벤트 핸들러 함수인 handleClick() 함수를 호출하도록 되어 있다.
2. bind를 사용하지 않으면 this.handleClick은 글로벌 스코프에서 호출되어, undefined로 사용할 수 없기 때문이다.
3. bind를 사용하지 않으려면 화살표 함수를 사용하는 방법도 있다.
4. 하지만 클래스 컴포넌트는 사용을 안하다시피 하기에 아래의 내용은 참고만 한다.
```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isToggleOn: true };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn? 'On' : 'Off'}
      </button>
    );
  }
}
```
bind 대신에 화살표 함수를 사용한다면 다음과 같다.
```js
// 250페이지 참고
```

클래스 타입을 함수 타입으로 바꾸면 다음 코드와 같다.
```js
function Toggle(props) {
  const [isToogleOn, setIstoggleOn] = useState(true);

  function handleClick() {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  const handleClick = () => {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  return (
    <button onClick={handleCilck}>
      {isToggleOn ? "On" : "Off"}
    </button>
  );
}
```
함수 타입에서 이벤트 핸들러를 정의하는 방법은 두 가지이다. 첫 번째는 함수 안에 함수로 정의하는 방법이랑 두 번째는 화살표 함수를 사용해서 정의하는 방법이다. 함수형에서는 this를 사용하지 않고, onCLick에서 바로 HandleClick을 넘기면 된다.

#### <b>Argument 전달하기</b>
함수를 정의할 때는 파라미터(Parameter) 혹은 매개변수, 함수를 사용할 때는 아규먼트(Argument) 혹은 인자라고 부른다.
이벤트 핼들러에 매개변수를 전달해야 하는 경우도 많다.
```js
<button onClick={(event) => this.deleteItem(id, event)}>삭제하기</button>
<button onClick={this.deleteItem.bind(this, id)}>삭제하기</button>

// 코드에 있는 event는 필수가 아니다. 고로, 공백() 으로 둬도 문제가 없다.
```
위의 코드는 모두 동일한 역할을 하지만 하나는 화살표 함수를 다른 하나는 bind를 사용했다. event라는 매개변수는 리액트의 이벤트 객체를 의미한다. 두 방법 모두 첫 번째 매개변수는 id이고 두 번째 매개변수로 event가 전달 된다. 첫 번째 코드는 명시적으로 event를 매개변수로 넣어 주었고, 두 번째 코드는 id 이후 두번째 매개변수로 event가 자동 전달 된다(클래스 타입에서 사용하는 방식). 함수형 커모넌트에서 이벤트 핸들러에 매개변수를 전달할 때에는 다음과 같은 방법을 사용한다. 
```js
funtion MyBtiion(props) {
  const handleDelete = (id, event) => {
    console.log(id, event.target);
  };

  return (
    <button onClick={(event) => handleDelete(1, event)}>삭제하기</button>
  );
}
```

#### <b>실습</b>
```js
// ConfirmButton.jsx
import { useState } from "react";

function ConfirmButton(props) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed);
    };

    return (
        <button onClick={handleConfirm} disabled={isConfirmed}>
            {isConfirmed ? "Confirmed" : "Confirm"}
        </button>
    );
}

export default ConfirmButton;
```
```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library'; 
//import Clock from './chapter_04/Clock';
//import CommentList from './chapter_05/CommentList';
//import NotificationList from './chapter_06/NotificationList';
//import Accommodate from './chapter_07/Accommodate';
//import midterm from './midterm';
import ConfirmButton from './chapter_08/ConfirmButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <ConfirmButton />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
#### <b>조건부 렌더링</b>
조건부 렌더링에서 조건이란 우리가 알고있는 조건문의 조건이다.
```js
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```
props로 전달 받은 isLoggedIn이 true이면 <UserGreeting />을, false면 <GuestGreeting />을 return한다. 이와 같은 렌더링을 조건부 렌더링이라 한다.

#### <b>엘리먼트 변수</b>
렌더링 받아야 할 컴포넌트를 변수처럼 사용하는 방법이 엘리먼트 변수이다.
```js
funtion LoginControl(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  }

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  }

  let button;
  if(isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={handleLoginClick} />;
  }

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn}>
      {button}
    </div>
  )
}
```
위의 코드와 같이 state에 따라 button 변수에 컴포넌트의 객체를 저장하여 return문에서 사용하고 있다.

#### <b>인라인 조건</b>
필요한 곳에 조건문을 직접 넣어 사용하는 방법으로 다음과 같은 방법들이 있다.<br><br>
  1.인라인 if<br>
  if문을 직접 사용하지 않고, 동일한 효과를 내기 위해 && 논리 연산자를 사용한다.
  &&연산자의 성질에 따라 첫 조건이 거짓이면 두 번째 조건은 판단하지 않는다. (계산단축)
  ```
  true && expression -> expression
  false && expression -> false
  ```
  예시는 다음과 같다.
  ```js
  function MailBox(props) {
    const unreadMessages = props.unreadMessages;

    return (
      <div>
        <h1>안녕하세요</h1>
        {unreadMessages.length > 0 &&
            <h2>
              현재 {unreadMessages.length}개의 안읽은 메세지가 있습니다.
            </h2>
        }
      </div>
    );
  }
  ```
  ```js
  // 274 페이지 참고
  ```
  2.인라인 If-Else<br>
  삼항 연산자를 사용한다(조건문 ? 참 : 거짓). 문자열이나 엘리먼트를 넣어서 사용할 수도 있다.
  ```js
  function UserStatus(props) {
    return (
      <div>
        이 사용자는 현재 <b>{props.isLoggedIn ? '로그인' : '비로그인'}</b> 상태입니다.
      </div>
    )
  }
  ```
  ```js
  funtion LoginControl(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
      setIsLoggedIn(true);
    }

    const handleLogoutClick = () => {
      setIsLoggedIn(false);
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {isLoggedIn 
          ? <LogoutButton onClick={handleLogoutClick} />
          : <LoginButton onClick={handleLoginClick} />
        }
      </div>
    )
  }
  ```
#### <b>컴포넌트 렌더링 막기</b>
컴포넌트를 렌더링하고 싶지 않을 때에는 null을 리턴한다.
```js
function WarningBanner(props) {
  if(!props.warning) {
    return null;
  }

  return (
    <div>Warning!</div>
  );
}
```

```js
function MainPage(props) {
  const [showWarning, setShowwarning] = useState(false);

  const handleToggleClick = () => {
    setShowWarning(prevShowWarning => !prevShowWarning);
  }

  return (
    <div>
      <WarningBanner warning={showWarning} />
      <button onClick={handleToggleClick}>
        {showWarning ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}
```

#### <b>실습</b>
```js
// Toolbar.jsx
import React from "react";

const styles = {
    wrapper: {
        padding: 16,
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid grey",
    },
    greeting: {
      marginRight: 8,  
    },
};

function Toolbar(props) {
    const { isLoggedIn, onClickLogin, onClickLogout } = props;

    return (
        <div style={styles.wrapper}>
            {isLoggedIn && <span style={styles.greeting}>환영합니다.</span>}

            {isLoggedIn ? (
                <button onClick={onClickLogout}>로그아웃</button>
            ) : (
                <button onClick={onClickLogin}>로그인</button>
            )}
        </div>
    );
}

export default Toolbar;
```
```js
// LandingPage.jsx
import React, { useState } from "react";
import Toolbar from "./Toolbar";

function LandingPage(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onClickLogin = () => {
        setIsLoggedIn(true);
    };

    const onClickLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Toolbar 
                isLoggedIn={isLoggedIn}
                onClickLogin={onClickLogin}
                onClickLogout={onClickLogout}
            />
            <div style={{ padding: 16 }}>소플과 함께하는 리액트 공부</div>
        </div>
    );
}

export default LandingPage;
```
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library'; 
//import Clock from './chapter_04/Clock';
//import CommentList from './chapter_05/CommentList';
//import NotificationList from './chapter_06/NotificationList';
//import Accommodate from './chapter_07/Accommodate';
//import midterm from './midterm';
//import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <LandingPage />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

---
## 04/13 7주차

### 오늘 배운 내용 : 훅(hook)

#### <b>훅</b>
클래스형 컴포넌트에서는 생성자(constructor)에서 state를 정의하고, setState() 함수를 통해 state를 업데이트 한다. 예전에 사용하던 함수형 컴포넌트는 별도로 state를 정의하거나, 컴포넌트의 생명주기에 맞춰서 어떤 코드가 실행되도록 할 수 없었다. 함수형 컴포넌트에서도 state나 생명주기 함수의 기능을 사용할 수 있도록 추가된 기능이 훅(Hook)이다.
함수형 컴포넌트도 훅을 사용하여 클래스형 컴포넌트의 기능을 모두 동일하게 구현할 수 있게 되었다. Hook이란 state와 생명주기 기능에 갈고리를 걸어 원하는 시점에 정해진 함수를 실행하도록 만든 함수를 의미한다. 훅의 이름은 모두 use로 시작하며, 개발자가 직접 사용자 정의 훅(custom Hook)을 만들어서 사용하기도 한다.

#### <b>useState</b>
useState는 함수형 컴포넌트에서state를 사용하기 윈한 Hook이다. useState는 훅 중에서 가장 대표적이고 많이 사용되는 훅이다. 이름에서 알 수 있듯이 state를 사용하기 위한 훅으로, 함수 컴포넌트가 기본적으로 state를 사용할 수 없기에 클래스 컴포넌트처럼 state를 사용하고 싶으면 useState() 훅을 사용해야 한다. 
```js
import React, {useState} form "react";

function Counter(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>총 {count}번 클릭했다.</p>
      <button onClick={() => setCount(count + 1)}>
        클릭
      </button>
    </div>
  );
}
```
위의 코드에는 Counter라는 함수가 있다. 위의 카운트를 함수의 변수로 선언해서 사용하면 버튼 클릭 시 카운트 값을 증가시킬 수는 있지만, 재렌더링이 일어나지 않아 새로운 카운트 값이 화면에 표시되지 않는다. 이런 경우를 대비해서 state를 사용해서 값이 변할 때마다 재렌더링이 되도록 해야한다. useState()를 사용하고 싶으면 state를 선언하고 업데이트해야하는데, useState()는 다음과 같이 사용한다.
```js
const[변수명, set함수명] = useState(초깃값);
```
```js
import React, {useState} from "react";

fuction Counter(props) {
    const [count, setCount] = useState(0);

    return (
        <div>
          <p>총 {count}번 클릭했다.</p>
          <button onClick{() => setCount(count + 1)}>
            클릭
          </button>
        </div>
    );
}
```
아까 작성했던 코드에 useState()를 적용하여 카운트 값을 state로 관리하도록 만든 코드가 위의 코드이다. state의 변수명과 set함수가 각각 count, setCount로 선언되어 있다. 버튼 클릭 시 setCount() 함수를 호출해서 카운트를 1 증가시키며, count의 값이 변경되면 컴포넌트가 재렌더링 되면서 화면에 샐운 카운ㅌ 값이 표시된다. 이 일련의 과정은 setState() 함수를 호출해서 state가 업데이트되고 이후 컴포넌트가 재렌더링되는 과정과 동일하다고 여기면 된다. 다만 클래스 컴포넌트에서는 setState() 함수 하나를 사용해서 모든 state값을 업데이트할 수 있지만 useState()를 사용하는 방법에서는 변수 각각에 대해 set 함수가 따로 존재한다는 부분을 반드시 기억해야한다.


#### <b>useEffect</b>
useStae와 더불어 가장 많이 사용하는 Hook으로 이 함수의 주 목적은 사이드 이펙트를 수행하기 위함이다. 여기서 사이드 이펙트(Side Effect)는 부작용으로 해석 되는데, 프로그래밍에서 사이드 이펙트는 '개발자가 의도치 않은 코드가 실행되면서 버그가 발생하는 현상'을 의미한다. 다만, 리액트에서는 효과, 영향 등을 뜻하는 Effect의 의미와 더욱 유사하다. 

결론적으로, Side Effect는 렌더링 외에 실행해야 하는 부수적인 코드를 의미한다.

useEffect() 함수는 다음과 같이 사용받는다.
첫 번째 파라미터는 이펙트 함수가 들어가고, 두 번째 파라미터에는 의존성 배열이 들어간다.
```js
useEffect(이펙트 함수, 의존성 배열);
```
의존성 배열은 이펙트가 의존하고 있는 배열로, 배열 안에 있는 변수 중에 하나라도 값이 변경되어있을 떄 이펙트 함수가 실행된다. 이펙트 함수는 처음 컴포넌트가 렌더링 된 이후, 그리고 재 렌더링 이후에 실행된다. 만약 이펙트 함수가 마운트와 언마운트 될 때만 한번씩 실행되게 하고 싶으면 빈 배열을 넣으면 된다. 이 경우 props나 state에 있는 어떤 값에도 의존하지 않기에 여러 번 실행되지 않는다.

의존성 배열을 생략하는 경우에는 업데이트될 때마다 호출된다.
```js
import React, { userState, useEffect } form "react";

function Counter(props) {
    const [count, setCount] = useState(0);

    // componentDidMount, componentDidUpdate와 비슷하게 작동
    useEffect(() => {
      // 브라우저 API를 사용해서 document의 title을 업데이트 한다.
      document.title = `총 ${count}번 클릭했다.`;
    });

    return (
      <div>
        <p>총 {count}번 클릭했다.</p>
        <button onClick={() => setCount(count + 1)}>
          클릭
        </button>
      </div>
    )
}
```

componentWillUnmount()와 동일한 기능은 어떻게 구현하는지 알아보자면,
```js
function UserStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `총 ${count}번 클릭했다.`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  functio handleStateusCahge(status) {
    setIsOnline(status.isOnline);
  }
}
```
과 같다.

지금까지 배운 useEffect()를 정리하면 다음과 같다.
```js
useEffect(() => {
  // 컴포넌트 마운트 이후
  // 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행
  // 의존성 배열에 빈 배열([])을 넣으면 마운트와 언마운트시에 단 한 번씩만 실행
  // 의존성 배열 생략 시 컴포넌트 업데이트 마다 실행
  ...

  return () => {
    // 컴포넌트가 마운트 해제되기 전에 실행
    ...
  }
}, [의존성 변수1, 의존성 변수2, 의존성 변수3, ...]);
```

#### <b>useMemo</b>
useMemo() 훅은 Memoized value를 리턴하는 훅이다. 이전계산값을 갖고 있기에 연산량이 많은 작업의 반복을 피할 수 있으며, 이 훅은 렌더링이 일어나는 동안 실행된다. 따라서 렌더링이 일어나는 동안 실행되서는 안될 작업을 넣으면 안되다. 
예를 들면, useEffect에서 실행되어야 할 사이드 이펙트 같은 것이다.
```js
const memoizedValue = useMemo(
  () => {
    computeExpensiveValue(의존성 변수1, 의존성 변수2);
  },
);
```

#### <b>useCallback</b>
useCallback() 훅은 useMemo()와 유사한 역할을 한다. 단, 차이점은 값이 아닌 함수를 반환한다는 부분이다.

#### <b>useRef</b>
useRef() 훅은 레퍼런스를 사용하기 위한 훅이다. 레퍼런스란 특정 컴포넌트에 접근할 수 있는 객체를 의미한다. useRef() 훅은 바로 이 레퍼런스 객체를 반환한다. 레퍼런스 객체에는 .current라는 속성이 있는데, 이 것은 현재 참조하고 이는 엘리먼트를 의미한다.
```js
const reFContainer = useRef(초깃값);
```
이렇게 반환된 레퍼런스 객체는 컴포넌트의 라이프타임 전체에 걸쳐서 유지된다. 직, 컴포넌트 마운트 해제 전까지는 계속 유지된다는 뜻이다.

#### <b>훅의 규칙</b>
첫 번째 규칙은 무조건 최상의 레벨에서만 호출해야 한다는 점이다. 여기서 최상위는 컴포넌트의 최상위 레벨을 의미한다.
따라서 반복문이나 조건문 혹은 중첩된 함수들 안에서 훅을 호출해서는 안된다. 이 규칙에 따라서 훅은 컴포넌트가 렌더링 될 때마다 같은 순서로 호출되어야 한다.
```js
function MyComponent(props) {
  const [name, setName] = useState('Kyle');

  if(name !== '') {
    useEffect(() => {
      ...
    });
  }

  ...
}
```
위 코드에서는 name !==''라는 조건문의 값이 참인 경우에만 useEffect() 훅을 호출하도록 되어 있다. 이런 경우 중간에 name의 값이 빈 문자열일 경우 useEffect() 훅이 호출되지 않는다. 

두번째 규칙은 리액트 함수형 컴포넌트에서만 훅을 호출해야 한다는 점이다. 따라서, 일반 자바스크립트 함수에서 훅을 호출해선 안된다. 훅은 함수형 커모넌트 혹은 직접 만든 커스텀 훅에서만 호출할 수 있다.

#### <b>나만의 훅 만들기</b>
필요에 따라 훅을 직접 만들어 쓸 수도 있다. 이를 커스텀 훅 이라고 한다.

##### <b>커스텀 훅을 만들어야 하는 상황</b>
아래의 코드에 나와 있는 UserStatus라는 컴포넌트는 isOnline이라는 state에 다라서 사용자의 상태가 온라인인지 아닌지를 텍스트로 보여주는 컴포넌트이다.
```js
import React, { useState, useEffect } from "react";

funtion UserStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  if(isOnline === null) {
    return '대기중...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
```js
import React, { useState, useEffect } from "react";

funtion UserListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black'; }}>
      {props.user.name}
    </li>
  );
}
```
첫 번째 코드는 사용자의 상태를 텍스트로 알려주고, 두 번째 코드는 사용자의 상태를 색으로 표시하는 코드이다. 

##### <b>커스텀 훅 추출</b>
커스텀 훅은 다름이 아닌 이름이 use로 시작하고 내부에서 다른 훅을 추출하는 하나의 자바스크립트 함수이다. 
```js
import React, { useState, useEffect } from "react";

funtion UserStatus(UserId) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ServerAPI.subscribeUserStatus(UserId, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(UserId, handleStatusChange);
    };
  });

  return isOnline 
}
```
```js
function useUserStatus(userId) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

##### <b>커스텀 훅 사용</b>
```js
function UserStatus(props) {
    const isOnline = userUser(props.user.id);

    if(isOnline === null) {
      return '대기중...';
    }
    return isOnline ? 'Online' : 'Offline';
}

function UserListItem(props) {
  const isOnline = userUserStatus(props.user.id);

  return(
    <li style{{color : isOnline ? 'green' : 'black'}}>
      {props.user.name}
    </li>
  );
}
```

#### <b>실습</b>
```js
// useCounter.jsx

import React, { useState } from "react";

function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);

    const increaseCount = () => setCount((count) => count + 1);
    const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

    return [count, increaseCount, decreaseCount];
}

export default useCounter;
```
```js
// Accommodate.jsx

import React, { useState, useEffect } from "react";
import useCounter from "./useCounter";

const MAX_CAPACITY = 10;

function Accommodate(props) {
    const [isFull, setIsFull] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(0);

    useEffect(() => {
        console.log("======================");
        console.log("useEffect() is called.");
        console.log(`isFull: ${isFull}`);
    });

    useEffect(() => {
        setIsFull(count >= MAX_CAPACITY);
        console.log(`Current count value: ${count}`);
    }, [count]);

    return (
        <div style={{ padding: 16 }}>
            <p>{`총 ${count}명 수용했습니다.`}</p>

            <button onClick={increaseCount} disabled={isFull}>
                입장
            </button>
            <button onClick={decreaseCount}>퇴장</button>

            {isFull && <p style={{color: "red" }}>정원 초과</p>}
        </div>
    );
}

export default Accommodate;
```
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Library from './chapter_03/Library'; 
//import Clock from './chapter_04/Clock';
//import CommentList from './chapter_05/CommentList';
//import NotificationList from './chapter_06/NotificationList';
import Accommodate from './chapter_07/Accommodate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <Accommodate />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

---
## 04/06 6주차

### 오늘 배운 내용 : 컴포넌트와 props(컴포넌트 추출) & State와 생애주기

#### <b>컴포넌트 추출</b>
여러 개의 컴포넌트들을 합쳐서 하나의 컴포넌트를 만드는 작업을 '컴포넌트 합성'이라고 한다. 이와 반대로, 복잡한 컴포넌트를 분리해서 여러 개의 컴포넌트로 나눌 수 있다. 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 작업을 '컴포넌트 추출'이라고 한다. 
```js
fuction Comment(props) {
    return (
        <div className="comment">
            <div className="user-info">
                <img className="avatar" 
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                />
                <div className="user-info-name">
                    {props.author.name}
                </div>  
            </div>

          <div className="comment-text">
            {props.text}
          </div>

          <div className="comment-date">
            {formatDate(props.date)}
          </div>
        </div>
    );
}

function Avatar(props) {
  return (
    <img className="avatar" 
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
첫 번째 코드는 Comment라는 컴포넌트이다. Comment는 댓글을 표시하는 컴포넌트인데, 작성작의 프로필 이미지,이름,댓글 내용과 작성일 등을 포함한다. <br>
두 번째 코드는 Comment에서 사용자의 프로필 이미지에 해당하는 부분을 추출하여 작성한 Avatar라는 컴포넌트이다. props에 기존에 사용하던 author를 user로 변경한 이유는 author보다는 user가 더 보편적이므로 재사용성의 측면에서는 user를 사용하는 편이 더 낫다. 
```js
fuction Comment(props) {
    return (
        <div className="comment">
            <div className="user-info">
                <Avatar user={props.author} />
                <div className="user-info-name">
                    {props.author.name}
                </div>  
            </div>

          <div className="comment-text">
            {props.text}
          </div>

          <div className="comment-date">
            {formatDate(props.date)}
          </div>
        </div>
    );
}
```
추출했던 Avatar 컴포넌트를 적용한 결과, 프로필 이미지와 관련된 부분이 간결해지고 가독성이 상승된 부분을 확인 할 수 있다.
```js
fuction UserInfo(props) {
  return (
    <div className="user-Info">
      <Avatar user={props.user} />
      <div className="user-info-name">
        {props.user.name}
      </div>
    </div>
  );
}
```
위 코드는 사용자 정보를 담고 있는 부분을 UserInfo라는 컴포넌트로 추출한 부분이다. 여기서, 처음에 추출했던 Avatar컴포넌트도 함께 추출한 모습을 볼 수 있다. 그리고 재사용성을 고려해서 author를 user로 교체했다.
```js
fuction Comment(props) {
    return (
        <div className="comment">
          <UserInfo user={props.author} />
          <div className="comment-text">
            {props.text}
          </div>
          <div className="comment-date">
            {formatDate(props.date)}
          </div>
        </div>
    );
}
```
궁극적으로, 두 번에 걸친 컴포넌트 추출을 시행한 결과는 처음에 작성했던 컴포넌트보다 훨씬 간결함을 체감할 수 있다. <br>
컴포넌트 추출을 시행할 때의 관건은 "기능 단위의 구분"과 "후에 재사용 가능한 형태로 추출"을 항상 기억하고 시행해야 한다.
앞서 추출했던 Avatar와 UserInfo 컴포넌트는 훗날 다른 웹사이트를 제작할 때에도 재사용 할 수 있다.<br><br>

#### <b>컴포넌트 추출 실습</b>
```js
// Comment.jsx
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    imageContainer: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentContainer: {
        marginLeft: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    nameText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    commentText: {
        color: "black",
        fontSize: 16,
    },
};
  
function Comment(props) {
    return (
        <div style={styles.wrapper}>
            <div style={styles.imageContainer}>
                <img 
                    src="./images/Aug00.jpg"
                    alt="프로필 이미지"
                    style={styles.image}
                />
            </div>
            <div style={styles.contentContainer}>
                <span style={styles.nameText}>{props.name}</span>
                <span style={styles.commentText}>{props.comment}</span>
            </div>
        </div>
    );
}

export default Comment;
```
```js
// CommentList.jsx
import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "불지옥",
        comment: "안녕하세요, 불지옥입니다.",
    },
    {
        name: "지옥",
        comment: "안녕하세요, 지옥입니다.",
    },
    {
        name: "가시지옥",
        comment: "안녕하세요, 가시지옥입니다.",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;
```
```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library'; 
import Clock from './chapter_04/Clock';
import CommentList from './chapter_05/CommentList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <CommentList />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

#### <b>state</b>
##### <b>a.state</b>
state는 리액트 컴포넌트의 상태를 의미한다. 상태의 의미는 정상/비정상의 여부가 아니라 컴포넌트의 데이터를 의미한다.
정확히는 컴포넌트의 변경 가능한 데이터를 의미한다. State가 면하면 다시 렌더링이 되기에 렌더링과 관련된 값만 state에 포함시켜야 한다.
##### <b>b.state의 특징</b>
state는 리액트 만의 특별한 형태가 아닌 단지 JS 객체일 뿐이다. 따라서 앞으로 "<b>state는 JS 객체이다.</b>"라고 기억하면 된다. 
```js
class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        liked: false
      };
    }

    ...
}
```
위의 코드에는 this.state라는 부분이 나오는데, 이 부분은 현재 컴포넌트의 state를 정의하는 부분이다. 위처럼 정의된 state는 정의된 이후 일반적인 JS 변수를 다루듯이 직접 수정할 수는 없다. 
```js
// state를 직접 수정 (잘못된 사용법)
this.state = {
  name: 'Inje'
};

// setState 함수를 통한 수정 (올바른 사용법)
this.setState({
  name: 'Inje'
});
```
첫 번째 처럼 state를 직접 수정하면 리액트가 수정된 부분을 제대로 인식하는 데에 실패할 수 있다. 따라서, 리액트가 정확하게 인식하도록 수정하려면 setState 함수를 사용해야 한다. 또한, state는 리액트에서 컴포넌트 렌더링과 관련되어 있어서 setState를 사용하지 않고 수정한다면 개발자의 의도대로 작동하지 않을 가능성이 높다. 고로, "<b>state를 변경할 경우에는 반드시 setState() 함수를 사용해야 한다.</b>

#### <b>생애주기</b>
사람은 탄생부터 죽음까지 일련의 과정인 '생애주기'가 있듯이, 리액트 컴포넌트에도 생애주기가 존재한다. 이를 "<b>생애주기 함수(Lifecycle Method)</b>라고 부른다.<br>
사람의 탄생을 출생이라고 명명하듯이, 컴포넌트의 탄생을 마운트(Mount)라고 부르는데, 이때 컴포넌트의 constructor(생성자)가 생행된다. 또한 컴포넌트가 렌더링되며 이후에 componentDidMount() 함수가 호출된다.<br>
사람은 살면서 신체적, 정신적 변화를 겪듯이, 리액트 컴포넌트도 변화를 겪으면서 여러 번 렌더링 받는다. 이를 업데이트(Update)라고 한다. 업데이트 과정에는 컴포넌트의 props가 변경되거나 setState() 함수 호출에 의해 state가 변경되거나, forceUpdate()라는 강제 업데이트 함수 호출로 인해 컴포넌트가 다시 렌더링된다. 그리고 렌더링 이후에 componentDidUpdate() 함수가 호출된다.<br>
사람은 결국 사망하듯이 리액트 컴포넌트도 사라지는 과정이 있다. 이를 언마운트(Unmount)라고 한다. 언마운트는 상위 컴포넌트에서 현재 컴포넌트를 더 이상 화면에 표시하지 않게 될 때 발생한다. 언마운트 직전에 componentWillUnmount() 함수가 호출된다.<br>
이처럼 컴포넌트는 계속 존재하는 것이 아닌 시간의 흐름에 따라 생성되고 업데이트되다가 사라진다는 사실을 알아두면 좀 더 깊게 리액트 컴포넌트를 바라볼 수 있다.

#### <b>실습</b>
```js
// Notification.jsx
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    messageText: {
        color: "black",
        fontSize: 16,
    },
};

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <span style={styles.messageText}>
                    {this.props.message}
                </span>
            </div>
        );
    }
}

export default Notification;
```
```js
// NotificationList.jsx
import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
    {
        id: 1,
        message: "Hello, I will notice today's plan.",
    },
    {
        id: 2,
        message: "It's LunchTime.",
    },
    {
        id: 3,
        message: "We will start Meeting soon.",
    },
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            notifications: [],
        };
    }

    componentDidMount() {
        const { notifications } = this.state;
        timer = setInterval(() => {
            if(notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    render() {
        return(
            <div>
                {this.state.notifications.map((notification) => {
                    return <Notification message={notification.message} />;
                })}
            </div>
        );
    }
}

export default NotificationList;
```
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library'; 
import Clock from './chapter_04/Clock';
import CommentList from './chapter_05/CommentList';
import NotificationList from './chapter_06/NotificationList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
      <NotificationList />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

---
## 03/30 5주차

### 오늘 배운 내용 : 엘리먼트 렌더링 & 컴포넌트와 props

#### <b>엘리먼트</b>

##### <b>A.엘리먼트의 정의</b>
리액트 공식 홈페이지에서는 엘리먼트를 '리액트 앱의 가장 작은 빌딩 블록들' 이라고 정의하며, 리액트에서 배울 엘리먼트는 'DOM 엘리먼트의 가상표현'이라고 표현한다. 
```js
const element = <h1>Hello there!</h1>

//지난 시간에 JSX 예제 구문에서 엘리먼트가 있다고만 설명했었다. 
//오늘 더 자세하게 설명하자면, 위의 코드는 변수가 elememt로 되어 있다. 
//이 코드를 실행 시 대입 연산자의 우측 부분은 리액트의 createElement() 함수를 사용하여 엘리먼트를 생성한다. 
//그렇게 리액트 엘리먼트가 되는 것이다.
```

##### <b>B.엘리먼트의 생김새</b>
리액트 앨리먼트는 자바스크립트 객체 형태로 존재한다. 엘리먼트는 컴포넌트 유형과 속성 및 내부의 모든 자식에 대한 정보를 포한하는 일반적인 자바스크립트 객체이다. 이러한 객체는 불변성을 갖고 있어서 초기 생성시 변경이 불가능하다. 
```js
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
```js
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

```js
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
```js
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

```js
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
```js
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
```js
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
```js

<div id="root"></div> //01 Root DOM node 선언

//02 
const element - <h1>안녕, 리액트!</h1>
ReactDOM.render(element, document.getElementById('root')); //02 엘리먼트 생성 및 root div에 렌더링
```
#### <b>엘리먼트 렌더링 실습</b>
```html
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
```js
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
```js
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
```js
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
```js
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```
인데, Welcome이라는 이름을 가지고, props객체를 받아서 인사말이 담긴 리액트 엘리먼트를 리턴하는 함수가 된다.
이와 같은 리액트 컴포넌트를 함수 컴포넌트라 부르며, 간결한 코드가 특징이다.

##### <b>c.클래스 컴포넌트</b>
클래스 컴포넌트는 JS ES^의 클래스 라는 것을 사용해서 만들어진 형태의 컴포넌트이다. 함수 컴포넌트에 비해서 몇 가지 추가적인 기능을 더 사용할 수 있다.
```js
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
```js
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
```js
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
```js
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
```js
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
```js
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
```js
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
