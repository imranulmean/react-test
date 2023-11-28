import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
