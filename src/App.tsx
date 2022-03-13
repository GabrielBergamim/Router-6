import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PersistLogin } from './components/PersistLogin';
import { RequireAuth } from './components/RequireAuth';
import { Admin } from './pages/Admin';
import { Editor } from './pages/Editor';
import { Home } from './pages/Home';
import { LinkPage } from './pages/LinkPage';
import { Login } from './pages/Login';
import { Lounge } from './pages/Lounge';
import { Missing } from './pages/Missing';
import { Register } from './pages/Register';
import { Unauthorized } from './pages/Unauthorized';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}