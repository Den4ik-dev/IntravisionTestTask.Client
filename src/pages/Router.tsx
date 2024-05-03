import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage/AdminPage';
import UserPage from './UserPage/UserPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/:admin_secret" element={<AdminPage />} />
        <Route path="/" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
