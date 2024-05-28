import { HeaderBox } from "@/components/HeaderBox";

export default function Home() {
  const loggedIn = {
    firstName : "Pramod",
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
    </div>

  </section>
  );
}
