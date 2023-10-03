import styles from './vending-machine.module.css'
import 'bulma/css/bulma.css'


export default function VendingMachine() {
  return (
      <div className={styles.main}>
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1>Vending Machine</h1>
            </div>
            <div className='navbar-end'>
              <button className='button is-primary'>Connect Wallet</button>
            </div>
          </div>
        </nav>
        <section className={styles.section}>
          <div className='container'>
            <p>placeholder text</p>
          </div>
        </section>
      </div>
    )
}