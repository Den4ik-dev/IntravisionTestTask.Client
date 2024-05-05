import DrinkLines from './DrinkLines';
import CreateDrinkForm from './CreateDrinkForm';
import './AdminPage.style.css';
import NominalControlPanel from './NominalsControlPanel';
import CoinsInMachine from '../../components/CoinsInMachine/CoinsInMachine';
import { useEffect, useState } from 'react';
import { getCoinsInMachine } from '../../services/MachineWithDrinksService';
import { getIsAdmin } from '../../services/AdminService';
import { useParams } from 'react-router-dom';

const AdminPage = () => {
  const [coinsInMachine, setCoinsInMachine] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { admin_secret } = useParams();

  useEffect(() => {
    getIsAdmin(admin_secret!).then(() => setIsAdmin(true));

    getCoinsInMachine().then((data) => setCoinsInMachine(data));
  }, []);

  return isAdmin ? (
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
  ) : (
    <div style={{ padding: '10px' }}>Вы не админ</div>
  );
};

export default AdminPage;
