// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/product/products';
// import About from './components/About';
// import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Products />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
