import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Buergerschaften from "./pages/Buegerschaften";
import CustomShellBar from "./components/ShellBar";
import Home from "./home/Home";
import Landtage from "./pages/Landtage";
import { PUBLIC_URL } from "./constants";
import Parliament from "./pages/Parliament";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <BrowserRouter basename={PUBLIC_URL}>
        <CustomShellBar />
        <div id="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parliament/:parliamentId" element={<Parliament />} />
            <Route path="/parliament/Landtage" element={<Landtage />} />
            <Route
              path={`/parliament/Bürgerschaften`}
              element={<Buergerschaften />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
