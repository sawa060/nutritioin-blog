import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Container maxW="container.lg">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
