import './App.css';
import ChatPage from './pages/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
