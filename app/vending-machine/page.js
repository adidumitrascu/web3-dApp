import Head from 'next/head'
import styles from '../vending-machine.module.css'
import 'bulma/css/bulma.css'


export default function VendingMachine() {
  return (
      <div>
        <Head>
          <title>VendingMachine App</title>
        </Head>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <h1>Vending Machine</h1>
            </div>
            <div className='navbar-end'>
              <button className='button is-primary'>Connect Wallet</button>
            </div>
          </div>
        </nav>
      </div>
    )
}