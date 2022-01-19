import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MemeEditor from "./routes/memeEditor";
import Profile from "./routes/profile";
import Overview from "./routes/overview";
import SingleMeme from "./routes/singleMeme";
import axios from "axios";
import store from "./store/index";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Overview />} />
            <Route path="memes" element={<Overview />} />
            <Route path="memes/:memeId" element={<SingleMeme />} />
            <Route path="meme-editor" element={<MemeEditor />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export const API_URL = process.env.REACT_APP_API_URL;
export const apiClient = axios.create({
  baseURL: API_URL,
});
