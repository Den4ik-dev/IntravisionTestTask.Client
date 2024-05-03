import Drink from '../../models/Drink';

const DrinksItem = ({
  id,
  name,
  imagePath,
  price,
  drinksQuantityInMachine,
}: Drink) => {
  return (
    <div>
      <div style={{ userSelect: 'none' }}>
        <img src={imagePath} alt={name} />
      </div>
      <div>{name}</div>
      <div>Цена: {price}</div>
      <div>Кол-во в автомате: {drinksQuantityInMachine}</div>
    </div>
  );
};

export default DrinksItem;
