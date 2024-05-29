import { HeaderBox } from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  const loggedIn = {
    firstName : "Pramod",
    lastName : "Nahar",
    email: "pramodkumar2960@gmail.com",
  }

  return( 
  <section className="home">

   
    <div className="home-content">
       <header className="home-header">
          <HeaderBox
          type ="greeting"
          title="Welcome"
          user ={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transacation efficiently"        
          />
       </header>
       
       recent transitons

    </div>

    <RightSidebar 
    user = {loggedIn}
    transactions = {[]}
    banks={[{currentBalance: 123.50},
         {currentBalance: 150}
          ]}

    />

  </section>
  );
}
