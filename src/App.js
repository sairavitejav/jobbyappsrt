import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobItem from './components/JobItem'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
