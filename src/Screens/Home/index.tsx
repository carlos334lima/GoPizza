import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

//@libraries
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//@components

//@assets
import happyEmoji from "@Assets/happy.png";

//@styles
import Theme from "@Theme/index";
import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  Title,
} from "./styles";
import { Search } from "@Components/Search";

const Home = () => {
  return (
    <Container>
      <Header colors={Theme.COLORS.GRADIENT}>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={() => {}}>
          <Icon name="logout" color={Theme.COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search onSearch={() => {}} onClear={() => {}} />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList 
        data={[1,2,3]}
        keyExtractor={item => item.id}
       /*  renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )} */
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24
        }}
      />
    </Container>
  );
};

export { Home };
