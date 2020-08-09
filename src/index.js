import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import apClient from "./apollo";

ReactDOM.render(
  <ApolloProvider client={apClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
