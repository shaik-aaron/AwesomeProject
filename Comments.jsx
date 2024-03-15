import {useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Comments = ({route}) => {
  console.log(route.params);

  const [comment, setComment] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  console.log(comment);

  return (
    <View style={styles.container}>
      <View>
        {comment.includes('#') ? (
          <View style={styles.imagesTagsContainer}>
            {route.params.map((image, index) => {
              if (!selectedImages.includes(image.image)) {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedImages(prev => [...prev, image.image]);
                      setComment(prev => {
                        let temp = [...prev].filter(letter => letter !== '#');
                        return temp.join('');
                      });
                    }}>
                    <Text style={{color: 'blue'}}>{`#${image.tag}`}</Text>
                  </Pressable>
                );
              }
            })}
          </View>
        ) : (
          <View></View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => setComment(text)}
            value={comment}
            placeholder="Add your comment"
          />
          <Button title="Send"></Button>
        </View>
        {selectedImages.length > 0 && (
          <View style={styles.imagesContainer}>
            {selectedImages.map((image, index) => {
              return (
                <Image
                  key={index}
                  height={70}
                  width={70}
                  source={{uri: image}}
                />
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    width: Dimensions.get('window').width,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
  },
  imagesTagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    paddingLeft: 16,
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
});

export default Comments;
