import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { getEnv } from "../utils/getEnv";

const activeChain = "mumbai";

/**
 * MyApp Component
 * @param param0 
 * @returns 
 */
function MyApp({ Component, pageProps }: AppProps) {
  const [clientId, setClientId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const init = async() => {
      const env = await getEnv();
      setClientId(env.CLIENT_ID);
    }
    init();
  }, [])


  return (
    <>
      {clientId != undefined && (
        <ThirdwebProvider
          clientId={clientId}
          activeChain={activeChain}
          supportedWallets={[
            embeddedWallet(),
          ]}
        >
          <Component {...pageProps} />
        </ThirdwebProvider>
      )}
    </>
  );
}

export default MyApp;
