import {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from './storage';

const Card = ({navigation}) => {
  const [cards, setCards] = useState([]);

  async function openGallery() {
    let res = await launchImageLibrary({mediaType: 'photo', selectionLimit: 5});
    let images = [];
    res.assets.map((result, index) => {
      images.push({
        tag: `M${index + 1}`,
        image: result.uri,
      });
    });
    setCards(prev => [
      ...prev,
      {
        name: `Card${cards.length + 1}`,
        images: images,
      },
    ]);
  }

  useEffect(() => {
    storage
      .load({
        key: 'Cards',
        id: 1000,
      })
      .then(data => {
        setCards(data.cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    storage.save({
      key: 'Cards',
      id: 1000,
      data: {
        cards: cards,
      },
    });
  }, [cards]);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        return (
          <Pressable
            onPress={() => navigation.navigate('Comments', card.images)}
            key={index}
            style={styles.cardContainer}>
            <Image
              source={{uri: card.images[0].image}}
              height={100}
              width={100}
            />
            <Text style={styles.cardHeading}>{`Card${index + 1}`}</Text>
          </Pressable>
        );
      })}
      <Pressable onPress={openGallery} style={styles.addCard}>
        <Text>+</Text>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column',
    gap: 20,
    paddingTop: 20,
    backgroundColor: 'grey',
  },
  cardContainer: {
    width: Dimensions.get('window').width - 40,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  addCard: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 10000,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeading: {
    fontSize: 16,
    color: 'black',
  },
});
