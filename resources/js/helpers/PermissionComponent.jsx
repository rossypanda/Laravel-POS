import React, { useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
import PermissionContext from './PermissionContext';



const Permission = (props) => {
   const [permissions,setPermissions] = useState('test');
   const { children } = props;

   useEffect(() => {
        Axios.get('/fetch/permission')
        .then(function (response) {
                setPermissions(response.data);
        });
    },[]);
    return (
        <PermissionContext.Provider value={permissions}> 
           {children}
        </PermissionContext.Provider>
    );
}

export default Permission;