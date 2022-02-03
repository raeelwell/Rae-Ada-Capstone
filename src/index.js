import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Market from "./routes/Market";
import Woods from "./routes/Woods";

const rootElement = document.getElementById("root");
render(
  <App>
    {/* <Routes>
      <Route path="/" element={<App />} />
        <Route path="market" element={<Market />} />
        <Route path="woods" element={<Woods />} />
    </Routes> */}
  </App>,
  rootElement
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { render } from "react-dom";
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();
