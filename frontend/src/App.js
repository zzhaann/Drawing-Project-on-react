import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm'
import DrawingCanvas from "./components/DrawingCanvas";
import Error404 from "./components/Error404";
import Profile from "./components/Profile";
import RegisterForm from "./components/RegisterForm";
import RoomDetail from "./components/RoomDetail";
import RoomList from "./components/RoomList";
import TaskList from "./components/TaskList";


//Parent component [Root]
//Stateless component [functional component]
function App() {
  return (
   <div>
<LoginForm  />
   </div>
  );
}



export default App;
