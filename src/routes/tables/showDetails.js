/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

import {
    View,
    Text,
    Button,
    H1,
    H3,
  } from 'native-base';

export const ShowDetails = props => {
    const {order, close} = props;
    return (
      <View style={styles.showdetailscontent}>
        <H1>Detalhes</H1>
        <H3>{`Pedido ID: ${order.orderId}`}</H3>
        <Text style={styles.showdetailsdate}>
          {new Date(order.createdAt).toLocaleTimeString()}
        </Text>
  
        <ScrollView style={styles.showdetailsdescription}>
          <View style={styles.showdetailsitem}>
            <Text>Atendente: {order.user}</Text>
          </View>
          <View style={styles.showdetailsdescription}>
            <Text>Produtos</Text>
          </View>
          {order.items &&
            order.items.map((item, index) => (
              <View>
                <Text key={index}>{`    ${item.quantity}x ${item.title}`}</Text>
                <Text style={styles.showdetailsdate}>
                  {item.description.join(', ')}
                </Text>
              </View>
            ))}
          <View style={styles.showdetailsitem}>
            <Text>Total de produtos:</Text>
            <Text>
              R${' '}
              {order.total
                .toFixed(2)
                .toString()
                .replace('.', ',')}
            </Text>
          </View>
          <View style={styles.showdetailsitem}>
            <Text>Taxa de serviço:</Text>
            <Text>
              R${' '}
              {order.serviceTax
                .toFixed(2)
                .toString()
                .replace('.', ',')}
            </Text>
          </View>
          <View style={styles.showdetailsitem}>
            <Text>Total final:</Text>
            <Text>
              R${' '}
              {order.final
                .toFixed(2)
                .toString()
                .replace('.', ',')}
            </Text>
          </View>
        </ScrollView>
  
        <Button style={styles.closebutton} onPress={() => close()}>
          <Icon name="times" size={16} color="#fff" />
        </Button>
      </View>
    );
  };

  const styles = StyleSheet.create({
    showdetailsitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
      },
      showdetailsdescription: {
        marginVertical: 15,
      },
      showdetailsdate: {
        fontSize: 10,
        color: 'gray',
      },
      showdetailscontent: {
        padding: 30,
        borderRadius: 5,
        elevation: 5,
        width: '85%',
        maxHeight: '65%',
        backgroundColor: '#fff',
      },
  })