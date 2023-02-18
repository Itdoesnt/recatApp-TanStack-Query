import {
  createBrowserRouter,
} from "react-router-dom";

import { Layout } from '../components/Layout/Layout';
import { Catalog } from '../components/Catalog/Catalog';
import { SignIn } from "../components/SignIn/SignIn";
import { Profile } from "../components/Profile/Profile";
import { SignUp } from "../components/SignUp/SignUp";


export const router = createBrowserRouter([{
  path: '',
  element: < Layout />,
  children: [
    {
      path: '',
      element: <Catalog />
    },
    {
      path: 'catalog',
      element: <Catalog />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'signin',
      element: <SignIn />
    },
    {
      path: 'signup',
      element: <SignUp />
    },
  ]
}])