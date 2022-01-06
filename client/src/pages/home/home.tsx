import React from 'react';
import Testimonials from './components/testimonials';
import FAQ from './components/FAQ';
import Features from './components/features';
import Hero from './components/hero';
import Monitors from './components/monitors';
import Pricing from './components/pricing';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Monitors />
            <Features />
            <Pricing />
            <Testimonials />
            <FAQ />
            <Footer />
        </>
    )
}

export default HomePage;