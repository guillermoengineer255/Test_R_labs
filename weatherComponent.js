import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class weatherComponent extends Component {
  constructor() {
    super();
    this.state = {
      response: null,
      url: "http://127.0.0.1:3000"
    };
  }

  componentDidMount() {
    const { url } = this.state;
    const socket = socketIOClient(url);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              Probando la Aplicacion/ Guillermo Herrera : {response} 
            </p>
          : <p>Cargando...</p>}
      </div>
    );
  }
}

export default weatherComponent;