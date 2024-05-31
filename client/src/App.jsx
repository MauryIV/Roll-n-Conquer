import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const location = useLocation();

  return (
    <ApolloProvider client={client}>
      <Header />
      <main className="main-container">
        <div className="content-container">
          <div className="main-content">
            <Outlet />
            {location.pathname !== "/" && (
              <div className="card">
                <Leaderboard />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </ApolloProvider>
  );
};

export default App;
