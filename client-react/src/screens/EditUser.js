import React from "react";
import '../user.min.css';
import axios from "axios";
import { Link } from 'react-router-dom';

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
        this.userid = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.firstname = React.createRef();
        this.lastname = React.createRef();
        this.username = React.createRef();
    }

    //AJ renamed to getUser to try to get user based on its id
    componentDidMount() {
        this.getUser();
    };

    getUser = () => {
        //AJ: Url connects properly without out manually inputing the transaction id
        let className = this.props.match.params.userid;
        let url = "http://localhost:3001/users/edituser/" + className;
        axios.get(url)
            .then(response => this.setState({ users: response.data }))
    };

    updateUser = () => {
        let className = this.props.match.params.userid
        let url = "http://localhost:3001/users/edituser/" + className;
        axios.put(url, {
            email: this.email.current.value,
            password: this.password.current.value,
            firstname: this.firstname.current.value,
            lastname: this.lastname.current.value,
            username: this.username.current.value,
        })
            .then(response => {
                // refresh the data
                this.getUser();
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
          <div>
            <h3>Update User</h3>
            <p>First Name: {this.state.users.firstname}</p>
            <p>Last Name: {this.state.users.lastname} </p>
            <p>Username: {this.state.users.username}</p>
            <p>Email: {this.state.users.email}</p>
            <p>Password: {this.state.users.password}</p>
            <hr />
            <label>First Name: </label>
            <input ref={this.firstname} className="firstname" defaultValue={this.state.users.firstname} />
            <br />
            <label>Last Name: </label>
            <input ref={this.lastname} className="lastname" defaultValue={this.state.users.lastname} />
            <br />
            <label>Username: </label>
            <input ref={this.username} className="username" defaultValue={this.state.users.username} />
            <br />
            <label>Email: </label>
            <input ref={this.email} className="email" defaultValue={this.state.users.email} />
            <br />
            <label>Password: </label>
            <input ref={this.password} className="password" defaultValue={this.state.users.password} />
            <br />
            <button type="button" className="btn btn-success" onClick={() => this.updateUser(this.userid)}>Update</button>
            <br />
            <Link to={`/`}>View All Users</Link><br />
            <br />
            <Link to={`/history`}>View All Transactions</Link>
          </div>
        );
      }
}

export default EditUser;
