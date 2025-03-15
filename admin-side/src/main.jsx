import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.querySelector("#page-top")).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);
