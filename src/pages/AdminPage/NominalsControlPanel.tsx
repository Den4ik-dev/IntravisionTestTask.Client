import { useEffect, useState } from 'react';
import Nominal from '../../models/Nominal';
import {
  getAllNominals,
  switchBlockNominalRequest,
} from '../../services/NominalsService';
import { useParams } from 'react-router-dom';
import { Switch } from '@mui/material';
import NominalControl from './NominalControl';

const NominalControlPanel = () => {
  const { admin_secret } = useParams();
  const [nominals, setNominals] = useState<Nominal[]>([]);

  useEffect(() => {
    getAllNominals().then((data) => setNominals(data));
  }, []);

  const switchBlockNominal = async (id: number) => {
    await switchBlockNominalRequest(id, admin_secret!);
    const newNominals = nominals.map((nominal) =>
      nominal.id == id ? { ...nominal, isBlocked: !nominal.isBlocked } : nominal
    );

    setNominals(newNominals);
  };

  return (
    <div className="nominal-control-panel">
      <div className="nominal-control-panel__title">
        Управление блокировкой номиналов монет
      </div>
      <div style={{ display: 'flex' }}>
        {nominals.map((nominal) => (
          <NominalControl
            key={nominal.id}
            {...nominal}
            switchBlockNominal={switchBlockNominal}
          />
        ))}
      </div>
    </div>
  );
};

export default NominalControlPanel;
