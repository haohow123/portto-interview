import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';

import Home from './Home';
import Assets from './Assets';
import Asset from './Asset';
import NoMatch from './NoMatch';

function App(): JSX.Element {
  return (
    <Container>
      <Link to="/">Home</Link>
      <Link to="/assets">Assets</Link>
      <Link to="/asset/123">Asset</Link>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/asset/:id" element={<Asset />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Container>
  );
}

export default App;
