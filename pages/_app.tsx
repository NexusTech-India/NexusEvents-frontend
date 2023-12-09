import { type AppType } from "next/dist/shared/lib/utils";
import { ChakraProvider, theme as chakraTheme } from '@chakra-ui/react'
import "@/styles/globals.css";
import { ThirdwebProvider, metamaskWallet, walletConnect } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThirdwebProvider
        activeChain={"mumbai"}
        autoConnect
        supportedWallets={[
          metamaskWallet(),
          walletConnect(),
        ]}
        clientId="587317784f60a14e8035214f48fced26"
        dAppMeta={{
          name: "Nexus Events",
          isDarkMode: true,
          description: "Nexus Events is a decentralized event hosting platform.",
          url: "https://nexus-events.vercel.app/"
        }}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  )
};

export default MyApp;