import { useContext, useEffect, useState } from 'react';
import { BasketContext } from '../../contexts/BasketContext';
import Nominal from '../../models/Nominal';
import { getAllNominals } from '../../services/NominalsService';

const DropCoinsForm = () => {
  const [nominals, setNominals] = useState<Nominal[]>([]);

  const { setDroppedCoins, droppedCoins, totalPrice } =
    useContext(BasketContext);

  useEffect(() => {
    getAllNominals().then((data) => setNominals(data));
  }, []);

  const dropCoins = (nominal: number) => {
    setDroppedCoins!((prev) => [...prev, nominal]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ padding: '0 10px 0 0' }}>
        {nominals.map((nominal) => (
          <button
            key={nominal.id}
            disabled={nominal.isBlocked}
            onClick={() => dropCoins(nominal.value)}
          >
            {nominal.value}
          </button>
        ))}
        <div>
          Вы закинули:{' '}
          {droppedCoins!.reduce((droppedCoins, coin) => droppedCoins + coin, 0)}{' '}
          монет
        </div>
      </div>

      <div>
        <div>
          Осталось{' '}
          {droppedCoins!.reduce(
            (droppedCoins, coin) => droppedCoins + coin,
            0
          ) - totalPrice!}
        </div>

        <div>Вы потратили {totalPrice}</div>
      </div>
    </div>
  );
};

export default DropCoinsForm;
