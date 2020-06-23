import React from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import '../../transaction.min.css';

class JulStatementExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  };

  componentDidMount() {
    this.getExpense();
  };

  getExpense = () => {
    let url = "http://localhost:3001/transactions/expenseJuly";
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }));
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr className="rowHead">
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map(p => (
              <tr key={p.transactionid}>
                <td>{p.description}</td>
                <td>${p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default JulStatementExpense; 