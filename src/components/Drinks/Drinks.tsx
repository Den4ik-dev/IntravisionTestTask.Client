import { useEffect, useState } from 'react';
import Drink from '../../models/Drink';
import api from '../../services/AxiosService';
import DrinkMiniCard from '../DrinkMiniCard/DrinkMiniCard';
import DrinksItem from './DrinksItem';
import './Drinks.module.css';

const Drinks = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    api.get('api/drinkLines?page=1').then((response) => {
      let data = response.data as Drink[];
      console.log(data);

      setDrinks([...drinks, ...data]);
    });
  }, []);

  return (
    <div className="drinks">
      {drinks.map((drink) => (
        <DrinksItem key={drink.id} {...drink} />
      ))}
    </div>
  );
};

export default Drinks;
