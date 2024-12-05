import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Routing from "./Routing";
import store from "./redux/store";
function App() {
  console.log('testing')
  return (
    <>
    <Provider store={store}>
    {/* <BrowserRouter>
        <Routing />
      </BrowserRouter> */}
    </Provider>
   
    </>
  );
}

export default App;
