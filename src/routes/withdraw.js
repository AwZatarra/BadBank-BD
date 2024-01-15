import React                    from 'react';
import { UserContext }          from '../components/user-context';
import Card                     from '../components/card';
import { datedTransaction }     from '../components/dated-transaction';
import validate                 from '../components/validate';

function Withdraw() {
    
    const ctx = React.useContext(UserContext);

    const [status, setStatus]       = React.useState('');
    const [withdraw, setWithdraw]   = React.useState(0);
    const [message, setMessage]     = React.useState(null);
    const [enable, setEnable]       = React.useState(false);
    const [show]           = React.useState(() => {
        if (ctx.currentUser) {
            return true;
        } else {
            return false;
        }
    });
    
    async function handleSubmit() {
        let currentBalance = Number(ctx.currentUser.balance);
        
        if (currentBalance < Number(withdraw)) {
            setMessage(`The requested amount exceeds your current balance`);
            setWithdraw(0);
            return;
        }
        if (withdraw <= 0) {
            setMessage('Please enter an amount greater than zero');
            return;
        }

        try {
            // const response = await fetch(`http://localhost:5000/account/withdraw/${ctx.currentUser.userId}`, {
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ amount: withdraw }),
            // });
            const response = await fetch(`https://bad-bank-back-end.vercel.app/account/withdraw/${ctx.currentUser.userId}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: withdraw }),
            });
        
            if (!response.ok) {
                throw new Error('There was a problem withdrawing funds');
            }
        
            const data = await response.json();
            console.log(data);
            // Actualizar el contexto con el nuevo balance y transacciones
            ctx.currentUser.balance = data.balance;
            ctx.currentUser.transactions = data.transactions;
        
            const currentTransaction = datedTransaction(withdraw);
            console.log(ctx.currentUser);
            // Asignar el array de transacciones del response a ctx.currentUser.history
            ctx.currentUser.history = response.transactions;

            
        
            setMessage(`Successfully withdraw $${withdraw}`);
            setWithdraw(0);
            setEnable(false);
        } catch (error) {
            console.error('Failed to withdraw funds:', error);
            setMessage('Failed to withdraw funds');
        }
        // ctx.users[i].balance = currentBalance - Number(withdraw);
        // const currentTransaction = datedTransaction((0 - Number(withdraw)));
        // ctx.users[i].history.splice(0,0,currentTransaction);
        // ctx.currentUser = ctx.users[i];
        
        // setMessage(`Successfully withdrew $${withdraw}`)
        // setWithdraw(0)
        // setEnable(false);
    };

    const validateThis = () => {
        if (validate(withdraw, 'please enter an amount to withdraw', setStatus))
            {
                return true
            } else {
                return false
            };
    };

    const makeChange = (e, setThis) => {
        setThis(e.currentTarget.value);
        setMessage(null);
        if (validateThis())
            {setEnable(true)};
    }; 

    return (
        <Card
            bgcolor="main"
            header="Withdraw"
            status={status}
            body={show ? (
                <>
                    <h5>Welcome {ctx.currentUser.name}</h5>
                    <h6>Balance ${ctx.currentUser.balance}</h6>
                    Withdraw<br/>
                    <input type="number" className="form-control" id="withdraw" placeholder="Enter amount to withdraw" value={withdraw} onChange={e => {makeChange(e, setWithdraw)}}/><br/>
                    <button type="submit" disabled={!enable} className="btn btn-light" onClick={handleSubmit}>Withdraw</button><br/><br/>
                    {message && <h5>{message}</h5>}
                </>
            ):(
                <>
                    <h5>You must log in to proceed</h5>
                </>
            )}
        />
    );
}

export default Withdraw;