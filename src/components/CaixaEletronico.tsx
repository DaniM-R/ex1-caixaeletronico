import { useEffect, useState } from "react";

interface User {
  name: string;
  password: string;
}

interface HistoricoItem {
  tipo: string;
  valor: number;
  data: string;
}

interface CaixaEletronicoProps {
  user: User;
  onLogout: () => void;
}

export default function CaixaEletronico({ user, onLogout }: CaixaEletronicoProps) {
  const [saldo, setSaldo] = useState<number>(0);
  const [valor, setValor] = useState<number>(0);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem(user.name);
    if (data) {
      const parsed = JSON.parse(data);
      setSaldo(parsed.saldo);
      setHistorico(parsed.historico);
    }
  }, [user.name]);

  const salvarDados = (novoSaldo: number, novoHistorico: HistoricoItem[]) => {
    localStorage.setItem(
      user.name,
      JSON.stringify({ saldo: novoSaldo, historico: novoHistorico })
    );
  };

  const registrarOperacao = (tipo: string, valorOperacao: number, novoSaldo: number) => {
    const dataHora = new Date().toLocaleString();
    const novaOperacao: HistoricoItem = {
      tipo,
      valor: valorOperacao,
      data: dataHora,
    };

    setHistorico((prevHistorico) => {
      const novoHistorico = [novaOperacao, ...prevHistorico];
      salvarDados(novoSaldo, novoHistorico);
      return novoHistorico;
    });
  };

  const handleDepositar = () => {
    if (valor <= 0) return;
    const novoSaldo = saldo + valor;
    setSaldo(novoSaldo);
    registrarOperacao("DEP", valor, novoSaldo);
    setValor(0);
    setErro("");
  };

  const handleSacar = () => {
    if (valor <= 0) return;
    if (valor > saldo) {
      setErro("Saldo insuficiente");
      return;
    }
    const novoSaldo = saldo - valor;
    setSaldo(novoSaldo);
    registrarOperacao("SAQ", valor, novoSaldo);
    setValor(0);
    setErro("");
  };

  return (
    <div className="card shadow p-4" style={{ width: "420px", backgroundColor: "#fff" }}>
      <h3 className="text-center mb-4">Caixa Eletrônico</h3>

      <div className="bg-warning text-white text-center rounded py-2 mb-3">
        <strong>Saldo:</strong> R$ {saldo.toFixed(2)}
      </div>

      <div className="mb-3">
        <label className="form-label">Valor da operação</label>
        <input
          type="number"
          className="form-control"
          placeholder="Digite o valor"
          value={valor || ""}
          onChange={(e) => setValor(Number(e.target.value))}
        />
        {erro && <div className="text-danger small mt-1">{erro}</div>}
      </div>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-warning w-50 me-2" onClick={handleDepositar}>
          Depositar
        </button>
        <button className="btn btn-outline-warning w-50" onClick={handleSacar}>
          Sacar
        </button>
      </div>

      <h5 className="mt-3">Histórico de operações</h5>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <table className="table table-sm align-middle">
          <thead className="table-light">
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {historico.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">
                  Nenhuma operação realizada.
                </td>
              </tr>
            ) : (
              historico.map((h, i) => (
                <tr key={i}>
                  <td>{h.data}</td>
                  <td>{h.tipo}</td>
                  <td>R$ {h.valor.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button className="btn btn-outline-danger w-100 mt-3" onClick={onLogout}>
        Sair
      </button>
    </div>
  );
}