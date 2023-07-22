import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./home/Home";
import React from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div className="App">
        <Home></Home>
      </div>
    </QueryClientProvider>
  );
}

export default App;
