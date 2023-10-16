"use client"
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import vendingMachineContract from '../../blockchain/vending'
import 'bulma/css/bulma.css'
import styles from './vending-machine.module.css'

const VendingMachine = () => {
  
  const [error, setError] = useState('')
  const [inventory, setInventory] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [myDonutsCount, setMyDonutsCount] = useState('')
  const [buyCount, setBuyCount] = useState('')
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [vmContract, setVmContract] = useState(null)
  const [purchases, setPurchases] = useState(0)

  useEffect(() => {
    if(vmContract) getInventoryHandler()
    if(vmContract && address) getMyDonutsHandler()
  }, [vmContract, address, purchases])
  
  const getInventoryHandler = async () => {
    const inventory = await vmContract.methods.getVendingMachineBalance().call()
    setInventory(inventory)
  }

  const getMyDonutsHandler = async () => {
    const count = await vmContract.methods.donutBalances(address).call()
    setMyDonutsCount(count)
  }
  
  const updateDonutQty = event => {
    setBuyCount(event.target.value)
  }

  const buyDonutsHandler = async () => {

    try {
      await vmContract.methods.purchase(parseInt(buyCount)).send({
        from: address,
        value: web3.utils.toWei('0.02', 'ether') * parseInt(buyCount),
        gasLimit: 3000000,
        gasPrice: null
        
      })
     
      setPurchases(purchases+1)
      setSuccessMsg(`${buyCount}'donuts purchased!'`)
    } catch(err){
      setError(err.message)
    }
  }
  
  const connectWalletHandler = async () => {
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try{
        await window.ethereum.request({method: "eth_requestAccounts"})
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        const vm = vendingMachineContract(web3)
        setVmContract(vm)
        setAddress(accounts[0])
      } catch(err) {
        setError(err.message)
      }
    } else {
        console.log("Plase install MetaMask")
    }
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
            <h2>Vending machine inventory: {inventory.toString()}</h2>
          </div>
        </section>
        <section className={styles.section}>
          <div className='container'>
            <h2>My donuts: {myDonutsCount.toString()}</h2>
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
        <section className={styles.section}>
          <div className='container has-text-success'>
            <p>{successMsg}</p>
          </div>
        </section>
      </div>
    )
}
  

export default VendingMachine
