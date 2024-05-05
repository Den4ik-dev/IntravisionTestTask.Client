import { useEffect, useState } from 'react';
import { BasketContextProvider } from '../../contexts/BasketContext';
import DropCoinsForm from './DropCoinsForm';
import MachineWithDrinks from './MachineWithDrinks';
import Basket from './Basket';
import './UserPage.style.css';
import DrinkLine from '../../models/DrinkLine';
import { getCoinsInMachine } from '../../services/MachineWithDrinksService';
import CoinsInMachine from '../../components/CoinsInMachine/CoinsInMachine';

const UserPage = () => {
  /// TODO: PAGINATION
  const [drinks, setDrinks] = useState<DrinkLine[]>([]);
  const [coinsInMachine, setCoinsInMachine] = useState<number>(0);

  useEffect(() => {
    getCoinsInMachine().then((data) => setCoinsInMachine(data));
  }, []);

  return (
    <BasketContextProvider>
      <div className="user-page-wrapper wrapper">
        <div className="user-page-wrapper__body">
          <div className="user-page-wrapper__left">
            <CoinsInMachine coins={coinsInMachine} />

            <MachineWithDrinks drinks={drinks} setDrinks={setDrinks} />

            <DropCoinsForm />
          </div>
          <Basket setDrinks={setDrinks} setCoinsInMachine={setCoinsInMachine} />
        </div>
      </div>
    </BasketContextProvider>
  );
};

export default UserPage;
