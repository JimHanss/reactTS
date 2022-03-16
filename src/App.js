import {useState,useEffect} from 'react';
import { Box, Button } from '@mui/material';
import {ethers} from 'ethers'
import abi from './utils/Counter.json'

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
const contractABI = abi.abi

function App() {
  const [count,setCount] = useState(0)
  const [account,setAccount] = useState(null)
  const [loading,setLoading] = useState(false)

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        console.log(`metamask is available`);
        
      } else {
        console.log(`metamask is available`);
      }

      const accounts = await ethereum.request({
        method: 'eth_accounts'
      })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log(`found account with address`,account);
        setAccount(account)
      } else {
        console.log(`no authorized account found`);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected().then(() => {
      getCounts()
    })
  },[])

  const connectWallet = async () => {
    try {
      const {ethereum} = window

      if(!ethereum) {
        alert(`please install metamask`)
        return 
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      console.log(accounts[0]);

      setAccount(accounts[0])
    } catch (err) {
      console.error(err);
    }
  }

  const hi = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()  // signer 是执行合约的签名方
        const CounterContract = new ethers.Contract(contractAddress, contractABI, signer)

        setLoading(true)
        let tx = await CounterContract.add() // 会返回一个交易 transaction
        await tx.wait() // 等 add() 完场上链之后，才去获取 counts 值
        setLoading(false)
        await getCounts()
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  }

  const getCounts = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log(`ethereum object is not available`);
        return
      }

        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()  // signer 是执行合约的签名方
        const CounterContract = new ethers.Contract(contractAddress, contractABI, signer)

        const counts = await CounterContract.getCounts() // 返回的 counts 是非常大的，是个bigNumber
        setCount(counts.toNumber()) // 所以需要 toNumber() 转换一下
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <h1>Hello, Web3!</h1>
      {account ? <><h2>{count}</h2>
      <h3>
        Logged in as{"  "}
      <strong>{`${account.substring(0,4)}...${account.substring(account.length - 4)}`}</strong>
      </h3>
      <Button onClick={hi}>{loading ? 'loading' : 'Say Hi'}</Button></> :<Button onClick={connectWallet}>Connect Wallet</Button>  }
    </Box>
  );
}

export default App;
