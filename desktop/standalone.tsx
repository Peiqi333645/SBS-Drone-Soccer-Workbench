import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import StudentApp from '../app/page';
import AdminApp from '../app/admin/page';
import '../app/globals.css';
function StandaloneApp(){
  const [admin,setAdmin]=useState(location.hash==='#/admin');
  useEffect(()=>{const sync=()=>setAdmin(location.hash==='#/admin');window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
  return admin?<AdminApp/>:<StudentApp/>;
}
createRoot(document.getElementById('root')!).render(<StandaloneApp/>);
