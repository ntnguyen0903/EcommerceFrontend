// import React, { useState, useEffect } from 'react';
// import { Route, Redirect, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import MasterLayout from './layouts/admin/MasterLayout';
// import swal from 'sweetalert';

// function AdminPrivateRoute({ ...rest }) {
//   const history = useHistory();
//   const [authenticated, setAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`/api/checkingAuthenticated`).then((res) => {
//       if (res.status === 200) {
//         setAuthenticated(true);
//       }
//       setLoading(false);
//     });

//     return () => {
//       setAuthenticated(false);
//     };
//   }, []);

//   useEffect(() => {
//     const interceptor401 = axios.interceptors.response.use(
//       undefined,
//       function axiosRetryInterceptor(err) {
//         if (err.response.status === 401) {
//           swal('Unauthorized', err.response.data.message, 'warning');
//           history.push('/');
//         }
//         return Promise.reject(err);
//       }
//     );

//     const interceptor403 = axios.interceptors.response.use(
//       function (response) {
//         return response;
//       },
//       function (error) {
//         if (error.response.status === 403) {
//           swal('Forbidden', error.response.data.message, 'warning');
//           history.push('/403');
//         } else if (error.response.status === 404) {
//           swal('404 Error', 'Url/Page Not Found', 'warning');
//           history.push('/404');
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.response.eject(interceptor401);
//       axios.interceptors.response.eject(interceptor403);
//     };
//   }, [history]);

//   if (loading) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         authenticated ? (
//           <MasterLayout />
//         ) : (
//           <Redirect to={{ pathname: '/login', state: { from: location } }} />
//         )
//       }
//     />
//   );
// }

// export default AdminPrivateRoute;
//ttHung
import React, { useEffect, useState }  from "react";
import {Route, Redirect, useHistory} from 'react-router-dom';
import MasterLayout from "./layouts/admin/MasterLayout";
import axios from "axios";
import swal from "sweetalert";

const AdminPrivateRoute = ({...rest}) => {
   const history = useHistory();
   const [Authenticated, setAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);
  
   useEffect(() => {
      axios.get('/api/checkingAuthenticated').then(res => {
         if (res.status === 200) {
            setAuthenticated(true);
         }
      }).catch(err => {
         if (err.response && err.response.status === 401) {
            swal("Không được phép", err.response.data.message, "Cảnh báo");
            history.push('/login');
         }
      }).finally(() => {
         setLoading(false);
      });

      return () => {
         setAuthenticated(false);
      };
   }, []);
  
   axios.interceptors.response.use( function(response){
        return response;
          }, function(error){
            if(error.response.status === 403)//access denied
            {
                swal("Forbedden",error.response.data.message,"warning");
                history.push('/403');
            }
            else if(error.response.status === 404)//Page default
            {
                swal("404 Error","Urrl/Page  Not Found","warning");
                history.push('/404');
            }
            return Promise.reject(error);
          }
    );
   
   if (loading) {
      return <h1>loading...</h1>;
   }

   return ( 
      <Route {...rest} render={({props, location}) => (
         Authenticated ?
         (<MasterLayout {...props}/>) :
         (<Redirect to={{pathname: "/login", state: {from: location}}} />)
      )} />
   );
   debugger;
}

export default AdminPrivateRoute;

