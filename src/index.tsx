import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { JorunalApp } from "./JournalApp";
import { initializeApp } from "firebase/app";
import { store } from "./store";
import { Provider } from "react-redux";
const firebaseConfig = {
  apiKey: "AIzaSyATL4iDuC5_m1-h1TvDwaYygzNm9pNMkP4",
  authDomain: "journalist-app-e7e00.firebaseapp.com",
  projectId: "journalist-app-e7e00",
  storageBucket: "journalist-app-e7e00.appspot.com",
  messagingSenderId: "415305657737",
  appId: "1:415305657737:web:8d5a1eaae2514c73464558"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <JorunalApp />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
