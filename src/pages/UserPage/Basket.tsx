import { useContext } from 'react';
import { BasketContext } from '../../contexts/BasketContext';
import BasketItem from './BasketItem';
import { PayDrinks } from '../../services/BasketService';
import Drink from '../../models/Drink';

const Basket = ({
  setDrinks,
}: {
  setDrinks: React.Dispatch<React.SetStateAction<Drink[]>>;
}) => {
  const {
    drinksInBasket,
    setDrinksInBasket,
    droppedCoins,
    setDroppedCoins,
    totalPrice,
  } = useContext(BasketContext);

  return (
    <div className="basket">
      <div>Корзина покупок:</div>
      <div>Общая цена: {totalPrice}</div>
      <div className="basket__items">
        {drinksInBasket!.map((dl) => (
          <BasketItem key={dl.id} drink={dl} />
        ))}
      </div>
      <div>
        <button
          onClick={() =>
            PayDrinks(
              drinksInBasket!,
              setDrinksInBasket!,
              droppedCoins!,
              setDroppedCoins!,
              setDrinks
            )
          }
        >
          Оплатить
        </button>
      </div>
    </div>
  );
};

export default Basket;
