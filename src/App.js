import { useState, useCallback } from "react";
import { Box, Button, InputBase } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import abi from "./utils/Counter.json";
import NFT from "./utils/NFT.json";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  input: {
    border: "1px solid #d5dae2",
    width: "450px",
    paddingLeft: "10px",
    borderRadius: "4px 0 0 4px",
    "& :focus": {
      borderColor: "rgba(52,152,219,.5)",
      boxShadow: "0 0 25px rgb(52 152 219 / 10%)",
    },
  },
}));

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contractABI = abi.abi;

const myContractAddress = "0x25C5F2FD786Ad76A74318Ea99664212D740D9451";
const myContractABI = NFT;

function App() {
  const classes = useStyle();
  const [value, setValue] = useState();
  const [id, setId] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [solValue, setSolValue] = useState();

  const transferNFT = useCallback(async () => {
    try {
      const config = {
        method: "post",
        headers: {},
        url: "https://eth-api-eight.vercel.app/nftDemo/safeTransferFrom",
        data: {
          address: value,
        },
      };

      const { data } = await axios(config);
      alert(`success`);
    } catch (error) {
      console.log("error", error);
    }
  }, [value]);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert(`please install metamask`);
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getNFT = async () => {
    try {
      const config = {
        method: "post",
        headers: {},
        url: "https://eth-api-eight.vercel.app/nftDemo/getNft",
        // url: "http://localhost:3001/nftDemo/getNft",
        data: {
          address: id,
        },
      };

      const { data } = await axios(config);
      console.log("result", data);
      setImgUrl(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const transferSolNFT = useCallback(async () => {
    try {
      const config = {
        method: "post",
        headers: {},
        url: "https://eth-api-eight.vercel.app/solDemo/transfer",
        data: {
          address: solValue,
        },
      };

      const { data } = await axios(config);

      console.log(`txhash:${data}`);
      alert(`success!txhash:${data}`);
    } catch (error) {
      console.log(error);
    }
  }, [solValue]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Ethereum</h1>
      <Box display="flex">
        <InputBase
          className={classes.input}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <Button
          onClick={transferNFT}
          style={{
            backgroundColor: "#77838f",
            color: "white",
            borderRadius: "0 4px 4px 0",
          }}
        >
          Transfer
        </Button>
      </Box>
      <Box display="flex" mt="50px" mb="50px">
        <InputBase
          className={classes.input}
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <Button
          onClick={getNFT}
          style={{
            backgroundColor: "#77838f",
            color: "white",
            borderRadius: "0 4px 4px 0",
          }}
        >
          getNFT
        </Button>
      </Box>
      {Array.isArray(imgUrl) &&
        imgUrl.map((item, index) => (
          <CardMedia
            component="img"
            height="480px"
            width="480px"
            image={item}
            alt=""
            key={index}
          />
        ))}

      <h1>Solana</h1>
      <Box display="flex">
        <InputBase
          className={classes.input}
          onChange={(event) => {
            setSolValue(event.target.value);
          }}
        />
        <Button
          onClick={transferSolNFT}
          style={{
            backgroundColor: "#77838f",
            color: "white",
            borderRadius: "0 4px 4px 0",
          }}
        >
          Transfer
        </Button>
      </Box>
    </Box>
  );
}

export default App;
