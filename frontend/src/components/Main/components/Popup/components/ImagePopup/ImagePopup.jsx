export default function ImagePopup(props) {
  const { card } = props;

  return (
    <>
      <img
        className="popup__image"
        src={card.link}
        alt={`Imagem de ${card.name}`}
      />
      <p className="popup__caption">{card.name}</p>
    </>
  );
}
