/* 컴포넌트에 주소를 부여해 해당 주소로 접속하면 해당 컴포넌트를 보여줄 수 있게 됩니다. 
작성방법은 2가지가 있습니다. App.js 내부에 작성해 관리하는 것, 
그리고 라우트 컴포넌트를 작성해서 관리하는 것 입니다. 
선택 기준은 프로젝트 규모입니다. 우리가 만들고 있는 프로젝트는 기본 CRUD 프로젝트라 규모가
크지 않아 전자를 선택해도 됩니다. 하지만 규모가 커질 경우 라우트를 따로 관리하는게 더 수월하고, 
리액트를 리액트답게 사용하기 위해 컴포넌트를 따로 작성하는게 나아 후자로 진행하겠습니다. */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignupComponent from "../signup/Signup";
import PostListComponent from "../user/PostListComponent";
import AddPostComponent from "../user/AddPostComponent";
import EditPostComponent from "../user/EditPostComponent";

// 위에서 작성한 라우터 컴포넌트는 라우터만 관리해줄거라 함수 하나만 사용했습니다.
// 그러니 컴포넌트를 함수형으로 작성하는게 효율적이겠죠?
const AppRouter = () => {
    return (
        <div>
            <Router>
                <div style={style}>
                    <Switch>
                        <Route exact path="/" component={PostListComponent} />
                        <Route path="/posts" component={PostListComponent} />
                        <Route path="/add-post" component={AddPostComponent} />
                        <Route path="/edit-post" component={EditPostComponent} />
                        <Route path="/signup" component={SignupComponent} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

const style = {
    color: "black",
    margin: "10px",
};

export default AppRouter;
