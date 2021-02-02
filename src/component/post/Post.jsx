import React, { Component } from "react";

import Tab from "../post/TabComponent";
import Title from "../post/TitleComponent";
import Content from "../post/ContentComponent";
import Button from "../post/ButtonComponent";
import "../post/Post.css";

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <Tab />
                <Title />
                <Content />
                <Button />
            </div>
        );
    }
}

Post.propTypes = {};

export default Post;
