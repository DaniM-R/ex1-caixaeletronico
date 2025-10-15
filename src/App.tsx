import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import CaixaEletronico from "./components/CaixaEletronico";
import "./App.css"; 

function App() {
  const [user, setUser] = useState<{ name: string; password: string } | null>(null);

  return (
    <div className="app-container display-flex justify-content-center align-items-center">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <CaixaEletronico user={user} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}

export default App;