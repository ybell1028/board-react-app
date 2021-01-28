/* 루트(root) 컴포넌트라고 불리며, 이 파일에는 브라우저에서 실제로 렌더되는 컴포넌트들을 포함하고 있습니다.
App.js 파일은 JSX라는 확장자 파일을 리턴하는데, JSX는 자바스크립트를 확장한 문법입니다. 
'$' 표시가 없는 jsp 파일과 유사하다 할까요. HTML에서 클래스 속성은 <... class="" > 이렇게
'class'라고 적고 큰따옴표에 클래스 이름을 주었습니다. 
반면 JSX에서 클래스 속성을 주기 위해선 class라고 적는 것이 아닌 className이라고 적어야 합니다. 
className에서 N은 소문자가 아닌 대문자로 적어야 합니다. */

import React, { useState, useEffect } from "react";
import AppRouter from "./component/route/RouterComponent";
import NavBar from "./component/route/NavBar";
import customAxios from "./customAxios";
import Container from "@material-ui/core/Container";
function App() {
    return (
        <div>
            <NavBar />
            <Container>
                <AppRouter />
            </Container>
        </div>
    );
    function Home() {
        // IP 주소 변수 선언
        const [ip, setIP] = useState("");

        // IP 주소 값 설정
        function callback(data) {
            setIP(data);
        }

        // 펏번째 렌더링은 다 마친 후 실행
        useEffect(() => {
            // 클라이언트의 IP주소를 알아내는 백엔드의 함수를 호출합니다.
            customAxios("/ip", callback);
        }, []);

        return <header className="App-header">이 기기의 IP주소는 {ip}입니다.</header>;
    }

    function About() {
        return (
            <div>
                <hr />
                <h2>소개 페이지</h2>
            </div>
        );
    }

    function Users() {
        return (
            <div>
                <hr />
                <h2>사용자 페이지</h2>
            </div>
        );
    }
}
export default App;
