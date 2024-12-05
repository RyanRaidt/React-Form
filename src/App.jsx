import "./App.css";
import { useState } from "react";
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <h1>React Forms</h1>
      <Authenticate token={token} />
      <SignUpForm setToken={setToken} />
    </div>
  );
}
