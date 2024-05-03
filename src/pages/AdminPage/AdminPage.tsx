import axios from 'axios';
import { FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Drinks from '../../components/Drinks/Drinks';
import CreateDrinkForm from './CreateDrinkForm';
import './AdminPage.module.css';

const AdminPage = () => {
  return (
    <div className="admin-page-wrapper wrapper">
      <CreateDrinkForm />

      <Drinks />
    </div>
  );
};

export default AdminPage;
