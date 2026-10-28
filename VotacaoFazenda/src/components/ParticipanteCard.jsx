function ParticipanteCard({ participante, onVotar }) {
  return (
    <article className={participante.naRoca ? 'card card-roca' : 'card'}>
      {participante.naRoca && <span className="selo-roca">Na roça</span>}

      <img src={participante.foto} alt={participante.nome} />
      <h3>{participante.nome}</h3>

      {onVotar && (
        <button
          className="botao botao-principal"
          onClick={() => onVotar(participante)}
        >
          Votar para eliminar
        </button>
      )}
    </article>
  );
}

export default ParticipanteCard;
