import React, { Component } from "react";
import ApiService from "../../ApiService";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MyButton from "@material-ui/core/Button";
const Button = styled(MyButton)(spacing);

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <Button variant="contained" mr={2} color="default" onClick={this.props.cancelPost}>
                    취소
                </Button>
                <Button variant="contained" color="primary" onClick={this.props.savePost}>
                    등록
                </Button>
            </div>
        );
    }
}

ButtonComponent.propTypes = {};

export default ButtonComponent;
