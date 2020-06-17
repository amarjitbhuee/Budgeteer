import React from "react"; 
import axios from "axios"; 
// import { Link } from 'react-router-dom';

class Signup_Login extends React.Component { 
    constructor (props) { 
        super(props); 
        this.state = { 
            users: []
        };

        this.firstname = React.createRef(); 
        this.lastname = React.createRef();
        this.email = React.createRef(); 
        this.username = React.createRef();
        this.password = React.createRef();   
    };

    addUser = () => {
        let url = "http://localhost:3001/users/signup"; 
        axios.post(url, {
            firstname: this.firstname.current.value,
            lastname: this.lastname.current.value,
            email: this.email.current.value,
            username: this.username.current.value,
            password: this.password.current.value
        })
            .then( response => {
                //empty inputs
                this.firstname.current.value = ""
                this.lastname.current.value = ""
                this.email.current.value = ""
                this.username.current.value = ""
                this.password.current.value = ""; 
            })
            .catch((error) => alert("Opps! There Is a Problem"))
            //Make sure this gets changed when sign up can post to data base
            window.location.replace('/Login')
    }


    render() {
        return (
            <div>
                <form>
                    <label htmlFor="firstname">First Name: </label>
                    <br />
                    <input ref={this.firstname}></input>
                    <br />
                    <label htmlFor="lastname">Last Name: </label>
                    <br />
                    <input ref={this.lastname}></input>
                    <br />
                    <label htmlFor="email">Email: </label>
                    <br />
                    <input ref={this.email}></input>
                    <br />
                    <label htmlFor="username">User Name: </label>
                    <br />
                    <input ref={this.username}></input>
                    <br />
                    <label htmlFor="password" type="password">Password: </label>
                    <br />
                    <input ref={this.password}></input>
                </form>
                <button type="button" onClick={this.addUser}>Submit</button>
            </div>
        )
    }  
    
}

export default Signup_Login