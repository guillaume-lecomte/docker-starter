import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.callApi()
      .then((res) => {
        this.setState({
          products: res,
        });
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("http://localhost:3001/products");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        {products.length === 0 ? (
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        ) : (
          <ul>
            {products.map((p) => (
              <li key={p.id}>
                {p.title} / {p.infos}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
