import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image
} from 'native-base';
import {
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@mapbox/react-native-mapbox-gl'

const dataMock = [
  {
      "costumer": "Jean Felipe de Melo",
      "delivered": false,
      "_id": "5e25249f3ededf51b947ee45",
      "paymentMethod": "DINHEIRO",
      "address": {
          "street": "rua Altamiro Barcelos Dutra",
          "number": "1396",
          "district": "Barra da Lagoa",
          "ref": "Em frente à Central da Barra",
          "geo": {
              "Latitude": -27.57544,
              "Longitude": -48.42764
          }
      },
      "orderId": "X08Bl",
      "order": {
          "user": "9ICA - Jean Felipe de Melo",
          "serviceTax": 0,
          "items": [
              {
                  "quantity": 1,
                  "code": "10*10102010",
                  "title": "10 - PIZZA SIMPLES PEQUENA",
                  "description": [
                      "1010 - MUSSARELA",
                      "2010 - LA SOLANA"
                  ],
                  "owner": "Geral",
                  "price": 33,
                  "subtotal": 33
              }
          ],
          "total": 0,
          "final": 0,
          "paid": 0,
          "remaining": 0,
          "change": 0,
          "payments": [],
          "closed": false,
          "_id": "5e25249f3ededf51b947ee46",
          "orderId": "X08Bl",
          "createdAt": "2020-01-20T03:55:11.385Z",
          "updatedAt": "2020-01-20T03:55:11.385Z",
          "__v": 0
      },
      "createdAt": "2020-01-20T03:55:12.729Z",
      "updatedAt": "2020-01-20T03:55:12.729Z",
      "__v": 0
  },
  {
      "costumer": "Ivona Petrova",
      "delivered": false,
      "_id": "5e252ba83ededf51b947ee47",
      "paymentMethod": "DINHEIRO",
      "address": {
          "street": "Travessa Maria Eduvirgens da Conceição",
          "number": "86",
          "district": "Barra da Lagoa",
          "ref": "cú do mundo",
          "geo": {
              "Latitude": -27.574565,
              "Longitude": -48.4243514
          }
      },
      "orderId": "8ydXo",
      "order": {
          "user": "9ICA - Jean Felipe de Melo",
          "serviceTax": 0,
          "items": [
              {
                  "quantity": 1,
                  "code": "10*10102010",
                  "title": "10 - PIZZA SIMPLES PEQUENA",
                  "description": [
                      "1010 - MUSSARELA",
                      "2010 - LA SOLANA"
                  ],
                  "owner": "Geral",
                  "price": 33,
                  "subtotal": 33
              }
          ],
          "total": 0,
          "final": 0,
          "paid": 0,
          "remaining": 0,
          "change": 0,
          "payments": [],
          "closed": false,
          "_id": "5e252ba83ededf51b947ee48",
          "orderId": "8ydXo",
          "createdAt": "2020-01-20T04:25:12.625Z",
          "updatedAt": "2020-01-20T04:25:12.625Z",
          "__v": 0
      },
      "createdAt": "2020-01-20T04:25:14.146Z",
      "updatedAt": "2020-01-20T04:25:14.146Z",
      "__v": 0
  }
]


const Deliveries = props => {
  const {navigation} = props;
  const [currentPosition, setCurrentPosition] = useState();
  MapboxGL.setAccessToken('pk.eyJ1IjoiZ2hhbml6YWRldiIsImEiOiJjazVqeHYyOTgwOGJ1M21wbHp3NHd6OGRlIn0.dkBkyxRxOupRyQ_wjGQkCA');

  async function requestGeoPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Acessar GPS',
        message:
          'É preciso autorizar o aplicativo para ter acesso aos mapas',
        buttonNeutral: 'Não agora',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    ).then(status => {
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
              setCurrentPosition(position);
          },
          (error) => {
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      ).catch(error => console.warn(error))
      } else {
        console.log('Camera permission denied');
      }
    })

  }

  
const timeFormat = time => {
    let factor = new Date().getTime() - new Date(time).getTime();
    factor = factor / 60000;
    if(factor > 60){
        return `${Math.floor(factor/60)}h ${Math.floor(factor - (Math.floor(factor/60) * 60))}m`
    }
    return Math.floor(factor) + ' minuto(s)';
}

  const Popup = props => {
    const {delivery} = props;
    const {street, number, district, ref} = delivery.address;
    return (
      <View style={styles.popup}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#444'}}>{delivery.costumer}</Text>
            <Text style={{fontSize: 16, color: '#555'}}>{delivery.orderId}</Text>
        </View>
        <Text style={{fontSize: 10, color: '#666'}}>Aberto há {timeFormat(delivery.createdAt)}</Text>
        <Text style={{fontSize: 11, color: '#555'}}>{street}, nº {number}, {district} - Florianópolis (referência: {ref})</Text>
      </View>
    );
  }

  const renderPoints = (data) => {
    const result = data.map(delivery => (
    <MapboxGL.PointAnnotation
        id={delivery.orderId}
        coordinate={[delivery.address.geo.Longitude, delivery.address.geo.Latitude]}
      >
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <MapboxGL.Callout children={<Popup delivery={delivery} />} title={`Pedido ${delivery.orderId}`} />
      </MapboxGL.PointAnnotation>))
    return result;
  }
  

useEffect(()=>{
  requestGeoPermission();
  try {
    Geolocation.getCurrentPosition(
      (position) => {
          setCurrentPosition(position);
      },
      (error) => {
          console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  } catch(e) {
    console.log(e)
  }
},[])

  return (
    <View style={StyleSheet.absoluteFill}>
      {currentPosition && (
        <MapboxGL.MapView zoomLevel={14} centerCoordinate={[currentPosition.coords.longitude, currentPosition.coords.latitude]} style={{flex: 1}}>
          {renderPoints(dataMock)}
        </MapboxGL.MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  annotationContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffbe5b',
  },
  popup: {
    width: 220,
    minHeight: 110,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
    elevation: 5
  }
});


export default Deliveries;