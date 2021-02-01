/* Edit 컴포넌트는 이전글에서 작성한 Add 컴포넌트와 상당히 유사합니다. 
여기에서도 CompoentDidMount()를 사용해 유저정보를 API통신을 통해 DB에서 불러옵니다.*/

import React, { Component } from "react";
import ApiService from "../../ApiService";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tab from "../post/TabComponent";

class EditPostComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            tab: "",
            title: "",
            content: "",
            writer: "",
            date: "",
            rcm: "", // 추천
        };
    }

    componentDidMount() {
        this.loadPost();
    }

    loadPost = () => {
        ApiService.fetchPostByID(window.localStorage.getItem("postID"))
            .then((res) => {
                let post = res.data;
                this.setState({
                    id: post.id,
                    tab: post.tab,
                    title: post.title,
                    content: post.content,
                    writer: post.writer,
                    date: post.date,
                    rcm: post.rcm,
                });
            })
            .catch((err) => {
                console.log("loadPost() 에러", err);
            });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    savePost = (e) => {
        e.preventDefault();

        let post = {
            id: this.state.id,
            tab: this.state.tab,
            title: this.state.title,
            content: this.state.content,
            writer: this.state.writer,
            date: this.state.writer,
            rcm: this.state.rcm,
        };

        ApiService.editPost(post)
            .then((res) => {
                this.setState({
                    message: post.title + "게시물이 수정되었습니다.",
                });
                console.log(this.state.message);
                this.props.history.push("/posts");
            })
            .catch((err) => {
                console.log("savePost() 에러", err);
            });
    };

    render() {
        const style = {
            display: "flex",
            justifyContent: "center",
        };

        return (
            <div>
                <Typography variant="h4" style={style}>
                    게시물 수정
                </Typography>
                <form>
                    <TextField type="text" name="postname" readOnly={true} fullWidth margin="normal" value={this.state.postname} />

                    <Tab />

                    <TextField
                        placeholder="Edit title"
                        name="title"
                        fullWidth
                        margin="normal"
                        value={this.state.title}
                        onChange={this.onChange}
                    />

                    <TextField
                        placeholder="Edit content"
                        name="content"
                        fullWidth
                        margin="normal"
                        value={this.state.content}
                        onChange={this.onChange}
                    />

                    <Button variant="contained" color="primary" onClick={this.savePost}>
                        등록
                    </Button>
                </form>
            </div>
        );
    }
}

EditPostComponent.propTypes = {};

export default EditPostComponent;
