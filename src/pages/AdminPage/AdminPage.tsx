import DrinkLines from './DrinkLines';
import CreateDrinkForm from './CreateDrinkForm';
import './AdminPage.style.css';
import NominalControlPanel from './NominalsControlPanel';
import CoinsInMachine from '../../components/CoinsInMachine/CoinsInMachine';
import { useEffect, useState } from 'react';
import { getCoinsInMachine } from '../../services/MachineWithDrinksService';

const AdminPage = () => {
  const [coinsInMachine, setCoinsInMachine] = useState<number>(0);

  useEffect(() => {
    getCoinsInMachine().then((data) => setCoinsInMachine(data));
  }, []);

  return (
    <div className="admin-page-wrapper wrapper">
      <div className="admin-page__header">
        <CoinsInMachine coins={coinsInMachine} />

        <div className="admin-page__header-body">
          <CreateDrinkForm />

          <NominalControlPanel />
        </div>
      </div>

      <DrinkLines />
    </div>
  );
};

export default AdminPage;
