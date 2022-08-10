import {
  useAddress,
  useMetamask,
  useSignatureDrop,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import {
  ChainId,
  SignedPayload721WithQuantitySignature,
} from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const isMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const signatureDrop = useSignatureDrop(
    "0x3EC3141Aa4577b4Aa8273B15D5f0f6Fe1E1916A7"
  );

  async function claim() {
    if (!address) {
      connectWithMetamask();
      return;
    }

    if (isMismatch) {
      switchNetwork?.(ChainId.Rinkeby);
      return;
    }

    try {
      const tx = await signatureDrop?.claimTo(address, 1);
      alert(`Succesfully minted NFT!`);
    } catch (error: any) {
      alert(error?.message);
    }
  }

  async function claimWithSignature() {
    if (!address) {
      connectWithMetamask();
      return;
    }

    if (isMismatch) {
      switchNetwork && switchNetwork(ChainId.Rinkeby);
      return;
    }

    const signedPayloadReq = await fetch(`/api/generate-mint-signature`, {
      method: "POST",
      body: JSON.stringify({
        address: address,
      }),
    });

    console.log(signedPayloadReq);

    if (signedPayloadReq.status === 400) {
      alert(
        "Looks like you don't own an early access NFT :( You don't qualify for the free mint."
      );
      return;
    } else {
      try {
        const signedPayload =
          (await signedPayloadReq.json()) as SignedPayload721WithQuantitySignature;

        console.log(signedPayload);

        const nft = await signatureDrop?.signature.mint(signedPayload);

        alert(`Succesfully minted NFT!`);
      } catch (error: any) {
        alert(error?.message);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Signature Drop</h1>
      <p className={styles.image}>
        <img src="/unnamed.gif" 
        alt="DYL"
        width={400} 
        height={400}
        />
      </p>

      <p className={styles.describe}>
        In this example, users who own one of our{" "}
        <a href="https://opensea.io/collection/thirdweb-community">
          Early Access NFTs
        </a>{" "}
        can mint for free using the{" "}
        <a href="https://portal.thirdweb.com/pre-built-contracts/signature-drop#signature-minting">
          Signature Mint
        </a>
        . However, for those who don&apos;t own an Early Access NFT, they can
        still claim using the regular claim function.
      </p>

      {address ? (
        <div className={styles.nftBoxGrid}>
          {/* Mint a new NFT */}
          <div
            className={styles.optionSelectBox}
            role="button"
            onClick={() => claim()}
          >
            <h2 className={styles.selectBoxTitle}>Claim NFT</h2>
          </div>

          <div
            className={styles.optionSelectBox}
            role="button"
            onClick={() => claimWithSignature()}
          >
            <h2 className={styles.selectBoxTitle}>Mint</h2>
          </div>
        </div>
      ) : (
        <button
          className={styles.mainButton}
          onClick={() => connectWithMetamask()}
        >
          Connect Wallet
        </button>
      )
      }
    </div>
  );
}



export default Home;
