import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserWrapper from "./UserWrapper.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserWrapper>
          <App />
        </UserWrapper>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
