import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { Bullet } from "../Bullet";

import {
  Container,
  ImageIndexs,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
    const [imageIndex, setImageIndex] = useState(0);

    //acessar apenas a função
    //no flatlist ele nao aceita funções comuns, PERFORMANCE 
    const indexChanged = useRef(( info: ChangeImageProps ) => {
        const index = info.viewableItems[0].index!;
        setImageIndex(index);
    });

  return (
    <Container>
      <ImageIndexs>
        {
            imagesUrl.map((item, index) => (
                <Bullet 
                    key={String(item.id)}
                    active={index === imageIndex} 
                /> 
            ))
        }
      </ImageIndexs>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: item.photo }}
              //imagem sempre fique no seu tamanho, do carImage
              resizeMode="contain"
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
