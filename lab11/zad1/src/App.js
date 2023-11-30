import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link, useLocation, Outlet } from "react-router-dom";

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Services = () => <h2>Services</h2>;
const Contact = () => <h2>Contact</h2>;
const ContactUs = () => <h2>ContactUS</h2>;
const ContactPl = () => <h2>ContactPl</h2>;
const ContactDe = () => <h2>ContactDe</h2>;

 function Whoops404() {
    let location = useLocation();
    console.log(location);
    return (
        <div>
            <h1>
                Nie znaleziono elementu:  {location.pathname}
            </h1>
        </div>
    );
}


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact/us" element={<ContactUs />} />
                <Route path="/contact/pl" element={<ContactPl />} />
                <Route path="/contact/de" element={<ContactDe />} />
                <Route path="*" element={<Whoops404 />} />
            </Routes>
        </Router>
    );
}

export default App;
