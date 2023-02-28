import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import { RoutesData } from "./Constants/Routes/Routes";
import { Session } from "./Context/Session/Session";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import history from "./history";
import { useState } from "react";
function App() {
  console.log('envmongo',process.env.MONGODB_UR)
  const initialOptions = {
    "client-id": "yourid",
    "currency": "USD",
    "intent": "subscription",
    "vault":true
  };
  
  
  return (
    <PayPalScriptProvider options={initialOptions} >
    <Session>
      <Router>
        <Routes >
          <>
          {RoutesData.map((Routesinfo) => (
            <>
              <Route 
                key={Routesinfo.name}
                path={`${Routesinfo.path}`}
                exact
                element={Routesinfo.component}
              />
              <Route />
            </>
          ))}
          </>
        </Routes>
      </Router>
    </Session>
    </PayPalScriptProvider>
  );
}

export default App;
