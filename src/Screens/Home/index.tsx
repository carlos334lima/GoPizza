import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

//@libraries
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

//@components
import { Search } from "@Components/Search";
import { ListEmpty } from "@Components/ListEmpty";
import { ProductCard } from "@Components/ProductCard";
import { RenderMessageTop } from "@Components/MessageInfo";

//@assets
import happyEmoji from "@Assets/happy.png";

//@utils
import { PizzaResponse, ProductProps } from "@Types/interfaces";

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
import { helpers } from "@Utils/Helpers";
import { useAuth } from "@Hooks/auth";
import { GO_PIZZA } from "@Utils/Constants";

const Home = () => {
  const { user } = useAuth();

  const { navigate } = useNavigation();
  const [search, setSearch] = useState("");
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetchPizzas("");
  }, []);

  async function fetchPizzas(value: string) {
    const formattedValue = search.toLocaleLowerCase().trim();

    firestore()
      .collection(GO_PIZZA.COLLECTION_DATABASE)
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setPizzas(data && data);
      })
      .catch(() => {
        RenderMessageTop("Não foi possível realizar a consulta!", "danger");
      });
  }

  async function handleSearch() {
    fetchPizzas(search);
  }

  async function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  async function handleOpen(id: string) {
    if (id) {
      firestore()
        .collection(GO_PIZZA.COLLECTION_DATABASE)
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as PizzaResponse;

          const data = {
            name: product.name,
            image: product.photo_url,
            description: product.description,
            photoPath: product.photo_path,
            sizeP: product.prices_sizes.p,
            sizeM: product.prices_sizes.m,
            sizeG: product.prices_sizes.g,
          };

          const route = user?.isAdmin ? "Product" : "order";
          navigate(route, { data });
        }).catch(() => {
          RenderMessageTop("Não foi possível realizar a consulta!", "danger");
        });
    }
  }

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

      <Search
        value={search}
        onSearch={handleSearch}
        onChangeText={setSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty message="ops, não há pizzas a serem exibidas!" />
        )}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
};

export { Home };
