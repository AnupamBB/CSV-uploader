import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './components/signUp/SignUp';
import UploadPage from './components/uploadPage/UploadPage';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SignInPage />} />
                    <Route path="/uploadPage" element={<UploadPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
