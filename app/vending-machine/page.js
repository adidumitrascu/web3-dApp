"use client"
import { useState } from 'react'
import styles from './vending-machine.module.css'
import Web3 from 'web3'
import 'bulma/css/bulma.css'

const VendingMachine = () => {
  let web3

  const [error, setError] = useState('')

  const connectWalletHandler = async () => {
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try{
        await window.ethereum.request({method: "eth_requestAccounts"})
        web3 = new Web3(window.ethereum)
      } catch(err) {
        setError(err.message)
      }
    }
    console.log("Plase install MetaMask")
  }


  return (
      <div className={styles.main}>
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1 className={styles.h1}>Vending Machine</h1>
            </div>
            <div className='navbar-end'>
              <button onClick={connectWalletHandler} className='button is-primary'>Connect Wallet</button>
            </div>
          </div>
        </nav>
        <section className={styles.section}>
          <div className='container'>
            <p>placeholder text</p>
          </div>
        </section>
        <section className={styles.section}>
          <div className='container has-text-danger'>
            <p>{error}</p>
          </div>
        </section>
      </div>
    )
}
  

export default VendingMachine