import DrinkLines from './DrinkLines';
import CreateDrinkForm from './CreateDrinkForm';
import './AdminPage.style.css';
import NominalControlPanel from './NominalsControlPanel';

const AdminPage = () => {
  return (
    <div className="admin-page-wrapper wrapper">
      <div className="admin-page__header">
        <CreateDrinkForm />

        <NominalControlPanel />
      </div>

      <DrinkLines />
    </div>
  );
};

export default AdminPage;
