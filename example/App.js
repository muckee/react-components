import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Link,
} from 'react-router-dom';

import Web3Context from './components/Web3/Web3Context/Web3Context';
import ProtectedRoute from './components/Web3/ProtectedRoute/ProtectedRoute';
import NFTEditor from './components/Tools/NFT/Editor/Editor';
import NFTGenerator from './components/Tools/NFT/Generator/Generator';

import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Tools from './pages/Tools/Tools';
import UserProvider from './store/User/UserProvider';
import Privacy from './pages/Privacy/Privacy';

const App = () => {

  const SCOPES = process.env.REACT_APP_SCOPES ? process.env.REACT_APP_SCOPES.split(',') : [];

  return <Web3Context>
  <UserProvider>
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Layout />}>

        <Route index element={<Navigate to='/dashboard' />} />

        <Route path="dashboard" element={<Dashboard key={document.location.href} />} />

        <Route path="tools" element={<ProtectedRoute
          key={document.location.href}
          redirectPath='/dashboard'
          hasPermission={SCOPES.find(s => s === 'USER')}
        >
          <Tools />
        </ProtectedRoute>}>
{/* 
          <Route path="" element={<ProtectedRoute
            key={document.location.href}
            redirectPath='/dashboard'
            hasPermission={SCOPES.find(s => s === 'USER')}
          >
            <Menu items={[
              <ListItem>
                <Link to='generator'>
                  <Button className={`${menuIsVisible ? '' : ' ' + styles.hidden}`}>NFT Generator</Button>
                </Link>
              </ListItem>,
              <ListItem>
                <Link to='editor'>
                    <Button className={`${menuIsVisible ? '' : ' ' + styles.hidden}`}>NFT Editor</Button>
                </Link>
              </ListItem>,
            ]} />

          </ProtectedRoute>} /> */}

          <Route path="generator" element={<ProtectedRoute
            key={document.location.href}
            redirectPath='/dashboard'
            hasPermission={SCOPES.find(s => s === 'USER')}
          >
            <NFTGenerator />
          </ProtectedRoute>} />

          <Route path="editor" element={<ProtectedRoute
            key={document.location.href}
            redirectPath='/dashboard'
            hasPermission={SCOPES.find(s => s === 'USER')}
          >
            <NFTEditor />
          </ProtectedRoute>} />

        </Route>

        {/* 404 */}
        <Route path="*" element={<NoPage key={document.location.href} />} />

        <Route path="privacy" element={<Privacy key={document.location.href} />} />

      </Route>

    </Routes>

  </BrowserRouter>
  </UserProvider>
  </Web3Context>;
};

export default App;
