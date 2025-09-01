import { useState } from "react";

// src/pages/Home.js
export default function Home() {
  const [stageProcesso1, setStageProcesso1] = useState(1);  // Etapa atual
  const [stageProcesso2, setStageProcesso2] = useState(1);  // Etapa atual
  
  const [processo, setProcesso] = useState(1); // Processo atual

  function handleNextStage() {
    // Exemplo com 3 etapas → quando passa da última, volta para 1
    if (processo === 1) {
      setStageProcesso1((prev) => (prev % 3) + 1);
    } else {
      setStageProcesso2((prev) => (prev % 3) + 1);
    }
  }

  function handleProcessoChange(newProcesso) {
    setProcesso(newProcesso);
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-light border-end p-3" style={{ width: "250px" }}>
        <div className="mb-4 text-center">
          <div
            className="bg-secondary text-white d-flex align-items-center justify-content-center"
            style={{ height: "100px" }}
          >
            Espaço para a Logo da Empresa
          </div>
        </div>

        <div className="d-grid gap-2">
          <button
            onClick={() => handleProcessoChange(1)}
            className={`btn fw-bold ${
              processo === 1 ? "btn-info text-white" : "btn-light border"
            }`}
          >
            Processo 1
          </button>
          <button
            onClick={() => handleProcessoChange(2)}
            className={`btn fw-bold ${
              processo === 2 ? "btn-info text-white" : "btn-light border"
            }`}
          >
            Processo 2
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-grow-1 bg-secondary-subtle p-4">
        {/* Barra de progresso/etapas */}
        <div className="d-flex justify-content-center mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="d-flex align-items-center"
              style={{ minWidth: "60px" }}
            >
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${
                  step === (processo === 1 ? stageProcesso1 : stageProcesso2)
                    ? "bg-primary text-white"
                    : "bg-light border text-dark"
                }`}
                style={{ width: "40px", height: "40px" }}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className="flex-grow-1 bg-light"
                  style={{ height: "4px", margin: "0 10px" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Conteúdo da Etapa */}
        <h2 className="mb-3">
          Processo {processo} - Etapa {processo === 1 ? stageProcesso1 : stageProcesso2}
        </h2>

        <div className="card p-4">
          <div className="mb-3">
            <label className="form-label fw-bold">
              Preencher o Documento da Etapa:
            </label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Digite aqui as informações..."
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Mais Informações abaixo sobre a Etapa
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite mais informações..."
            />
          </div>

          <div className="d-flex justify-content-between">
            <button onClick={handleNextStage} className="btn btn-outline-primary">
              Próxima Etapa →
            </button>
            <button className="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
