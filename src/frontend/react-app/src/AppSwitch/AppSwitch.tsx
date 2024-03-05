import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import NotFound from "./NotFound"

import { connect, useSelector } from 'react-redux';
import { ReduxProps } from '../redux/configureStore';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';

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
        <Route path="/signin" element={<Navigate to={'/'} />} />
        <Route path="/signup" element={<Navigate to={'/'} />} />
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
        <Route path="*" element={<NotFound />} />

      </Routes>
    );
  }
};

function mapStateToProps(state: ReduxProps): ReduxProps {
  return {
    user: state.user,
    environment: state.environment,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(AppSwitch);


