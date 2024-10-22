import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// COMPONENT IMPORTS
import { Appoint } from 'pages/Appoint/Appoint';
import { Rental } from 'pages/Rental/Rental';
import { Profile } from 'pages/Profile/Profile';
import { Footer } from 'widgets/Footer';
import { Main } from 'pages/Main';
import { Error404 } from 'pages/Error404/Error404';
import { About } from 'pages/About/';
import { Contacts } from 'pages/Contacts';
import { Header } from 'widgets/Header';

const App = () => {
    return (
        <HelmetProvider>
            <div className='App'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Page title</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <Router>
                    <Header />
                    <Routes>
                        <Route
                            path='/'
                            element={<Main />}
                        />
                        <Route
                            path='/about'
                            element={<About />}
                        />
                        <Route
                            path='/contacts'
                            element={<Contacts />}
                        />
                        {/* COMPONENT ROUTES */}
                        <Route path='/appoint' element={<Appoint />}/>
                        <Route path='/rental' element={<Rental />}/>
                        <Route path='/profile' element={<Profile />}/>
                        <Route path='*' element={<Error404 />} />
                    </Routes>
                    <Footer />
                </Router>
            </div>
        </HelmetProvider>
    );
};

export default App;