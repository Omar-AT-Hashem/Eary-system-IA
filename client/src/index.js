import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider} from "react-router-dom";
import { router } from './Router';
import App from './App';
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
      <RouterProvider router={router} />
    
  );

