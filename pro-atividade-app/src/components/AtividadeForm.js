import { useEffect, useState } from "react";

const atividadeInicial = {
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: "",
};

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.ativSelecionada.id !== 0) {
      setAtividade(props.ativSelecionada);
    }
  }, [props.ativSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  function atividadeAtual() {
    if (props.ativSelecionada.id !== 0) {
      return props.ativSelecionada;
    }

    return atividadeInicial;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(props.ativSelecionada.id !== 0) {
      props.atualizarAtividade(atividade);
    } else {
      props.addAtividade(atividade);
    }

    setAtividade(atividadeInicial);
  }

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade();

    setAtividade(atividadeInicial);
  };

  return (
    <>
      <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="titulo"
            value={atividade.titulo}
            onChange={inputTextHandler}
            className="form-control"
            id="titulo"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            name="prioridade"
            value={atividade.prioridade}
            onChange={inputTextHandler}
            className="form-select"
          >
            <option defaultValue="0">Selecione...</option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-12 mt-0">
          <label className="form-label">Descrição</label>
          <textarea
            type="text"
            name="descricao"
            value={atividade.descricao}
            onChange={inputTextHandler}
            className="form-control"
            id="descricao"
          />
          <hr />
        </div>        
        <div className="col-12 mt-0">
          {atividade.id === 0 ? (
            <button
              type="submit"
              className="btn btn-outline-secondary"
            >
              <i className="fas fa-plus me-2" />
              Atividade
            </button>
          ) : (
            <>
              <button type="submit" className="btn btn-outline-success me-2">
                <i className="fas fa-plus me-2" />
                Salvar
              </button>
              <button
                onClick={handleCancelar}
                type="button"
                className="btn btn-outline-warning"
              >
                <i className="fas fa-plus me-2" />
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
