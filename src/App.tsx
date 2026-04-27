import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
