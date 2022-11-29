import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, styled } from '@mui/material';

import Home from './Home';
import Assets from './Assets';
import Asset from './Asset';
import NoMatch from './NoMatch';

const Links = styled(`div`)(({ theme }) => ({
  display: `flex`,
  gap: theme.spacing(2),
}));

function App(): JSX.Element {
  return (
    <Container maxWidth="md">
      <Links>
        <Link to="/">Home</Link>
        <Link to="/assets">Assets</Link>
      </Links>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/asset/:token/:contract" element={<Asset />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Container>
  );
}

export default App;
