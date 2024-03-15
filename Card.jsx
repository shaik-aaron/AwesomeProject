import {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const Card = ({navigation}) => {
  const [cards, setCards] = useState([]);

  async function openGallery() {
    let res = await launchImageLibrary({mediaType: 'photo', selectionLimit: 5});
    let images = [];
    res.assets.map((result, index) => {
      images.push({
        tag: `image${index}`,
        image: result.uri,
      });
    });
    console.log(images);
    setCards(prev => [
      ...prev,
      {
        name: `Card${cards.length + 1}`,
        images: images,
      },
    ]);
  }

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
});
