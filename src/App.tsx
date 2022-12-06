import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Page }  from './page';



function App () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Page /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;