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
        let id = this.props.match.params.userid;
        let url = "http://localhost:3001/users/edituser/" + id;
        axios.get(url)
            .then(response => this.setState({ users: response.data }))
    };

    updateUser = () => {
        let id = this.props.match.params.userid
        let url = "http://localhost:3001/users/edituser/" + id;
        axios.put(url, {
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
                <input ref={this.firstname} id="firstname" defaultValue={this.state.users.firstname} />
                <input ref={this.lastname} id="lastname" defaultValue={this.state.users.lastname} />
                <input ref={this.username} id="username" defaultValue={this.state.users.username} />
                <button type="button" className="btn btn-success" onClick={() => this.updateUser(this.userid)}>Update</button>
                <br />
                <Link to={`/`}>Home</Link><br />
            </div>
        );
    }
}

export default EditUser;
