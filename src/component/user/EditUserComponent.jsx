/* Edit 컴포넌트는 이전글에서 작성한 Add 컴포넌트와 상당히 유사합니다. 
여기에서도 CompoentDidMount()를 사용해 유저정보를 API통신을 통해 DB에서 불러옵니다.*/

import React, { Component } from "react";
import ApiService from "../../ApiService";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class EditUserComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            username: "",
            firstName: "",
            lastName: "",
            age: "",
            salary: "",
            message: null,
        };
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        ApiService.fetchUserByID(window.localStorage.getItem("userID"))
            .then((res) => {
                let user = res.data;
                this.setState({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    salary: user.salary,
                });
            })
            .catch((err) => {
                console.log("loadUser() 에러", err);
            });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            id: this.state.id,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary,
        };

        ApiService.editUser(user)
            .then((res) => {
                this.setState({
                    message: user.username + "님의 정보가 수정되었습니다.",
                });
                console.log(this.state.message);
                this.props.history.push("/users");
            })
            .catch((err) => {
                console.log("saveUser() 에러", err);
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
                    Edit User
                </Typography>
                <form>
                    <TextField type="text" name="username" readOnly={true} fullWidth margin="normal" value={this.state.username} />

                    <TextField
                        placeholder="Edit your first name"
                        name="firstName"
                        fullWidth
                        margin="normal"
                        value={this.state.firstName}
                        onChange={this.onChange}
                    />

                    <TextField
                        placeholder="Edit your last name"
                        name="lastName"
                        fullWidth
                        margin="normal"
                        value={this.state.lastName}
                        onChange={this.onChange}
                    />

                    <TextField
                        type="number"
                        placeholder="Edit your age"
                        name="age"
                        fullWidth
                        margin="normal"
                        value={this.state.age}
                        onChange={this.onChange}
                    />

                    <TextField
                        type="number"
                        placeholder="Edit your salary"
                        name="salary"
                        fullWidth
                        margin="normal"
                        value={this.state.salary}
                        onChange={this.onChange}
                    />

                    <Button variant="contained" color="primary" onClick={this.saveUser}>
                        Save
                    </Button>
                </form>
            </div>
        );
    }
}

EditUserComponent.propTypes = {};

export default EditUserComponent;
