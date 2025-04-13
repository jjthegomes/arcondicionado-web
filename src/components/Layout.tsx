import React, { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Paper,
  Divider,
  alpha,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Build as BuildIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Add as AddIcon,
  CalendarToday as CalendarTodayIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  text?: string;
  icon?: React.ReactNode;
  path?: string;
  divider?: boolean;
}
interface SubMenuItem {
  text?: string;
  parent?: string;
  icon?: React.ReactNode;
  path?: string;
  divider?: boolean;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  const menuItems: MenuItem[] = [
    { text: "Início", icon: <HomeIcon />, path: "/" },
    { text: "Serviços", icon: <BuildIcon />, path: "/services" },
    { text: "Clientes", icon: <PeopleIcon />, path: "/clients" },
    { text: "Orçamentos", icon: <DescriptionIcon />, path: "/budgets" },
    { text: "Agenda", icon: <CalendarTodayIcon />, path: "/calendar" },
    { text: "Relatórios", icon: <AssessmentIcon />, path: "/reports" },
    { divider: true },
    {
      text: "Notificações",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
    { text: "Configurações", icon: <SettingsIcon />, path: "/settings" },
    { text: "Ajuda", icon: <HelpIcon />, path: "/help" },
  ];

  const subMenuItems: SubMenuItem[] = [
    {
      text: "Novo Serviço",
      icon: <BuildIcon />,
      path: "/services/new",
      parent: "Serviços",
    },
    {
      text: "Novo Orçamento",
      icon: <DescriptionIcon />,
      path: "/budgets/new",
      parent: "Orçamentos",
    },
    {
      text: "Novo Cliente",
      icon: <PersonIcon />,
      path: "/clients/new",
      parent: "Clientes",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getSelectedItem = (item: MenuItem | SubMenuItem) => {
    if (location.pathname === item.path) return true;

    const subItem = subMenuItems.find(
      (subMenu) => subMenu.parent === item.text
    );
    if (subItem)
      return location.pathname.split("/")[1] === subItem?.path?.split("/")[1];

    return false;
  };

  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => item?.path === currentPath);
    const subMenuItem = subMenuItems.find((item) => item?.path === currentPath);

    return currentItem
      ? currentItem.text
      : subMenuItem
      ? subMenuItem.parent
      : "Ar Condicionado JF";
  };

  const getCurrentPageSubTitle = () => {
    const currentPath = location.pathname;
    const subMenuItem = subMenuItems.find((item) => item?.path === currentPath);

    return subMenuItem ? subMenuItem.text : null;
  };

  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear local storage, reset state, redirect to login, etc.
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ 
      height: "100%", 
      backgroundColor: "background.paper",
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Ar Condicionado
        </Typography>
      </Box>
      <List sx={{ px: 2, py: 2, flex: 1 }}>
        {menuItems.map((item, index) =>
          item.divider ? (
            <Divider
              key={index}
              sx={{
                my: 2,
                opacity: 0.5,
              }}
            />
          ) : (
            <ListItem
              button
              key={item.text}
              onClick={() => item.path && navigate(item.path)}
              sx={{
                borderRadius: "12px",
                mb: 0.5,
                transition: "all 0.2s ease-in-out",
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  },
                },
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: getSelectedItem(item)
                    ? "primary.main"
                    : alpha(theme.palette.text.primary, 0.6),
                  transition: "color 0.2s ease-in-out",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "0.95rem",
                    fontWeight: getSelectedItem(item) ? 600 : 400,
                    color: getSelectedItem(item)
                      ? "primary.main"
                      : "text.primary",
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              />
              {getSelectedItem(item) && (
                <Box
                  sx={{
                    width: 4,
                    height: 32,
                    backgroundColor: "primary.main",
                    borderRadius: "0 4px 4px 0",
                    position: "absolute",
                    left: -8,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              )}
            </ListItem>
          )
        )}
      </List>
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1,
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            }
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );

  React.useEffect(() => {
    const pathToIndex: { [key: string]: number } = {
      "/": 0,
      "/services": 1,
      "/budgets": 2,
      "/calendar": 3,
      "/reports": 4,
      "/notifications": 5,
      "/settings": 6,
      "/help": 7,
    };
    setValue(pathToIndex[location.pathname] || 0);
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        pb: 7,
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontWeight: 600,
              }}
            >
              {getCurrentPageTitle()}
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{
                color: "text.secondary",
                "& .MuiBreadcrumbs-separator": {
                  mx: 1,
                },
              }}
            >
              <Link
                underline="hover"
                color="inherit"
                component="button"
                onClick={() => navigate("/")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  p: 0,
                  font: "inherit",
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <HomeIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
                Início
              </Link>
              {location.pathname !== "/" && (
                <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                  <Link
                    underline="hover"
                    color="inherit"
                    component="button"
                    onClick={() => navigate(location.pathname.split("/")[1])}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      p: 0,
                      font: "inherit",
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {getCurrentPageTitle()}
                  </Link>
                </Typography>
              )}
              {location.pathname.split("/").length > 2 && (
                <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                  {getCurrentPageSubTitle()}
                </Typography>
              )}
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                border: "none",
                boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: "64px",
        }}
      >
        {children}
      </Box>

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <Fab
            color="primary"
            sx={{
              position: "fixed",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
            }}
            onClick={() => navigate("/services/new")}
          >
            <AddIcon />
          </Fab>

          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 999,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
            elevation={0}
          >
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                const routes = [
                  "/",
                  "/services",
                  "/budgets",
                    "/calendar",
                    "/reports",
                    "/notifications",
                    "/settings",
                    "/help",
                ];
                navigate(routes[newValue]);
              }}
              sx={{
                height: 60,
                backgroundColor: "background.paper",
                "& .MuiBottomNavigationAction-root": {
                  minWidth: "auto",
                  padding: "6px 0",
                  color: alpha(theme.palette.text.primary, 0.6),
                },
                "& .Mui-selected": {
                  color: "primary.main",
                },
              }}
            >
              <BottomNavigationAction label="Início" icon={<HomeIcon />} />
              <BottomNavigationAction label="Serviços" icon={<BuildIcon />} />
              <BottomNavigationAction label="" disabled />
              <BottomNavigationAction
                label="Orçamentos"
                icon={<DescriptionIcon />}
              />
              <BottomNavigationAction label="Perfil" icon={<PersonIcon />} />
            </BottomNavigation>
          </Paper>
        </>
      )}
    </Box>
  );
}
