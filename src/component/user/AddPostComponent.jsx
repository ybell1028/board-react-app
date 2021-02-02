/* . 먼저 입력받을 유저 정보를 state에 작성합니다. 어떤 정보를 작성받을지 지난글 List컴포넌트에서 작성했네요.
그리고 input태그에 이 정보들을 입력받게 하는데, 각 input태그마다 onChange()를 두어 실시간으로 
setState를 통해 state값을 저장하게 합니다. 다 입력 후 "Save" 버튼을 누르면 API통신을 통해 
DB에 저장하도록 할 겁니다. */
import React, { Component } from "react";
import ApiService from "../../ApiService";
import Typography from "@material-ui/core/Typography";
import Tab from "../post/TabComponent";
import Title from "../post/TitleComponent";
import Content from "../post/ContentComponent";
import Button from "../post/ButtonComponent";

class AddPostComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // id: "",
            tab: "",
            title: "",
            content: "",
            // writer: "",
            // date: "",
            // rcm: "", // 추천
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
            // id: this.state.id, // 서버로부터 필요
            tab: this.state.tab,
            title: this.state.title,
            content: this.state.content,
            // writer: this.state.writer, // 서버로부터 필요
            // date: this.state.date, // 서버로부터 필요
            // rcm: this.state.rcm, // 서버로부터 필요
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
                    <Title onChange={this.onChange} />
                    <Content />
                    <Button savePost={this.savePost} cancelPost={this.cancelPost} />
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
