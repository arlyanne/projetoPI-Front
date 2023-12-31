import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </div>
  );
}

export default App;
