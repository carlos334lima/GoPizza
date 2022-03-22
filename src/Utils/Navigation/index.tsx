import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { Home } from "@Screens/Home";
import { useAuth } from "@Hooks/auth";
import { SignIn } from "@Screens/SignIn";
import { UserRouterStack } from "./user.stack.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <UserRouterStack /> : <SignIn />}
    </NavigationContainer>
  );
}