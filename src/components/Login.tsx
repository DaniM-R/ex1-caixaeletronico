import { useState } from "react";

interface LoginProps {
  onLogin: (user: { name: string; password: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ name, password });
    }
  };

  return (
    <div style={{  width: "400px", backgroundColor: "#fff" }}>
      <h3 className="text-center mb-4">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu login"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Entrar
        </button>
      </form>
    </div>
  );
}
