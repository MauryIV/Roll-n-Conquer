import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import Dice from './pages/Landing';
import UserProfile from './pages/UserProfile/UserProfile';
import Roll from './pages/Roll';
import SigninForm from './pages/SigninForm';
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
                path: '/profile',
                element: <UserProfile />,
            },
            {
                path: '/roll',
                element: <Roll />,
            },
            {
                path: '/signin',
                element: <SigninForm />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />
);