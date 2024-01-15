import React, { useEffect }            from 'react';
import { UserContext }  from '../components/user-context';
import Card             from '../components/card';
import validate         from '../components/validate';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi }         from 'gapi-script';

function Login() {
    const clientID="1033933096960-p1224c1t9hpd07brtjrqo9fe4b775da9.apps.googleusercontent.com";
    
    const ctx                               = React.useContext(UserContext);
    const [status, setStatus]               = React.useState('');
    const [email, setEmail]                 = React.useState('');
    const [password, setPassword]           = React.useState('');
    const [errorMessage, setErrorMessage]   = React.useState(null);
    const [enable, setEnable]               = React.useState(false);
    // const [setLoggedIn]           = ctx.loginState;
    const [isLoggedIn, setLoggedIn] = ctx.loginState;
    const [show, setShow]                   = React.useState(() => {
        if (ctx.currentUser) {
            return false;
        } else {
            return true;
        }
    });

    useEffect(()=>{
        const start = () =>{
            gapi.auth2.init({
                clientId: clientID,
            })
        }
        gapi.load("client:auth2",start)
    },[])

    const handleGoogleLoginSuccess = async (response) => {
        await handleLogin(response.profileObj);
        console.log('Google login successful:', response);
       
    };

    const handleLogin = async (userData) => {
        setErrorMessage(null);
    
        try {
            // Verificar que la autenticación sea de Google
            if (userData.name) {
                // Intentar iniciar sesión directamente
                // const loginResponse = await fetch('http://localhost:5000/login', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         correo: userData.email,
                //         // Puedes necesitar incluir más campos según tu lógica de inicio de sesión
                //     }),
                // });
                const loginResponse = await fetch('https://bad-bank-back-end.vercel.app/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        correo: userData.email,
                        // Puedes necesitar incluir más campos según tu lógica de inicio de sesión
                    }),
                });
    
                if (loginResponse.ok) {
                    // Si el inicio de sesión es exitoso, proceder
                    const data = await loginResponse.json();
    
                    // Actualizar el contexto con la información del usuario
                    ctx.currentUser = {
                        userId: data.userId,
                        name: data.nombre,
                        email: data.correo,
                        balance: data.amount
                        // Puedes agregar más propiedades según la respuesta del servidor
                    };
    
                    setEnable(false);
                    setShow(false);
                    setLoggedIn(true);
    
                    console.log('Inicio de sesión exitoso:', data);
                } else {
                    // Si el inicio de sesión falla, crear una nueva cuenta y luego iniciar sesión
                    const formData = {
                        nombre: userData.name,
                        correo: userData.email,
                        authProvider: 'google'
                        // Puedes incluir más campos según tus necesidades
                    };
    
                    // const createAccountResponse = await fetch('http://localhost:5000/createaccount', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(formData),
                    // });
                    const createAccountResponse = await fetch('https://bad-bank-back-end.vercel.app/createaccount', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });
    
                    if (createAccountResponse.ok) {
                        const accountData = await createAccountResponse.json();
                        console.log('Cuenta creada con éxito:', accountData);
    
                        // const loginResponse = await fetch('http://localhost:5000/login', {
                        //     method: 'POST',
                        //     headers: {
                        //         'Content-Type': 'application/json',
                        //     },
                        //     body: JSON.stringify({
                        //         correo: userData.email,
                        //         // Puedes necesitar incluir más campos según tu lógica de inicio de sesión
                        //     }),
                        // });
                        const loginResponse = await fetch('https://bad-bank-back-end.vercel.app/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                correo: userData.email,
                                // Puedes necesitar incluir más campos según tu lógica de inicio de sesión
                            }),
                        });
            
                        if (loginResponse.ok) {
                            // Si el inicio de sesión es exitoso, proceder
                            const data = await loginResponse.json();
            
                            // Actualizar el contexto con la información del usuario
                            ctx.currentUser = {
                                userId: data.userId,
                                name: data.nombre,
                                email: data.correo,
                                balance: data.amount
                                // Puedes agregar más propiedades según la respuesta del servidor
                            };
            
                            setEnable(false);
                            setShow(false);
                            setLoggedIn(true);
            
                            console.log('Inicio de sesión exitoso:', data);
                        }
                    } else {
                        throw new Error('Error al crear la cuenta');
                    }
                }
            } else {
                // Si no es una autenticación de Google, manejar según tu lógica
                throw new Error('No es una autenticación de Google');
            }
        } catch (error) {
            console.error('Error handling Google login:', error);
            setErrorMessage('Error handling Google login');
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    const handleGoogleLogoutSuccess = () => {
        // Aquí puedes manejar la lógica de cierre de sesión con Google
        console.log('Google logout successful');
        setEmail('');
        setPassword('');
        setShow(true);

        ctx.currentUser = null;
        ctx.userIndex = null;

        setLoggedIn(false);
    };
  
    async  function handleSubmit() {
        setErrorMessage(null);

        try {
            // const response = await fetch('http://localhost:5000/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         correo: email,
            //         contraseña: password,
            //     }),
            // });
            const response = await fetch('https://bad-bank-back-end.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email,
                    contraseña: password,
                }),
            });

            if (!response.ok) {
                throw new Error('There was a problem logging in');
            }

            const data = await response.json();
            console.log(data);

            // Actualizar el contexto con la información del usuario
            ctx.currentUser = {
                userId: data.userId,
                name: data.nombre,
                email: data.correo,
                balance: data.amount
                // Puedes agregar más propiedades según la respuesta del servidor
            };
            console.log(ctx.currentUser);

            setEnable(false);
            setShow(false);
            setLoggedIn(true);
        } catch (error) {
            console.error('failed to login:', error);
            setErrorMessage('Incorrect username or password');
        }

        // let foundUser;

        // for (let i=0; i<ctx.users.length; i++) {
        //     if (ctx.users[i].email === email) {
        //         if (ctx.users[i].password === password) {
        //             foundUser = ctx.users[i];
        //             ctx.currentUser = foundUser;
        //             ctx.userIndex = i;
        //             setEnable(false);
        //             setShow(false);
        //             setLoggedIn(true);
        //             return;
        //         } else {
        //             setErrorMessage("Password Incorrect");
        //             return;
        //         }
        //     }
        // }

        // if (!foundUser) {
        //     setErrorMessage("Email not found");
        //     return;
        // }

    };

    function clearForm(){
        setEmail('');
        setPassword('');
        setShow(true);

        ctx.currentUser = null;
        ctx.userIndex = null;

        setLoggedIn(false);
    }

    const validateThis = () => {
        if (validate(email, 'please enter the email associated with your account', setStatus) &&
            validate(password, 'please enter your password', setStatus))
        {
            return true
        } 
        else {
            return false
        };
    };

    const makeChange = (e, setThis) => {
        setThis(e.currentTarget.value);

        if (validateThis())
        {
            setEnable(true)
        };
    }; 

    return (
        <div className="centered">
            {show ? (
                <Card
                    bgcolor="main"
                    header="Login"
                    status={status}
                    body={
                        <>
                            Email<br />
                            <input
                                type="input"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    makeChange(e, setEmail);
                                }}
                            />
                            <br />
                            Password<br />
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => {
                                    makeChange(e, setPassword);
                                }}
                            />
                            <br />
                            <button
                                type="submit"
                                disabled={!enable}
                                className="btn btn-light"
                                onClick={handleSubmit}
                            >
                                Log In
                            </button>
                            <br />
                            <br />
                            <GoogleLogin
                                clientId={clientID}
                                buttonText="Login with Google"
                                onSuccess={handleGoogleLoginSuccess}
                                onFailure={handleGoogleLoginFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                            <br />
                            <br />
                            {errorMessage && <h5>{errorMessage}</h5>}
                        </>
                    }
                />
            ) : (
                <Card
                    bgcolor="main"
                    header="Success!"
                    status={status}
                    body={
                        <>
                            <h5>Welcome {ctx.currentUser.name}, you are now logged in.</h5>
                            <br />
                            {isLoggedIn ? (
                            <GoogleLogout
                                clientId={clientID}
                                buttonText="Logout from Google"
                                onLogoutSuccess={handleGoogleLogoutSuccess}
                            />
                            ) : (
                            <button type="submit" className="btn btn-light" onClick={clearForm}>
                                Log Out
                            </button>
                            )}
                        </>
                    }
                />
            )}
            
        </div>
    );

    // return (
    //     <div className="centered">
    //     {show ? (
    //         <Card
    //         bgcolor="main"
    //         header="Login"
    //         status={status}
    //         body={
    //             <>
    //                 Email<br/>
    //                 <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => {makeChange(e, setEmail)}}/><br/>
    //                 Password<br/>
    //                 <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => {makeChange(e, setPassword)}}/><br/>
    //                 <button type="submit" disabled={!enable}className="btn btn-light" onClick={handleSubmit}>Log In</button>
    //                 <br/><br/>
    //                 {errorMessage && <h5>{errorMessage}</h5>}
    //             </>}
    //     /> ):(
    //         <Card
    //         bgcolor="main"
    //         header="Success!"
    //         status={status}
    //         body={
    //             <>
    //                 <h5>Welcome {ctx.currentUser.name}, you are now logged in.</h5>
    //                 <br/>
    //                 <button type="submit" className="btn btn-light" onClick={clearForm}>Log Out</button>
    //             </>
    //         }
    //     />
    //     ) }
    //     </div>   
    // );
}

export default Login;