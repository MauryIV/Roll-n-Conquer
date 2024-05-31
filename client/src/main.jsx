import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import Dice from './pages/Landing';
import Login from './pages/Login/Login';
import UserProfile from './pages/UserProfile/UserProfile';
import Roll from './pages/Roll';
import SignupForm from './pages/Signup/Signup';
import Error from './pages/Error';


const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Dice />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/profile',
                element: <UserProfile />,
            },
            {
                path: '/roll',
                element: <Roll />,
            },
            {
                path: '/signup',
                element: <SignupForm />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />
);