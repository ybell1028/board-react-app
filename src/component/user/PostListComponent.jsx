import React, { Component } from "react";
import ApiService from "../../ApiService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

class PostListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            message: null,
        };
    }

    componentDidMount() {}

    reloadPostList = () => {
        ApiService.fetchPosts()
            .then((res) => {
                this.setState({
                    posts: res.data,
                });
            })
            .catch((err) => {
                console.log("reloadPostList() Error!", err);
            });
    };

    deletePost = (postID) => {
        ApiService.deletePost(postID)
            .then((res) => {
                this.setState({
                    message: "Post Deleted Successfully.",
                });
                this.setState({
                    posts: this.state.posts.filter((post) => post.id !== postID),
                });
            })
            .catch((err) => {
                console.log("deletePost() Error!", err);
            });
    };

    editPost = (ID) => {
        /* editPost()는 파라미터로 넘어온 값을 localStorage를 통해 저장하고 "/edit-post"로 이동합니다. 
        위 예시에서 파라미터값으로 1이 넘어왔으니 localStorage를 통해 1이란 값을 "postID"라는 key값으로 저장합니다. 
        우리는 route에서 "/edit-post"경로로 이동시 EditPostComponent.jsx를 출력하도록 설정할겁니다. 
        이 컴포넌트 실행시 우리가 localStorage를 통해 저장한 "postID"값으로 API통신을 통해 해당 유저 정보를 DB에서 찾아 불러올겁니다. 
        그리고 Add 컴포넌트에서 작성한 것 처럼 setState를 통해 정보를 재작성(수정)하고 이를 다시 API통신을 통해 DB에 저장할겁니다. */

        window.localStorage.setItem("postID", ID);
        this.props.history.push("/edit-post");
    };

    addPost = () => {
        window.localStorage.removeItem("postID");
        this.props.history.push("/add-post");
    };

    render() {
        /* 
        Delete Post 버튼 - 구조는 이렇습니다. "Delete" 버튼을 누르면 API통신을 사용해
        DB에서 해당 유저를 삭제합니다. 그리고 filter라는 기능을 통해 state에 있는 posts배열에서
        삭제된 해당 유저 id를 제외하고 다시 배열로 나타냅니다.
        (여기에서는 API통신을 ApiService로 표현했으며, 이 프로젝트에선 axios라는 걸 사용할겁니다. )

        Edit Post 버튼 - "Edit" 버튼을 누르면 브라우저 로컬스토리지(brower localstorage)를 사용해
        해당 유저 id를 일시적으로 저장하고, route를 통해 EditPostComponent.jsx로 이동합니다.
        route에서 "/edit-post" url로 이동하면 EditPostComponent.jsx를 보여주도록 설정할겁니다.
        */
        return (
            <div>
                <Typography variant="h4" style={style}>
                    Developer's Board
                </Typography>
                <Button variant="contained" color="primary" onClick={this.addPost}>
                    게시물 작성
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>탭</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell align="right">글쓴이</TableCell>
                            <TableCell align="right">날짜</TableCell>
                            <TableCell align="right">추천</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell component="th" scope="post">
                                    {post.id}
                                </TableCell>
                                <TableCell align="right">{post.tab}</TableCell>
                                <TableCell align="right">{post.title}</TableCell>
                                <TableCell align="right">{post.writer}</TableCell>
                                <TableCell align="right">{post.date}</TableCell>
                                <TableCell align="right">{post.rcm}</TableCell>

                                {/* "Edit" 버튼을 만들기 이전에 DB에서 유저리스트를 하나씩 출력하기 위해 "map"을 사용했습니다. 
                                    여기에서 id값을 editPost()의 파라미터로 넘기도록 작성했습니다. 
                                    예를 들어, DB에 저장된 postname이 "피카츄"인 유저의 id가 1이라 한다면, 여기서 post.id는 1이 되겠죠.
                                    postname이 "피카츄"인 유저정보를 수정하고자 해당 row에 있는 "Edit" 버튼을 누르면, 
                                    onClick()을 통해 파라미터값으로 1을 가지고 editPost()가 실행됩니다. */}
                                <TableCell align="right" onClick={() => this.editPost(post.id)}>
                                    <CreateIcon />
                                </TableCell>
                                <TableCell align="right" onClick={() => this.deletePost(post.id)}>
                                    <DeleteIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const style = {
    display: "flex",
    justifyContent: "center",
};

export default PostListComponent;
