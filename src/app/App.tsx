import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// COMPONENT IMPORTS
import { AboutRooms } from 'pages/AboutRooms/AboutRooms';
import { Rental } from 'pages/Rental/Rental';
import { Profile } from 'pages/Profile/Profile';
import { Footer } from 'widgets/Footer';
import { Main } from 'pages/Main';
import { Error404 } from 'pages/Error404/Error404';
import { About } from 'pages/About/';
import { Contacts } from 'pages/Contacts';
import { Header } from 'widgets/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollToTop } from 'shared/scrollToTop';
import AppProvider from 'features/Contexts/Index';
import { Appoint } from 'widgets/Appoint';
import { jwtDecode } from 'jwt-decode';
import { Auth } from 'features/Auth';
import { Reg } from 'features/Reg';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1
        }
    }
});
const App = () => {
    const user = localStorage.getItem('accessToken');
    if (user) {
        console.log((jwtDecode(user)));
    };
    return (
        <HelmetProvider>
            <AppProvider>
                <QueryClientProvider client={queryClient}>
                    <div className='App'>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Cпотыкач</title>
                            <link rel="canonical" href="http://mysite.com/example" />
                        </Helmet>
                        <Router>
                            <ScrollToTop />
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
                                <Route path='/rooms' element={<AboutRooms />} />
                                {/* <Route path='/week_grid' element={<WeekGrid />}/> */}
                                <Route path='/rental' element={<Rental />} />
                                {user && <Route path='/profile' element={<Profile />} />}

                                <Route path='*' element={<Error404 />} />
                            </Routes>
                            <Footer />
                        </Router>
                        <Appoint />
                        {!user && <Auth />}
                        {!user && <Reg />}
                    </div>
                </QueryClientProvider>
            </AppProvider>
        </HelmetProvider>
    );
};

export default App;