import { useEffect, useState } from 'react';
import {
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import { IS_LOGGED_LOCAL_STORAGE_KEY } from './Constants/LOCAL_STORAGE';
import { CircularProgress } from '@mui/material';
import AppSwitch from './AppSwitch/AppSwitch';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const preloader = document.getElementById('preloader');

  const isLoggedIn: boolean = Boolean(localStorage.getItem(IS_LOGGED_LOCAL_STORAGE_KEY));

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }



  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
    setTimeout(() => setLoading(false), 1000)
  });



  useEffect(() => {
    document.querySelector('html')!.style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html')!.style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return loading ? (
    <div className="m-[20%] px-[25%]">
      <CircularProgress className='content-center'/>
    </div>
  ) : (
    <AppSwitch isLoggedIn={isLoggedIn} />
  );
}

export default App;
