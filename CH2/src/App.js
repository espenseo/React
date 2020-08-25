import React from './node_modules/react'; # 리액트를 불러와서 사용할 수 있게 해줌
import logo from './logo.svg'; #SVG파일을 import하는 코드
import './App.css'; #CSS파일을 import하는코드 

function App() { ##함수형 컴포넌트
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
##이런 코드를 JSX라고 함
export default App;