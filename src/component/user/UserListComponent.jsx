import React, { Component } from "react";
import ApiService from "../../ApiService";

class UserListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            message: null,
        };
    }

    componentDidMount() {}

    reloadUserList = () => {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({
                    users: res.data,
                });
            })
            .catch((err) => {
                console.log("reloadUserList() Error!", err);
            });
    };

    deleteUser = (userID) => {
        ApiService.deleteUser(userID)
            .then((res) => {
                this.setState({
                    message: "User Deleted Successfully.",
                });
                this.setState({
                    users: this.state.users.filter((user) => user.id !== userID),
                });
            })
            .catch((err) => {
                console.log("deleteUser() Error!", err);
            });
    };

    editUser = (ID) => {
        /* editUser()는 파라미터로 넘어온 값을 localStorage를 통해 저장하고 "/edit-user"로 이동합니다. 
        위 예시에서 파라미터값으로 1이 넘어왔으니 localStorage를 통해 1이란 값을 "userID"라는 key값으로 저장합니다. 
        우리는 route에서 "/edit-user"경로로 이동시 EditUserComponent.jsx를 출력하도록 설정할겁니다. 
        이 컴포넌트 실행시 우리가 localStorage를 통해 저장한 "userID"값으로 API통신을 통해 해당 유저 정보를 DB에서 찾아 불러올겁니다. 
        그리고 Add 컴포넌트에서 작성한 것 처럼 setState를 통해 정보를 재작성(수정)하고 이를 다시 API통신을 통해 DB에 저장할겁니다. */

        window.localStorage.setItem("userID", ID);
        this.props.history.push("/edit-user");
    };

    addUser = () => {
        window.localStorage.removeItem("userID");
        this.props.history.push("/add-user");
    };

    render() {
        /* 
        Delete User 버튼 - 구조는 이렇습니다. "Delete" 버튼을 누르면 API통신을 사용해
        DB에서 해당 유저를 삭제합니다. 그리고 filter라는 기능을 통해 state에 있는 users배열에서
        삭제된 해당 유저 id를 제외하고 다시 배열로 나타냅니다.
        (여기에서는 API통신을 ApiService로 표현했으며, 이 프로젝트에선 axios라는 걸 사용할겁니다. )

        Edit User 버튼 - "Edit" 버튼을 누르면 브라우저 로컬스토리지(brower localstorage)를 사용해
        해당 유저 id를 일시적으로 저장하고, route를 통해 EditUserComponent.jsx로 이동합니다.
        route에서 "/edit-user" url로 이동하면 EditUserComponent.jsx를 보여주도록 설정할겁니다.
        */
        return (
            <div>
                <h2>User List</h2>
                <button onClick={this.addUser}> Add User </button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>UserName</th>
                            <th>Age</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                <td>
                                    {/* "Edit" 버튼을 만들기 이전에 DB에서 유저리스트를 하나씩 출력하기 위해 "map"을 사용했습니다. 
                                    여기에서 id값을 editUser()의 파라미터로 넘기도록 작성했습니다. 
                                    예를 들어, DB에 저장된 username이 "피카츄"인 유저의 id가 1이라 한다면, 여기서 user.id는 1이 되겠죠.
                                    username이 "피카츄"인 유저정보를 수정하고자 해당 row에 있는 "Edit" 버튼을 누르면, 
                                    onClick()을 통해 파라미터값으로 1을 가지고 editUser()가 실행됩니다. */}
                                    <button onClick={() => this.editUser(user.id)}>Edit</button>
                                    <button onClick={() => this.deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserListComponent;
