import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import {
  listarNaRoca,
  listarForaDaRoca,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [totalVotosSessao, setTotalVotosSessao] = useState(0);

  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setTotalVotosSessao(totalVotosSessao + 1);
  }

  return (
    <main className="pagina">
      <h1>Quem você quer eliminar?</h1>
      <p className="subtitulo">Cada clique conta um voto para tirar o peão da fazenda.</p>

      {ultimoVoto !== null && (
        <p className="aviso-voto" role="status">
          <span>
            Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>.
            Você já votou {totalVotosSessao} {totalVotosSessao === 1 ? 'vez' : 'vezes'}.
          </span>
          <Link to="/resultado">Ver resultado</Link>
        </p>
      )}

      <section className="grade-roca">
        {naRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </section>

      <section className="demais">
        <h2>Demais peões</h2>
        <p className="subtitulo">Fora da roça nesta semana, não podem receber votos.</p>

        <div className="grade-demais">
          {foraDaRoca.map((p) => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
