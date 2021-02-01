/* . 먼저 입력받을 유저 정보를 state에 작성합니다. 어떤 정보를 작성받을지 지난글 List컴포넌트에서 작성했네요.
그리고 input태그에 이 정보들을 입력받게 하는데, 각 input태그마다 onChange()를 두어 실시간으로 
setState를 통해 state값을 저장하게 합니다. 다 입력 후 "Save" 버튼을 누르면 API통신을 통해 
DB에 저장하도록 할 겁니다. */

import React, { Component } from "react";
import ApiService from "../../ApiService";

import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MyButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tab from "../post/TabComponent";
import Content from "../post/ContentComponent";

const Button = styled(MyButton)(spacing);

class AddPostComponent extends Component {
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
            date: this.state.date,
            rcm: this.state.rcm,
        };

        ApiService.addPost(post)
            .then((res) => {
                this.setState({
                    message: post.title + "게시물이 성공적으로 등록되었습니다.",
                });
                console.log(this.state.message);
                this.props.history.push("/posts");
            })
            .catch((err) => {
                console.log("savePost() 에러", err);
            });
    };

    cancelPost = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>
                    게시물 작성
                </Typography>
                <form style={formContainer}>
                    <Tab />

                    <TextField
                        type="text"
                        placeholder="제목"
                        name="title"
                        fullWidth
                        margin="normal"
                        value={this.state.title}
                        onChange={this.onChange}
                    />

                    <Content />

                    <Button variant="contained" mr={2} color="default" onClick={this.cancelPost}>
                        취소
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.savePost}>
                        등록
                    </Button>
                </form>
            </div>
        );
    }
}

const formContainer = {
    display: "flex",
    flexFlow: "row wrap",
};

const style = {
    display: "flex",
    justifyContent: "center",
};

AddPostComponent.propTypes = {};

export default AddPostComponent;
