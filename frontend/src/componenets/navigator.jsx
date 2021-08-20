import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import PublicIcon from "@material-ui/icons/Public";

const navigations = [{ to: "/", label: "", icon: <PublicIcon /> }];
const navigationButtons = navigations.map((navigation) => (
  <BottomNavigationAction
    key={navigation.label}
    component={Link}
    to={navigation.to}
    label={navigation.label}
    value={navigation.label.toLowerCase()}
    icon={navigation.icon}
  />
));

const Navigator = () => {
  const [value, setValue] = useState(navigations[0].label.toLowerCase());
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      {navigationButtons}
    </BottomNavigation>
  );
};

export default Navigator;
