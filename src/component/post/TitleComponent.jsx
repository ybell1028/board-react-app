import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class TitleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <TextField
                    type="text"
                    placeholder="제목"
                    name="title"
                    fullWidth
                    margin="normal"
                    value={this.props.title}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

TitleComponent.propTypes = {};

export default TitleComponent;
