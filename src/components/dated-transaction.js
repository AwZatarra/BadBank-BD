const datedTransaction = (amount) => {
    const date = new Date();
    const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const transaction = {
        amount: amount,
        month: month,
        day: day,
        year: year,
        hour: hour,
        minutes: minutes,
        seconds: seconds
    }
    return transaction
};

const Transaction = ({t}) => {
    const date =`${t.month + 1}/${t.day}/${t.year}`;
    const time =`${t.hour}:${t.minutes}:${t.seconds}`
    let amount;
    if (t.amount > 0) {
        amount = `Deposit - $${t.amount}`
    } else {
        amount = `Withdrawal - $${t.amount}`
    };
    return (
        <div className="transaction">{date} - {time} - {amount}</div>
    )
}

export { datedTransaction, Transaction }