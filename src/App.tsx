import { ChakraProvider, Button } from "@chakra-ui/react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Button colorScheme="teal">Button</Button>
      </ChakraProvider>
    </div>
  );
}
