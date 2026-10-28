import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(obterVotos());

  // Valores derivados do estado: calculados a cada renderização
  const total = calcularTotalVotos(votos);
  const placar = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Tem certeza que deseja zerar toda a votação?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <h1>Parcial da eliminação</h1>
      <p className="total-votos">
        <strong>{total}</strong> votos computados
      </p>

      {total === 0 ? (
        <div className="sem-votos">
          <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">
            Ir para a votação
          </Link>
        </div>
      ) : (
        <>
          <ul className="placar">
            {placar.map((p, indice) => (
              <li
                key={p.id}
                className={indice === 0 ? 'placar-item placar-lider' : 'placar-item'}
              >
                <img src={p.foto} alt={p.nome} />

                <div className="placar-info">
                  <h3>
                    {p.nome}
                    {indice === 0 && <span className="selo-lider">Sairia hoje</span>}
                  </h3>

                  <div className="barra">
                    <div
                      className="barra-preenchida"
                      style={{ width: `${p.percentual}%` }}
                    />
                  </div>

                  <p className="placar-dados">
                    {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                    {' '}({p.votos} {p.votos === 1 ? 'voto' : 'votos'})
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button className="botao botao-zerar" onClick={handleZerar}>
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;
