// 리액트 앱에 존재하는 render 중 최상위에 있는 render가 존재하는 파일입니다.
// 이 파일엔 React.DOM.render(...)가 있는데, 이는 App.js 파일에서 렌더한 App 컴포넌트를
// index.html 파일에 있는 id가 "root"인 div태그 안에 실행하라는 겁니다.

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
