import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import SideBarLeft from './components/sideBarLeft/SideBarLeft';
import Home from './pages/Home/Home';
import styles from './App.css'
import WalletProvider from './context/WalletProvider';


function App() {
  return(

    <Router>
    <body class="text-zinc-200 w-screen h-full">
       <SideBarLeft />
       <Header />
       <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        
     </body>
     <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script>
     </Router>
   );
}

      

export default App;
