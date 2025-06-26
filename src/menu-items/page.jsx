// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import UserOutlined from '@ant-design/icons/UserOutlined';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'profile1',
      title: 'Profile',
      type: 'item',
      url: '/userprofile',
      icon: icons.UserOutlined,
      // target: true
    }
  ]
};

export default pages;
