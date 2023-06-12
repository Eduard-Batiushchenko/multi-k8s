import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import OtherPage from "./OtherPage"
import Fib from "./Fib"

function App() {
  return (
      <Router>
          <div>
              <Link to="/">Home</Link>
              <Link to="/otherpage">Other Page</Link>
              <Route exact path="/" component={Fib} />
              <Route path="/otherpage" component={OtherPage} />
          </div>
      </Router>
  );
}

export default App;
