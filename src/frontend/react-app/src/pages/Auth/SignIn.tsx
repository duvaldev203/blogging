import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import PageIllustration from '../../components/PageIllustration';
import Banner from '../../components/Banner';
import { Eye, EyeOff, Mail } from 'react-feather';
import { connect, useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/actions/authActions';
import { CircularProgress } from '@mui/material';
import { ReduxProps } from '../../redux/configureStore';
import { AuthControllerApi, SignInRequest, UserResponse } from '../../generated';
import { IS_LOGGED_LOCAL_STORAGE_KEY, TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '../../Constants/LOCAL_STORAGE';
import { setTokenAction } from '../../redux/Actions/TokenAction';
import { setIsLOggedAction } from '../../redux/Actions/LoggedInAction';

interface SignInProps { }

const SignIn: React.FC<SignInProps> = () => {
  const state = useSelector((state: ReduxProps) => state);
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [access_token, setAccessToken] = useState('');
  const [store_user, setAccessUser] = useState<UserResponse>({});

  const isError: boolean = !email || !password;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log("Sign In UseEffect");
    if (isLoggedIn === true) {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, access_token);
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(store_user));
      localStorage.setItem(IS_LOGGED_LOCAL_STORAGE_KEY, '' + isLoggedIn);
      dispatch(setTokenAction(access_token));
      dispatch(setIsLOggedAction(true));
      console.log("IS Log in UseEffect");
    }
  }, [isLoggedIn, dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // setError("");

    const authApi = new AuthControllerApi(state.environment);

    const apiParams: SignInRequest = {
      email: email,
      password: password,
    }

    setLoading(true)
    setError("");

    authApi.login(apiParams)
      .then((response) => {

        setLoading(false)
        if (response && response.data) {

          if (response) {
            console.log(response);
            const token_r = response?.data?.token
            const user_r = response?.data?.user
            setAccessToken(token_r!)
            setAccessUser(user_r!)
            setIsLoggedIn(true)

          } else if (!response) {
            setIsLoggedIn(false)
          }
        }

      })
      .catch((error) => {
        console.log(error)
        setIsLoggedIn(false);
        setError(error.response.data.message)
        if (error.response.status === 404) {
          console.log("Error : ", error.toLocaleUpperCase)
        } else {
          setError("Email ou mot de passe incorrect veillez reessayer !!!")
        }
        // setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false)
      });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h2">Heureux de vous revoir.
                  <br />  Organisez, suivez et partagez votre contenu en un seul endroit.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-emerald-600 hover:bg-emerald-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Se connecter avec Google</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="dark:text-gray-400">Ou, se connecter par email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input
                        id="email"
                        name='email'
                        value={email}
                        onChange={handleEmailChange}
                        type="email"
                        className="form-input w-full dark:text-gray-300"
                        placeholder="exemple@exemple.com"
                        required />
                    </div>
                    <Mail className='w-5 h-5 -ml-10 mt-10' />
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="password">Mot de Passe</label>
                      <input
                        id="password"
                        name='password'
                        value={password}
                        onChange={handlePasswordChange}
                        type={showPassword ? 'text' : 'password'}
                        className="form-input w-full dark:text-gray-300"
                        placeholder="Password (Au moins 10 caracteres)"
                        required />
                    </div>
                    <span
                      className="cursor-pointer -ml-10 mt-10"
                      onClick={handlePasswordVisibilityChange}
                    >
                      {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </span>
                  </div>
                  {/* <span className="w-full text-red-600 px-3 mb-4">E-mail ou mot de passse invalide</span> */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-end">
                        {/* <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="dark:text-gray-400 ml-2">Keep me signed in</span>
                        </label> */}
                        <Link to="/reset-password" className="text-purple-600 dark:hover:text-gray-200 transition duration-150 ease-in-out">Mot de passe oublie?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <span className='text-red-600 mb-2 px-3 text-sm'>{error}</span>
                      <button
                        className={`btn text-white bg-purple-600 hover:bg-purple-700 w-full space-x-5 ${isError && 'cursor-not-allowed hover:bg-gray-400'}`}
                        type='submit'>
                        {loading &&
                          <CircularProgress
                            size={30}
                            color='inherit'
                            disableShrink />}
                        <span>Se Connecter</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="dark:text-gray-400 text-center mt-6">
                  Vous n'avez pas de compte? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">S'inscrire</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>
  );
}

function mapStateToProps(state: ReduxProps): ReduxProps {
  return {
    user: state.user,
    environment: state.environment,
    loggedIn: state.loggedIn,
    access_token: state.access_token,
  };
}
export default connect(mapStateToProps)(SignIn)
