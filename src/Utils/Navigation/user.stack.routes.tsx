import React from "react";

//@libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//@screens
import { Home } from "@Screens/Home";
import { Product } from "@Screens/Product";
/* import { Order } from '@Screens/Order'; */

//@utils
import { useAuth } from "@Hooks/auth";

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserRouterStack() {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="Home" component={Home} />
          <Screen name="Produto" component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name="Produto" component={Product} />
        </Group>
      )}
    </Navigator>
  );
}
