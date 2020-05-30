import React from 'react';
import axios from 'axios';

class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expense: [] };
        this.userid = React.createRef();
        this.type = React.createRef();
        this.amount = React.createRef();
    };
    componentDidMount() {
        this.getExpense();
        console.log('componentDidMount');
      }
    
      getExpense = () => {
        // Express uses port 3001 (react uses 3000)
        let url = "http://localhost:3001/users";
        axios.get(url)
          .then(response => this.setState({ total: response.data }));
      };

    render() {
        return (
            <div>
                {this.state.users.amount}
            </div>
        );
    }
}

export default Expense;
