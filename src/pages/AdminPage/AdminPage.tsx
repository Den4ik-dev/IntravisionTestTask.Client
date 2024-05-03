import DrinkLines from './DrinksLines';
import CreateDrinkForm from './CreateDrinkForm';
import './AdminPage.style.css';

const AdminPage = () => {
  return (
    <div className="admin-page-wrapper wrapper">
      <CreateDrinkForm />

      <DrinkLines />
    </div>
  );
};

export default AdminPage;
