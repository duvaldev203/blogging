import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import NotFound from "./NotFound"

import { connect, useSelector } from 'react-redux';
import { ReduxProps } from '../redux/configureStore';
import SignIn from '../pages/Auth/SignIn';
import Home from '../pages/Home';
import SignUp from '../pages/Auth/SignUp';
import ResetPassword from '../pages/ResetPassword';
import Articles from '../pages/Articles/Articles';
import DisplayArticle from '../pages/Articles/DisplayArticle';

interface AppSwitchProps {
  isLoggedIn: boolean;
}

const AppSwitch: React.FC<AppSwitchProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  // console.log("Appswitch State :\n", state);
  // console.log('isLoggedIn ' + props.isLoggedIn);
  // console.log('state loggedIn ' + state.loggedIn);

  useEffect(() => {
    console.log('UseEffect Appswitch')
  });

  if (
    (props.isLoggedIn && props.isLoggedIn === true) &&
    (state.loggedIn && state.loggedIn === true)
  ) {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/signin" element={<Navigate to={'/'} />} />
        <Route path="/signup" element={<Navigate to={'/'} />} />
        <Route path="/article/:id" element={<DisplayArticle />} />
        <Route path="/post-article" element={<Articles />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/signup/signin" element={<SignIn />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/article/:id" element={<DisplayArticle />} />
        <Route path="/post-article" element={<Navigate to='/signin' />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    );
  }
};

function mapStateToProps(state: ReduxProps): ReduxProps {
  return {
    article: state.article, 
    user: state.user,
    environment: state.environment,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(AppSwitch);


