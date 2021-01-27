/* . 먼저 입력받을 유저 정보를 state에 작성합니다. 어떤 정보를 작성받을지 지난글 List컴포넌트에서 작성했네요.
그리고 input태그에 이 정보들을 입력받게 하는데, 각 input태그마다 onChange()를 두어 실시간으로 
setState를 통해 state값을 저장하게 합니다. 다 입력 후 "Save" 버튼을 누르면 API통신을 통해 
DB에 저장하도록 할 겁니다. */

import React, { Component } from "react";
import ApiService from "../../ApiService";

class AddUserComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            age: "",
            salary: "",
            message: null,
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary,
        };

        ApiService.addUser(user)
            .then((res) => {
                this.setState({
                    message: user.username + "님이 성공적으로 등록되었습니다.",
                });
                console.log(this.state.message);
                this.props.history.push("/users");
            })
            .catch((err) => {
                console.log("saveUser() 에러", err);
            });
    };

    render() {
        return (
            <div>
                <h2>Add User</h2>
                <form>
                    <div>
                        <label>User Name:</label>
                        <input
                            type="text"
                            placeholder="please input your username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="please input your password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>

                    <div>
                        <label>First Name:</label>
                        <input
                            placeholder="please input your first name"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                        />
                    </div>

                    <div>
                        <label>Last Name:</label>
                        <input
                            placeholder="please input your last name"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChange}
                        />
                    </div>

                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            placeholder="please input your age"
                            name="age"
                            value={this.state.age}
                            onChange={this.onChange}
                        />
                    </div>

                    <div>
                        <label>Salary:</label>
                        <input
                            type="number"
                            placeholder="please input your salary"
                            name="salary"
                            value={this.state.salary}
                            onChange={this.onChange}
                        />
                    </div>

                    <button onClick={this.saveUser}>Save</button>
                </form>
            </div>
        );
    }
}

AddUserComponent.propTypes = {};

export default AddUserComponent;
