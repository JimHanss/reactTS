import { useState, useCallback, useEffect } from "react";
import { Box, Button, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import NftList from "./components/NftList";
import useTab from "./utils/useTab";

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

const baseUrl = "https://eth-api-eight.vercel.app";
const urlModule = {
  Ethereum: "ethDemo",
  Solana: "solDemo",
};

function App() {
  const classes = useStyle();
  const [tab, Tab] = useTab();
  const [nftData, setNftData] = useState();
  const [transferValue, setTransferValue] = useState("");
  const [checkValue, setCheckValue] = useState("");

  const transferNFT = useCallback(async () => {
    try {
      const config = {
        method: "post",
        headers: {},
        url: `${baseUrl}/${urlModule[tab]}/safeTransferFrom`,
        data: {
          address: transferValue,
        },
      };

      const { data } = await axios(config);
      alert(`success`);
    } catch (error) {
      console.log("error", error);
    }
  }, [transferValue]);

  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       alert(`please install metamask`);
  //       return;
  //     }

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getNFT = async () => {
    try {
      const config = {
        method: "post",
        headers: {},
        url: `${baseUrl}/${urlModule[tab]}/getNft`,
        data: {
          address: checkValue,
        },
      };

      const { data } = await axios(config);
      const nfts = data.map((item) => {
        return {
          img: item.uri,
          title: item.name,
          address: item.address,
        };
      });
      console.log("result", nfts);
      setNftData(nfts);
    } catch (error) {
      console.log("error", error);
    }
  };

  // const transferSolNFT = useCallback(async () => {
  //   try {
  //     const config = {
  //       method: "post",
  //       headers: {},
  //       url: "https://eth-api-eight.vercel.app/solDemo/transfer",
  //       data: {
  //         address: solValue,
  //       },
  //     };

  //     const { data } = await axios(config);

  //     console.log(`txhash:${data}`);
  //     alert(`success!txhash:${data}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [solValue]);

  useEffect(() => {
    setNftData(undefined);
    setTransferValue("");
    setCheckValue("");
  }, [tab]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {Tab}
      <h1>{tab}</h1>
      <Box display="flex">
        <InputBase
          className={classes.input}
          value={transferValue}
          onChange={(event) => {
            setTransferValue(event.target.value);
          }}
        />
        <Button
          onClick={transferNFT}
          style={{
            backgroundColor: "#77838f",
            color: "white",
            borderRadius: "0 4px 4px 0",
            width: "100px",
          }}
        >
          Transfer
        </Button>
      </Box>
      <Box display="flex" mt="50px" mb="50px">
        <InputBase
          className={classes.input}
          value={checkValue}
          onChange={(event) => {
            setCheckValue(event.target.value);
          }}
        />
        <Button
          onClick={getNFT}
          style={{
            backgroundColor: "#77838f",
            color: "white",
            borderRadius: "0 4px 4px 0",
            width: "100px",
          }}
        >
          getNFT
        </Button>
      </Box>
      {Array.isArray(nftData) && <NftList data={nftData} />}
      {/* {tab === "Ethereum" ? (
        <>
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
                width: "100px",
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
                width: "100px",
              }}
            >
              getNFT
            </Button>
          </Box>
          {Array.isArray(imgUrl) && <NftList data={imgUrl} />}
        </>
      ) : (
        <>
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
        </>
      )} */}
    </Box>
  );
}

export default App;
