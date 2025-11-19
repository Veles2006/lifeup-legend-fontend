import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Players from './pages/Players';
import NotFound from './pages/NotFound';
import Layout from './layouts/MainLayout';
import Items from './pages/Items';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="players" element={<Players />} />
                    <Route path="items" element={<Items />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
