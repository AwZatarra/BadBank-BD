import React, { useEffect, useState } from 'react';
import { UserContext } from '../components/user-context';
import Card from '../components/card';
import './styles/alldata.css';

function AllData() {
    const ctx = React.useContext(UserContext);
    const [status] = React.useState('');
    const [show] = React.useState(() => {
        if (ctx.currentUser) {
            return true;
        } else {
            return false;
        }
    });

    const [userData, setUserData] = useState({
        balance: 0,
        transactions: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:5000/account/alldata/${ctx.currentUser.userId}`);
                const response = await fetch(`https://bad-bank-back-end.vercel.app/account/alldata/${ctx.currentUser.userId}`);
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (show && ctx.currentUser) {
            fetchData();
        }
    }, [show, ctx.currentUser]);

    function Transaction({ t }) {
        const formattedTransaction = formatTransaction(t);
        return <div className="transaction">{formattedTransaction}</div>;
    }

    function formatTransaction(transaction) {
        const date = new Date(transaction.timestamp);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const type = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);
        const amount = `$${transaction.amount.toFixed(2)}`;

        return `${formattedDate} - ${formattedTime} - ${type} - ${amount}`;
    }

    return (
        <Card
            bgcolor="main"
            header="Balance and History"
            status={status}
            width="22rem"
            body={show ? (
                <>
                    <h5>Welcome {ctx.currentUser.name}</h5>
                    <h6>Your current balance is:</h6>
                    <h6>${userData.balance}</h6>
                    <h6>Transaction History</h6>
                    {userData.transactions.map((transaction, i) => (
                        <Transaction key={i} t={transaction} />
                    ))}
                </>
            ) : (
                <>
                    <h5>You must log in to proceed</h5>
                </>
            )}
        />
    );
}

export default AllData;
