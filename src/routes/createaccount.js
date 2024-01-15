import React from 'react';
import Card from '../components/card';
import { UserContext } from '../components/user-context';
import validate from '../components/validate';
import { useState } from 'react';

function CreateAccount() {
    const ctx = React.useContext(UserContext);
    const [show, setShow]                   = React.useState(true);
    const [status, setStatus]               = React.useState('');
    const [errorMessage, setErrorMessage]   = React.useState(null);
    const [enable, setEnable]               = React.useState(false);
    const [name, setName]                   = React.useState('');
    const [email, setEmail]                 = React.useState('');
    const [password, setPassword]           = React.useState('');
    const [isLoggedIn, setLoggedIn] = ctx.loginState;
 
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contraseña: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        makeChange(value, id);
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateThis()) {
            setErrorMessage('Check the fields before submitting the form');
            return;
        }
    
        if (!formData.correo.includes('@') || !formData.correo.includes('.')) {
            setErrorMessage('Verify your email address. Must include @ and .');
            return;
        }
    
        if (formData.contraseña.length < 8) {
            setErrorMessage('Your password must be at least 8 characters long');
            return;
        }
    
        setErrorMessage(null);

        try {
            // const response = await fetch('http://localhost:5000/createaccount', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            const response = await fetch('https://bad-bank-back-end.vercel.app/createaccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                // throw new Error('There was a problem creating the account');
                setErrorMessage('There was a problem creating the account.');
            }
    
            const data = await response.json();
            console.log('Successfully created account:', data);
            if(data.error) setErrorMessage(data.error);

            const { _id } = data._id;
            console.log(data._id);
        
            const newUser = {
                userId: data._id,
                name: formData.nombre,
                email: formData.correo,
                password: formData.contraseña,
                balance: 100,
                history: [],
            };
            console.log('New User:', {
                userId: data._id,
                name: formData.nombre,
                email: formData.correo,
                password: formData.contraseña,
                balance: 100,
                history: [],
              });
    
            ctx.users.push(newUser);
    
            const newUserIndex = ctx.users.length - 1;
            ctx.currentUser = { ...newUser };
            ctx.userIndex = newUserIndex;
    
            setLoggedIn(true);
            setShow(false);
        } catch (error) {
            console.error('Error creating account:', error);
        }

    };

    // function handleCreate() {
    //     if (!validateThis()) return;
    //     if (!formData.correo.includes('@') || !formData.correo.includes('.')) {
    //         setErrorMessage('Verifica tu dirección de correo. Debe incluir @ y .');
    //         return;
    //     }
    //     if (formData.contraseña.length < 8) {
    //         setErrorMessage('Tu contraseña debe tener al menos 8 caracteres de longitud');
    //         return;
    //     }

    //     setErrorMessage(null);

    //     ctx.users.push({
    //         name: formData.nombre,
    //         email: formData.correo,
    //         password: formData.contraseña,
    //         balance: 100,
    //         history: [],
    //     });

    //     const newUserIndex = ctx.users.length - 1;
    //     ctx.currentUser = ctx.users[newUserIndex];
    //     ctx.userIndex = newUserIndex;

    //     setShow(false);
    // }
    
    
    function clearForm(){
        setFormData({
            nombre: '',
            correo: '',
            contraseña: ''
        });
        setLoggedIn(false);
        setShow(true);
        setEnable(false);

        ctx.currentUser = null;
        ctx.userIndex = null;
    }

    const validateThis = () => {
        if (validate(name, 'empty name', setStatus) &&
            validate(email, 'empty email', setStatus) &&
            validate(password, 'empty password', setStatus))
        {
            return true
        } 
        else 
        {
            return false
        };
    };

    const makeChange = (value, campo) => {
        if (validateThis()) {
            setEnable(true);
        } else {
            setEnable(false);
        }
    
        switch (campo) {
            case 'nombre':
                setName(value);
                break;
            case 'correo':
                setEmail(value);
                break;
            case 'contraseña':
                setPassword(value);
                break;
            default:
                break;
        }
    }; 
 
    return (
        <Card
             bgcolor="main"
             header="Create Account"
             status={status}
             body={show ? (
                 <>
                     {/* Name<br/>
                     <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => {makeChange(e, setName)}}/><br/>
                     Email<br/>
                     <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => {makeChange(e, setEmail)}}/><br/>
                     Password<br/>
                     <input type="input" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => {makeChange(e, setPassword)}}/><br/>
                     <button type="submit" disabled={!enable}className="btn btn-light" onClick={handleCreate}>Create Account</button>
                     <br/><br/>
                     {errorMessage && <h5>{errorMessage}</h5>} */}
                     Name<br/>
                     <input type="text" className="form-control" id="nombre" placeholder="Enter name" value={formData.nombre} onChange={handleChange}/><br/>
                     Email<br/>
                     <input type="text" className="form-control" id="correo" placeholder="Enter email" value={formData.correo} onChange={handleChange}/><br/>
                     Password<br/>
                     <input type="password" className="form-control" id="contraseña" placeholder="Enter password" value={formData.contraseña} onChange={handleChange}/><br/>
                     <button type="submit" className="btn btn-light" onClick={handleSubmit}>Create Account</button>
                     <br/><br/>
                     {errorMessage && <h5>{errorMessage}</h5>}
                 </>
             ):(
                 <>
                     <h5>Success!</h5>
                     <h4>Welcome {ctx.currentUser.name}</h4>
                     <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
 
                 </>
             )}
        />
    )
 }

 export default CreateAccount;