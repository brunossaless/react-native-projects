import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from "react";
import { useTheme } from 'styled-components'
import { useAuth } from "../../hooks/auth";

import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighLightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton,
    LoadContainer
} from "./styles";
import { LastTransaction } from "../../components/HighLightCard/styles";

export interface DataListProps extends TransactionCardProps{
    id: string;
}

interface HighLightProps {
    amount: string;
    lastTransaction: string;

}
interface HighLightData {
    entries: HighLightProps;
    expensives: HighLightProps;
    total: HighLightProps
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

    const theme = useTheme();

    const { signOut, user } = useAuth();

    function getLastTransactionDate(
        collection: DataListProps[], 
        type: 'positive' | 'nagtive'
        ){
            const collectionFiltered = collection
            .filter(transaction => transaction.type === type);

            if(collectionFiltered.length === 0){
                return 0;
            }

            const lastTransaction = new Date (
            new Date(
            Math.max.apply(Math, collectionFiltered
            .map(transaction => new Date(transaction.date).getTime()))));
            
            return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`
        }

    async function loadTransaction(){
      const dataKey = `@gofinance:transactions_user:${user.id}`;
      const response = await AsyncStorage.getItem(dataKey);

      const transactions = response ? JSON.parse(response) : [];

      let entrieTotal = 0;
      let expensiveTotal = 0;

      const transactionFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {
            
            if(item.type === 'positive'){
                entrieTotal += Number(item.amount);
            }
            else {
                expensiveTotal += Number(item.amount);
            }

            // formatando o number para aparecer o R$
            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // formatando a data direitinho
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
        });

        setTransactions(transactionFormatted)
        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        
        const totalInterval = lastTransactionExpensives === 0 ?
        "Não há transações" :
        `01 a ${lastTransactionExpensives}`
        
        const total = entrieTotal - expensiveTotal

        setHighLightData({
        //transformando o numero em uma string formatada para BR
            entries: {
                amount: entrieTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionEntries === 0 ?
                "Não há transações" : 
                `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionExpensives === 0 ?
                "Não há transações" : 
                `Última saida dia ${lastTransactionExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        });

        setIsLoading(false);

    }

    useEffect(() => {
        loadTransaction();
  
    }, []);

    //use effect para quando a página estiver em foco
    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []));

    return (
        <Container>
            {
                isLoading ? 
                    <LoadContainer>
                        <ActivityIndicator 
                            color={theme.colors.primary}
                            size={"large"}
                        />
                    </LoadContainer> 
                    : 
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: user.photo }} />
                                <User>
                                    <UserGreeting>Olá, </UserGreeting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>

                            <LogoutButton onPress={signOut}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighLightCards>
                        <HighLightCard
                            type="up"
                            title="Entradas"
                            amount={highLightData.entries?.amount}
                            lastTransaction={highLightData.entries.lastTransaction}
                        />

                        <HighLightCard
                            type="down"
                            title="Saidas"
                            amount={highLightData.expensives?.amount}
                            lastTransaction={highLightData.expensives.lastTransaction}
                        />

                        <HighLightCard
                            type="total"
                            title="Total"
                            amount={highLightData.total?.amount}
                            lastTransaction={highLightData.total?.lastTransaction}
                        />

                    </HighLightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionsList 
                            data={transactions}
                            key={item => item.id}
                            renderItem={ ({ item }) => <TransactionCard data={item} />}
                        />

                    </Transactions>
                </>
            }   
        </Container>
    )
}