// material
import { styled } from '@mui/material/styles';
//
import { isEmpty } from 'lodash';

import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { routesString } from '../../constants/index';
import useUserStore from '../../stores/user';
import useAuthStore from '../../stores/auth';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { me, fetchMe } = useUserStore((state) => state);
  const accessToken = useAuthStore((state) => state.access.token);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!accessToken) {
      return navigate(routesString.LOGIN);
    }

    if (isEmpty(me)) {
      return fetchMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
