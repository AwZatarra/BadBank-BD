import Card from '../components/card';
import image from '../images/bank.png'

function Home() {
    return (
       <Card
            txtcolor="white"
            bgcolor="main"
            header="Welcome to the Bad Bank"
            width="50rem"
            body={
            
            <div>
                <img src={image} alt='Bad Bank Logo' style={{width: 250,marginLeft: "30%",marginBottom: "10px"}}></img>
                <div style={{marginLeft: "auto",marginRight: 0}}>
                    <h4><em>The bank where you can make deposits and withdrawals instantly</em></h4>
                    <ul>
                        <li className="">Open your account and receive a bonus $</li>
                        <li className="">Transfers at no cost</li>
                        <li className="">See your movements instantly</li>
                    </ul>
                </div>
            </div>
            }
       />
    );
}

export default Home;