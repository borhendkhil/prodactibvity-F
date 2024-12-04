import Dashboard from 'layouts/dashboard';
import Department from 'layouts/department';
import Billing from 'layouts/billing';
import RTL from 'layouts/rtl';
import Notifications from 'layouts/notifications';
import Profile from 'layouts/profile';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';
import EditProfile from 'layouts/profile/components/EditProfile';


// @mui icons
import Icon from '@mui/material/Icon';


const routes = [
 
  {
    type: 'collapse',
    name: 'Tasks',
    key: 'Tasks',
    icon: <Icon fontSize="small">Tasks</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'Department',
    key: 'department',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/department',
    component: <Department />,
  },
  {
    type: 'collapse',
    name: 'Billing',
    key: 'billing',
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: '/billing',
    component: <Billing />,
  },
  {
    type: 'collapse',
    name: 'RTL',
    key: 'rtl',
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: '/rtl',
    component: <RTL />,
  },
  {
    type: 'collapse',
    name: 'Notifications',
    key: 'notifications',
    icon: <Icon fontSize="small">notifications</Icon>,
    route: '/notifications',
    component: <Notifications />,
  },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'profile',
    icon: <Icon fontSize="small">person</Icon>,
    route: '/profile',
    component: <Profile />,
  },
  {
    type: 'collapse',
    name: 'Sign In',
    key: 'sign-in',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    type: 'collapse',
    name: 'Sign Up',
    key: 'sign-up',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
{
  type: 'collapse',
  name: 'Edit Profile',
  key: 'editprofile',
  icon: <Icon fontSize="small">edit</Icon>,
  route: '/editprofile',
  component: <EditProfile />,
}
];

export default routes;
