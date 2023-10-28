import Profile from "../componets/admin/Profile";
import Dashboard from "../componets/admin/Dashboard";
import Category from "../componets/admin/category/Category";
import ViewCategory from "../componets/admin/category/ViewCategory";
import EditCategory from "../componets/admin/category/EditCategory";
import AddProduct from "../componets/admin/product/AddProduct";
import ViewProduct from "../componets/admin/product/ViewProduct";
import EditProduct from "../componets/admin/product/EditProduct";
import ViewUser from "../componets/admin/user/ViewUser";
import ViewOrder from "../componets/admin/order/ViewOrder";
import EditOrder from "../componets/admin/order/EditOrder";
import EditUser from "../componets/admin/user/EditUser";
import ChitietOrder from "../componets/admin/order/ChitietOrder";

const routes = [
    {path: '/admin', exact:true ,name :'Admin' },
    {path: '/admin/dashboard', exact:true ,name :'Dashboard', component: Dashboard},
    {path: '/admin/profile', exact:true ,name :'Profile', component: Profile},
    {path: '/admin/add-category', exact:true ,name :'Category', component: Category },
    {path: '/admin/view-category', exact:true ,name :'ViewCategory', component: ViewCategory },
    {path: '/admin/edit-category/:id', exact:true ,name :'EditCategory', component: EditCategory },

    {path: '/admin/add-product', exact:true ,name :'AddProduct', component: AddProduct },
    {path: '/admin/view-product', exact:true ,name :'ViewProduct', component: ViewProduct },
    {path: '/admin/edit-product/:id', exact:true ,name :'EditProduct', component: EditProduct },


    


    {path: '/admin/view-user', exact:true ,name :'ViewUser', component: ViewUser },
    {path: '/admin/edit-user/:id', exact:true ,name :'EditUser', component: EditUser },

    {path: '/admin/view-order', exact:true ,name :'ViewOrder', component: ViewOrder },
    {path: '/admin/edit-order/:id', exact:true ,name :'EditOrder', component: EditOrder },

    {path: '/admin/chitiet-order/:id', exact:true ,name :'ChitietOrder', component: ChitietOrder },




    {path: '/admin/profile', exact:true ,name :'Profile', component: Profile },
    
];
export default routes;