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
    <div className="drop-coins-form">
      <div style={{ padding: '0 10px 0 0' }}>
        {nominals.map((nominal) => (
          <button
            key={nominal.id}
            disabled={nominal.isBlocked}
            onClick={() => dropCoins(nominal.value)}
            className="coin-button"
          >
            {nominal.value}
          </button>
        ))}
        <div style={{ paddingTop: '10px' }}>
          Вы внесли:{' '}
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
          ) - totalPrice!}{' '}
          монет
        </div>

        <div>Вы потратили {totalPrice} монет</div>
      </div>
    </div>
  );
};

export default DropCoinsForm;
