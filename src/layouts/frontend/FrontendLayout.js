import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";
import publicRouteList from "../../routes/publicRouteList";
import Footer from "./Footer";
import Banner from "./Banner";
const FrontendLayout = () => {
    return (
        <div>
            <Navbar />
                <div >
                    <Switch>
                        {publicRouteList.map((routedata, idx) => {
                            return (
                                routedata.component && (
                                    <Route
                                        key={idx}
                                        path={routedata.path}
                                        exact={routedata.exact}
                                        name={routedata.name}
                                        render={(props) => (
                                            <routedata.component {...props} />
                                        )}
                                    />
                                )
                            )
                        })}
                    </Switch>     
                    <Footer/>
                </div>    
        </div>
    );
}

export default FrontendLayout;