import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import PageIllustration from '../components/PageIllustration';
import { AuthControllerApi, RoleResponse, UserRequest } from '../generated';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxProps } from '../redux/configureStore';
import { Alert, CircularProgress, Slide } from '@mui/material';

const SignUp: React.FC = () => {
  const state = useSelector((state: ReduxProps) => state);
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [formValues, setFormValues] = useState<UserRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    roles: [
      {
        id: 2
      }
    ]
  });
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  let role: RoleResponse = {};

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setError(false);
    setErrMsg('');
    const { name, value } = e.target;
    if (name === 'roles') {
      const roleId: number = parseInt(value)
      setFormValues((prevValues) => ({
        ...prevValues,
        roles: [{ id: roleId }],
      }));
      role.id = roleId;
      setRoles([role]);
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }

  };

  const handleRegister = (e: FormEvent) => {
    // console.log('formValues', formValues)
    // console.log("User Rules ", roles)
    e.preventDefault();
    const authApi = new AuthControllerApi(state.environment);
    const apiParams: UserRequest = formValues;
    apiParams.roles = roles;
    console.log("apiParams", apiParams)
    setLoading(true);

    authApi.register(apiParams)
      .then((resp) => {
        setLoading(false)
        setSuccess(true);
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
        if (resp && resp.data) {
          console.log(resp.data)
        }
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.status == 403) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/signin');
          }, 3000);
        }
        if (err.response.status == 401) {
          setError(true);
          setErrMsg("Une erreur s'est produite veillez verifier vos champs")
        }
        console.log(err.response)
      })
      .finally(() => {
        setLoading(false)
        setTimeout(() => {
          setSuccess(false);
        }, 3000)
      })
  }


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
        {success &&
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Alert
              severity="success"
              sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                display: "flex",
                zIndex: 9999,
              }}>
              Inscription reussi!!! <br /> Vous allez etre rediriger vers la page de connexion.
            </Alert>
          </Slide>
        }

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Inscrivez-vous gratuitement dès aujourd'hui !.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">S'inscrire avec Google</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="dark:text-gray-400">Ou inscrivez vous par email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div>
                <form onSubmit={handleRegister}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="firstName">Nom <span className="text-red-600">*</span></label>
                      <input type="text" id="firstName" name='firstName' value={formValues.firstName} className="form-input w-full dark:text-gray-300" placeholder="John" required onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="lastName">Prenom <span className="text-red-600">*</span></label>
                      <input id="lastName" type="text" name='lastName' value={formValues.lastName} className="form-input w-full dark:text-gray-300" placeholder="Doeh" required onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="phone">Numero de telephone <span className="text-red-600">*</span></label>
                      <input id="phone" type="text" name='phone' value={formValues.phone} className="form-input w-full dark:text-gray-300" placeholder="+237671234567" required onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" name='email' value={formValues.email} className="form-input w-full dark:text-gray-300" placeholder="exemple@exemple.com" required onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="password">Mot de passe <span className="text-red-600">*</span></label>
                      <input id="password" type="password" name='password' value={formValues.password} className="form-input w-full dark:text-gray-300" placeholder="(au moins 8 caracteres)" required onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="confirm">Confirmer le mot de passe <span className="text-red-600">*</span></label>
                      <input id="password" type="password" name='confirm' value={confirm} className="form-input w-full dark:text-gray-300" placeholder="(au moins 8 caracteres)" required onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block dark:text-gray-300 text-sm font-medium mb-1" htmlFor="roles">Vous etes <span className="text-red-600">*</span></label>
                      <select className='form-input w-full dark:text-gray-300' name='roles' onChange={handleInputChange}>
                        <option value='2'>Membre</option>
                        <option value='1'>Bloggeur</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center">
                    I agree to be contacted by Open PRO about this offer as per the Open PRO <Link to="#" className="underline dark:text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <span className='text-red-600 mb-2 px-3'>{errMsg}</span>
                      <button
                        className="btn text-white bg-purple-600 hover:bg-purple-700 w-full space-x-5">
                        {loading &&
                          <CircularProgress
                            size={30}
                            color='inherit'
                            disableShrink />}
                        <span>S'inscrire</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 dark:text-gray-400 text-center mt-6">
                  Vous avez deja un compte? <Link to="/signin" className="text-purple-600 hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 ease-in-out">Connection</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* <Banner /> */}

    </div>
  );
}

export default SignUp;