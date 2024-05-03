import { useState } from 'react';
import { BasketContextProvider } from '../../contexts/BasketContext';
import DropCoinsForm from './DropCoinsForm';
import MachineWithDrinks from './MachineWithDrinks';
import Basket from './Basket';
import './UserPage.style.css';
import DrinkLine from '../../models/DrinkLine';

const UserPage = () => {
  /// TODO: PAGINATION
  const [drinks, setDrinks] = useState<DrinkLine[]>([]);

  return (
    <BasketContextProvider>
      <div className="user-page-wrapper wrapper">
        <div className="user-page-wrapper__body">
          <div className="user-page-wrapper__left">
            <MachineWithDrinks drinks={drinks} setDrinks={setDrinks} />

            <DropCoinsForm />
          </div>
          <Basket setDrinks={setDrinks} />
        </div>
      </div>
    </BasketContextProvider>
  );
};

export default UserPage;
