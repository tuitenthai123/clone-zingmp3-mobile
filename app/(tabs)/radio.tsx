import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

interface NewsongItem {
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  thumbnailM: string;
  releaseDate: number;
}

const ExampleComponent = () => {
  const [columnsnewsong, setColumnsnewsong] = useState<NewsongItem[][]>([]);

  // Hàm cập nhật dữ liệu mới
  const fetchData = () => {
    // Giả lập dữ liệu mới để cập nhật state
    const newNewsongs: NewsongItem[] = [
      { encodeId: '1', title: 'Song 1', artistsNames: 'Artist 1', thumbnail: 'https://via.placeholder.com/60', thumbnailM: 'https://via.placeholder.com/60', releaseDate: Date.now() },
      { encodeId: '2', title: 'Song 2', artistsNames: 'Artist 2', thumbnail: 'https://via.placeholder.com/60', thumbnailM: 'https://via.placeholder.com/60', releaseDate: Date.now() },
      // Thêm nhiều item hơn
    ];

    // Chia dữ liệu thành các cột
    const chunkSize = 3;
    const columns = newNewsongs.reduce((resultArray: NewsongItem[][], item: NewsongItem, index: number) => {
      const chunkIndex = Math.floor(index / chunkSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

    setColumnsnewsong(columns);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Cập nhật dữ liệu</Text>
      </TouchableOpacity>

      <ScrollView horizontal={true} style={styles.scrollView}>
        {columnsnewsong.map((column, columnIndex) => (
          <View key={columnIndex} style={styles.column}>
            {column.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.row}>
                  <Image style={styles.coverimg} source={{ uri: item.thumbnail }} />
                  <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                      {item.title}
                    </Text>
                    <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
                      {item.artistsNames}
                    </Text>
                  </View>
                </View>
                <View>
                  <Entypo name="dots-three-vertical" size={18} color="#9fa1a0" />
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#8e44ad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  scrollView: {
    marginTop: 10,
  },
  column: {
    width: 300,
    marginRight: 10,
    gap: 10,
  },
  itemContainer: {
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coverimg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 4,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontWeight: '400',
    color: '#9fa1a0',
    fontSize: 12,
  },
});

export default ExampleComponent;
