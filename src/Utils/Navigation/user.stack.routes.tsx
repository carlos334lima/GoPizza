import React from "react";

//@libraries
import { createStackNavigator } from "@react-navigation/stack";

//@screens
import { Home } from "@Screens/Home";
import { Product } from "@Screens/Product";
/* import { Order } from '@Screens/Order'; */

//@utils
import { useAuth } from "@Hooks/auth";

const { Navigator, Screen } = createStackNavigator();

export function UserRouterStack() {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
         {
        user?.isAdmin ? (
            <>
            <Screen name="Home" component={Home} />
            <Screen name="Product" component={Product} />
            </>
        ) : (
           <>
           {/*  <Screen name="UserTabRoutes" component={UserTabRoutes} />
            <Screen name="order" component={Order} /> */}
           </>
        )
      }
    </Navigator>
  );
}
