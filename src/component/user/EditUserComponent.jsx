/* Edit 컴포넌트는 이전글에서 작성한 Add 컴포넌트와 상당히 유사합니다. 
여기에서도 CompoentDidMount()를 사용해 유저정보를 API통신을 통해 DB에서 불러옵니다.*/

import React, { Component } from "react";
import ApiService from "../../ApiService";

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
        return (
            <div>
                <h2>Edit User</h2>
                <form>
                    <div>
                        <label>User Name:</label>
                        <input type="text" name="username" readOnly="true" defaultValue={this.state.username} />
                    </div>

                    <div>
                        <label>First Name:</label>
                        <input placeholder="Edit your first name" name="firstName" value={this.state.firstName} onChange={this.onChange} />
                    </div>

                    <div>
                        <label>Last Name:</label>
                        <input placeholder="Edit your last name" name="lastName" value={this.state.lastName} onChange={this.onChange} />
                    </div>

                    <div>
                        <label>Age:</label>
                        <input type="number" placeholder="Edit your age" name="age" value={this.state.age} onChange={this.onChange} />
                    </div>

                    <div>
                        <label>Salary:</label>
                        <input
                            type="number"
                            placeholder="Edit your salary"
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

EditUserComponent.propTypes = {};

export default EditUserComponent;
