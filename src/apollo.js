import ApolloClient from "apollo-boost";

const apClient = new ApolloClient({
  uri: "http://localhost:4000/",
}); // 만들어둔 Graphql API 서버

export default apClient;
