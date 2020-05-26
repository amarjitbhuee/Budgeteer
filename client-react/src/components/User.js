import React from "react";
import axios from "axios";
import '../user.min.css';
import { Link } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.firstname = React.createRef();
    this.lastname = React.createRef();
    this.username = React.createRef();
  };

  componentDidMount() {
    this.getData();
  };

  getData = () => {
    // Express uses port 3001 (react uses 3000)
    let url = "http://localhost:3001/users";
    axios.get(url).then(response => this.setState({ users: response.data }));
  };

  addUser = () => {
    let url = "http://localhost:3001/users";
    axios.post(url, {
      firstname: this.firstname.current.value,
      lastname: this.lastname.current.value,
      username: this.username.current.value
    })
      .then(response => {
        // refresh the data
        this.getData();
        // empty the input
        this.firstname.current.value = ""
        this.lastname.current.value = ""
        this.username.current.value = ""
      });
  };

  deleteUser = (userid) => {
    let url = "http://localhost:3001/users/" + userid;
    axios.delete(url)
      .then(response => this.getData());
  };

  render() {
    return (

      <div>
        <h3>ADD A USER</h3>
        <input ref={this.firstname} id="firstname" placeholder="First Name" />
        <input ref={this.lastname} id="lastname" placeholder="Last Name" />
        <input ref={this.username} id="username" placeholder="Username" />
        <button type="button" className="btn btn-primary" onClick={this.addUser}>add</button>
        <ul>
          {this.state.users.map(p => (
            <li key={p.userid}>
              {p.firstname} | { p.lastname} | { p.username}
              <Link to={`/edituser/${p.userid}`}><button type="button" className="btn btn-success">Edit</button></Link>
              <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(p.userid)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default User;
