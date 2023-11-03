/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import Overview from "components/Generales/Company";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";

import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";
import MarcasET from "components/GestionET/MarcasET";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

// Material Dashboard 2 PRO React TS components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

import profilePicture from "assets/images/team-3.jpg";
import MarcasMotores from "components/GestionET/MarcasMotores";
import AñadirCentroCostos from "components/Generales/CentrosCostos/pages/NewCentroCostos/NewCentroCostos";
import UserSecurity from "components/Generales/UserSecurity";
import ListCentroCostos from "components/Generales/CentrosCostos";
import TractoresTable from "components/GestionET/Tractores";
import TiposRemolques from "components/GestionET/TiposRemolques";
import MarcasValvulas from "components/GestionET/MarcasValvulas";
import Remolques from "components/GestionET/Remolques";
import Dollys from "components/GestionET/Dollys";
import VehiculosAdministrativos from "components/GestionET/VehiculosAdmn";
import ValvulasPresion from "components/GestionET/ValvulasTanquesPresion";
import CategoriasColaboradores from "components/GestionDeTalento/Colaboradores";
import Colaboradores from "components/GestionDeTalento/Colaboradores";
import TiposColaboradores from "components/GestionDeTalento/TiposDeColaboradores";
import PuestosColaboradores from "components/GestionDeTalento/PuestosDeLosColaboradores";
import AreasColaboradores from "components/GestionDeTalento/AreasColaboradores";
import EstacionesServicio from "components/GestionDiesel/EstacionesServicio";
import Cover from "components/Auth/SignIn";

const currentUser = sessionStorage.getItem("userName");

const routes = [
  {
    type: "collapse",
    name: currentUser ? currentUser.toUpperCase() : "Current User",
    key: "current-user",
    //icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        //  route: "/pages/profile/profile-overview",
        //component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        //  route: "/pages/account/settings",
        component: <Settings />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  // {
  //   type: "collapse",
  //   name: "Tableros",
  //   key: "dashboards",
  //   icon: <Icon fontSize="medium">dashboard</Icon>,
  //   collapse: [
  //     {
  //       name: "Analytics",
  //       key: "analytics",
  //       route: "/dashboards/analytics",
  //       component: <Analytics />,
  //     },
  //     {
  //       name: "Sales",
  //       key: "sales",
  //       route: "/dashboards/sales",
  //       component: <Sales />,
  //     },
  //   ],
  // },

  { type: "title", title: "Modulos", key: "title-generales" },
  {
    type: "collapse",
    name: "Generales",
    key: "generales",
    icon: <Icon fontSize="medium">image</Icon>,
    collapse: [
      {
        name: "Compañia",
        key: "compañia-overview",
        route: "/Generales/Empresa",
        component: <Overview />,
      },

      {
        name: "Seguridad Usuarios",
        key: "seguridad-usuarios",
        route: "/Generales/seguridad-usuarios",
        component: <UserSecurity />,
      },

      {
        name: "Centro de Costos",
        key: "centrosCostos",
        route: "/Generales/centrosCostos",
        component: <ListCentroCostos />,
      },
      // {
      //   name: "Nuevo Centro de C",
      //   key: "nuevoCentroCostos",
      //   route: "/pages/Generales/nuevoCentroDeCostos",
      //   component: <AñadirCentroCostos />,
      // },

      // { name: "Widgets", key: "widgets", route: "/pages/widgets", component: <Widgets /> },
      // { name: "Charts", key: "charts", route: "/pages/charts", component: <Charts /> },
    ],
  },
  {
    type: "collapse",
    name: "Gestion E.T.",
    key: "gestion_et",
    icon: <Icon fontSize="medium">apps</Icon>,
    collapse: [
      {
        name: "Marcas ET",
        key: "marcasET",
        // route: "/GestionET/MarcasET",
        component: <MarcasET />,
      },
      {
        name: "Marcas de motores",
        key: "marcasMotores",
        //  route: "/GestionET/marcasMotores",
        component: <MarcasMotores />,
      },
      {
        name: "Tractores",
        key: "tractores",
        //  route: "/GestionET/tractores",
        component: <TractoresTable />,
      },
      {
        name: "Tipos Remolques",
        key: "tiposRemolques",
        // route: "/GestionET/tiposRemolques",
        component: <TiposRemolques />,
      },
      {
        name: "Marcas de válvulas",
        key: "marcasValvulas",
        //route: "/GestionET/marcasValvulas",
        component: <MarcasValvulas />,
      },
      {
        name: "Remolques",
        key: "remolques",
        // route: "/GestionET/Remolques",
        component: <OrderList />,
      },
      {
        name: "Dollys",
        key: "dollys",
        // route: "/GestionET/Dollys",
        component: <Dollys />,
      },
      {
        name: "Vehículos Admn.",
        key: "vehiculusAdmn",
        //  route: "/GestionET/Vehiculos_Admn",
        component: <VehiculosAdministrativos />,
      },
      {
        name: "Valvulas a Presión.",
        key: "vehiculusAdmn",
        // route: "/GestionET/Valvulas_Presion",
        component: <ValvulasPresion />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Gestion Talento",
    key: "gestion-talento",
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [
      {
        name: "Tipos de Colaboradores",
        key: "tiposColaboradores",
        //  route: "/GestionET/tiposColaboradores",
        component: <TiposColaboradores />,
      },
      {
        name: "Areas de Colaboradores",
        key: "areasColaboradores",
        //  route: "/GestionET/areasColaboradores",
        component: <AreasColaboradores />,
      },
      {
        name: "Puestos de Colaboradores",
        key: "puestosColaboradores",
        //  route: "/GestionET/puestosColaboradores",
        component: <PuestosColaboradores />,
      },
      {
        name: "Colaboradores",
        key: "colaboradores",
        // route: "/GestionET/colaboradores",
        component: <Colaboradores />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Gestion Diesel",
    key: "gestion-diesel",
    icon: <LocalGasStationIcon fontSize="medium" />,
    collapse: [
      {
        name: "Combustibles",
        key: "combustibles",
        //  route: "/GestionDiesel/combustibles",
        component: <TiposColaboradores />,
      },
      {
        name: "Estaciones De Servicio",
        key: "EstacionesServicio",
        //  route: "/GestionDiesel/EstacionesServicio",
        component: <EstacionesServicio />,
      },
      {
        name: "Cargas de Combustibles",
        key: "puestosColaboradores",
        // route: "/GestionDiesel/cargasCombustibles",
        component: <PuestosColaboradores />,
      },
      {
        name: "Factor Rendimiento",
        key: "factor-rendimiento",
        // route: "/GestionDiesel/factorRendimiento",
        component: <Colaboradores />,
      },
    ],
  },
];

export default routes;
