import React from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import '../../transaction.min.css';

class FebStatementSavings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  };

  componentDidMount() {
    this.getSavings();
  };

  getSavings = () => {
    let url = "http://localhost:3001/transactions/savingsFebruary";
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
                                <td className='tdata'>{p.description}</td>
                                <td className='tdata'>${p.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default FebStatementSavings; 