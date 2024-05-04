import { useEffect, useState } from 'react';
import Nominal from '../../models/Nominal';
import {
  getAllNominals,
  switchBlockNominalRequest,
} from '../../services/NominalsService';
import { useParams } from 'react-router-dom';

const NominalControlPanel = () => {
  const { admin_secret } = useParams();
  const [nominals, setNominals] = useState<Nominal[]>([]);

  useEffect(() => {
    getAllNominals().then((data) => setNominals(data));
  }, []);

  const switchBlockNominal = async (id: number) => {
    // change block nominal
    // send request POST api/nominals/{nominal_id}/isBlocked
    await switchBlockNominalRequest(id, admin_secret!);
    // call setNominals
    const newNominals = nominals.map((nominal) =>
      nominal.id == id ? { ...nominal, isBlocked: !nominal.isBlocked } : nominal
    );

    setNominals(newNominals);
  };

  return (
    <div>
      <div>Управление блокировкой номиналов</div>
      <div style={{ display: 'flex' }}>
        {nominals.map((nominal) => (
          <div key={nominal.id}>
            <div>{nominal.value}</div>
            <div>{nominal.isBlocked ? 'Заблокирован' : 'Разблокирован'}</div>
            <div>
              <input
                type="checkbox"
                checked={!nominal.isBlocked}
                onChange={() => switchBlockNominal(nominal.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NominalControlPanel;
