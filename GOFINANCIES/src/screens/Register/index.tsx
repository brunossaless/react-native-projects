import { 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback,
  Alert
} from "react-native";

import { useEffect, useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import { InputForm } from "../../components/Form/InputForm";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'

import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native'
import { useAuth } from "../../hooks/auth";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import React from "react";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required("Nome é obrigatório"),
  amount: Yup
    .number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const { 
    control, 
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) return Alert.alert('Selecione o Tipo da transação')

    if(category.key === 'category') return Alert.alert('Selecione a categoria')
    

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`;


      const data = await AsyncStorage.getItem(dataKey);
      const currentData = JSON.parse(data) || [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      //salva no dispositivo do usuário
      //tem que converter o objeto para texto
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      //limpando a coleção
      // async function removeAll(){
      //   await AsyncStorage.removeItem(dataKey);
      // }

      // removeAll();

      reset();
      setTransactionType('');
      setCategory({
        key: "category",
        name: "Categoria",
      });

      //navegação
      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }
  }

  return (
    //Clicar em qualquer outro lugar fecha o teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              //Deixa só a primeira palavra com a p letra maiuscula
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActivity={transactionType === "positive"}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActivity={transactionType === "negative"}
              />
            </TransactionsTypes>

            <CategorySelectButton
              testID="button-category"
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal testID="modal-category" visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCatergory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
