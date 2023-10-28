import About from "../componets/frontend/About";
import ViewCategory from "../componets/frontend/collections/ViewCategory";
import Contact from "../componets/frontend/Contact";
import Home from "../componets/frontend/Home";
import Login from "../componets/frontend/auth/Login";
import Register from "../componets/frontend/auth/Register";
import ViewProduct from "../componets/frontend/collections/ViewProduct";
import ProductDetail from "../componets/frontend/collections/ProductDetail";
import Cart from "../componets/frontend/Cart";
import Checkout from "../componets/frontend/Checkout";
import Page403 from "../componets/errors/Page403";
import Page404 from "../componets/errors/Page404";
import OrderUser from "../componets/frontend/OrderUser";
import SearchResults from "../componets/frontend/SearchResults";
import OrderUser1 from "../componets/frontend/OrderUser1";
import OrderUser2 from "../componets/frontend/OrderUser2";
import OrderUser3 from "../componets/frontend/OrderUser3";
import OrderUser4 from "../componets/frontend/OrderUser4";
import Thank from "../componets/frontend/Thank";
import Information from "../componets/frontend/Information";
import ChangePasswordForm from "../componets/frontend/ChangePasswordForm";
import OrderUser5 from "../componets/frontend/OrderUser5";

const publicRouteList = [
    { path: '/', exact: true, name: 'Home', component: Home },

    { path: '/403', exact: true, name: 'Page403', component: Page403 },
    { path: '/404', exact: true, name: 'Page404', component: Page404 },

    { path: '/about', exact: true, name: 'About', component: About },
    
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/register', exact: true, name: 'Register', component: Register },
    { path: '/collections', exact: true, name: 'ViewCategory', component: ViewCategory },
    { path: '/collections/:slug', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/collections/:category/:product', exact: true, name: 'ProductDetail', component: ProductDetail },
    { path: '/cart', exact: true, name: 'Cart', component:Cart },
    ///user-order

    { path: '/order', exact: true, name: 'OrderUser', component: OrderUser },

    { path: '/order/processing', exact: true, name: 'OrderProcessing', component: OrderUser1 },
    { path: '/order/confirmed', exact: true, name: 'OrderConfirmed', component: OrderUser5 },
    { path: '/order/shipping', exact: true, name: 'OrderShipping', component: OrderUser2 },
    {path: '/order/delivered', exact: true, name: 'OrderDelivered', component: OrderUser3 },
    {path: '/order/cancelled', exact: true, name: 'OrderCancelled', component: OrderUser4 },
    //    {  },
    { path: '/checkout', exact: true, name: 'Checkout', component:Checkout },
    //
    { path: '/thank-you', exact: true, name: 'Thank', component:Thank },


    ///
    { path: '/search', exact: true, name: 'SearchResults', component:SearchResults },
    //Thông  Tin Kh change-password
    { path: '/customer/information', exact: true, name: 'Information', component:Information },
    { path: '/change-password', exact: true, name: 'ChangePasswordForm', component:ChangePasswordForm },


];
export default publicRouteList;