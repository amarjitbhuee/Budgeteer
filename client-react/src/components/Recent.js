import React from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import '../transaction.min.css';

class Recent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData = () => {
    // Express uses port 3001 (react uses 3000)
    let url = "http://localhost:3001/transactions";
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }));
  };


  deleteTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.delete(url)
      .then(response => {
        this.getData();
        alert('Your Transaction has been deleted!');
        window.location.reload();
      })
  };

  render() {
    return (
      <div className="form">
        <h3>Recent Transactions:</h3>
        {/* <TransactionForm /> */}
      </div>
    );
  }
}

export default Recent;