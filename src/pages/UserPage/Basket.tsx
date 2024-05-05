import { useContext } from 'react';
import { BasketContext } from '../../contexts/BasketContext';
import BasketItem from './BasketItem';
import { PayDrinks } from '../../services/BasketService';
import DrinkLine from '../../models/DrinkLine';

const Basket = ({
  setDrinks,
  setCoinsInMachine,
}: {
  setDrinks: React.Dispatch<React.SetStateAction<DrinkLine[]>>;
  setCoinsInMachine: React.Dispatch<React.SetStateAction<number>>;
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
      <div className="basket__header">
        <div>Корзина покупок:</div>
        <div>Общая цена: {totalPrice}</div>
      </div>
      <div className="basket__items">
        {drinksInBasket!.map((dl) => (
          <BasketItem key={dl.id} drink={dl} />
        ))}
      </div>
      <button
        onClick={() =>
          PayDrinks(
            drinksInBasket!,
            setDrinksInBasket!,
            droppedCoins!,
            setDroppedCoins!,
            setDrinks,
            setCoinsInMachine,
            totalPrice!
          )
        }
        className="button pay-button"
      >
        Оплатить
      </button>
    </div>
  );
};

export default Basket;
