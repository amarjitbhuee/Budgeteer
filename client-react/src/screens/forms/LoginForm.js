import React from "react"; 
import axios from "axios"; 
// import { Link } from 'react-router-dom';

class Signup_Login extends React.Component { 
    constructor (props) { 
        super(props); 
        this.state = { 
            users: []
        };

        this.username = React.createRef();
        this.password = React.createRef();   
    };

    login = () => {
        let url = "http://localhost:3001/users/login"; 
        axios.post(url, {
            username: this.username.current.value,
            password: this.password.current.value
        })
    }


    render() {
        return (
            <div>
                <form>
                    <label htmlFor="username">User Name: </label>
                    <br />
                    <input ref={this.username}></input>
                    <br />
                    <label htmlFor="password" type="password">Password: </label>
                    <br />
                    <input ref={this.password}></input>
                </form>
                <button type="button" onClick={this.login}>Submit</button>
            </div>
        )
    }  
    
}

export default Signup_Login
