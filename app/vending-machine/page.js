"use client"
import { useState, useEffect } from 'react'
import styles from './vending-machine.module.css'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import vmContract from '../../blockchain/vending'

const VendingMachine = () => {
  let web3

  const [error, setError] = useState('')
  const [inventory, setInventory] = useState('')
  const [myDonutsCount, setMyDonutsCount] = useState('')
  const [byCount, setByCount] = useState('')

  useEffect(() => {
    getInventoryHandler()
  })

  const getInventoryHandler = async () => {
    const inventory = await vmContract.methods.getVendingMachineBalance().call()
    setInventory(JSON.parse(inventory))
  }

  const getMyDonutsHandler = async () => {
    const accounts = await web3.eth.getAccounts()
    const count = await vmContract.methods.donutBalances(accounts[0]).call()
    setMyDonutsCount(JSON.parse(count))
  }

  const updateDonutQty = event => {
    setByCount(event.target.value)
  }

  const buyDonutsHandler = async () => {
    const accounts = await web3.eth.getAccounts()
    await vmContract.methods.purchase().send({
      from: account[0]
    })
  }

  const connectWalletHandler = async () =>   {
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try{
        await window.ethereum.request({method: "eth_requestAccounts"})
        web3 = new Web3(window.ethereum)
        getMyDonutsHandler()
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
            <h2>Vending machine inventory: {inventory}</h2>
          </div>
        </section>
        <section className={styles.section}>
          <div className='container'>
            <h2>My donuts: {myDonutsCount}</h2>
          </div>
        </section>
        <section className={styles.section}>
          <div className='container mt-5'>
            <div className="field">
              <label className="label">Buy donuts</label>
              <div className="control">
                <input onChange={updateDonutQty} className="input" type="type" placeholder="Enter amount..."/>
              </div>
              <button onClick={buyDonutsHandler} className='button is-primary mt-2'>Buy</button>
            </div>
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