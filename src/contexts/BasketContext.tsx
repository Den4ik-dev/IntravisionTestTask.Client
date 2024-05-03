import { ReactNode, createContext, useEffect, useState } from 'react';
import DrinkLine from '../models/DrinkLine';

type StateType = {
  drinksInBasket?: DrinkLine[];
  setDrinksInBasket?: React.Dispatch<React.SetStateAction<DrinkLine[]>>;
  droppedCoins?: number[];
  setDroppedCoins?: React.Dispatch<React.SetStateAction<number[]>>;
  totalPrice?: number;
  setTotalPrice?: React.Dispatch<React.SetStateAction<number>>;
};

export const BasketContext = createContext<StateType>({});

export const BasketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [drinksInBasket, setDrinksInBasket] = useState<DrinkLine[]>([]);
  const [droppedCoins, setDroppedCoins] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const result = drinksInBasket.reduce(
      (tp, drink) => tp + drink.price * drink.drinksQuantityInBasket,
      0
    );
    setTotalPrice(result);
  }, [drinksInBasket]);

  useEffect(
    () => console.log(`total price in basket: ${totalPrice}`),
    [totalPrice]
  );

  return (
    <BasketContext.Provider
      value={{
        drinksInBasket,
        setDrinksInBasket,
        droppedCoins,
        setDroppedCoins,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
