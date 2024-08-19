import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import moment from 'moment';
import "moment/locale/vi"


const index = () => {

  interface BannerItem {
    sectionId: string;
    banner: string;
    cover: string;
    encodeId: string;
  }

  interface Recommentperson {
    encodeId: string;
    title: string;
    artistsNames: string;
    thumbnail: string;
    thumbnailM: string;
    releaseDate: number;
  }

  interface Hubitem {
    cover: string;
    description: string;
    encodeId: string;
    thumbnail: string;
    thumbnailHasText: string;
    thumbnailR: string;
    title: string;
  }

  interface Recommentnewsong {
    encodeId: string;
    title: string;
    artistsNames: string;
    thumbnail: string;
    thumbnailM: string;
    releaseDate: number;
  }

  interface newsong {
    vPop: Recommentnewsong[];
    others: Recommentnewsong[];
    all: Recommentnewsong[];
  }

  interface trenddingplaylistitem {
    viewType: string;
    sectionType: string;
    sortDescription: string;
    thumbnailM: string
    title: string;
    items: SubItem[];
  }

  interface SubItem {
    title: string;
    thumbnailM: string;
    sortDescription: string; // Đảm bảo thuộc tính này tồn tại
  }

  const width = Dimensions.get('window').width;
  const [Banner, setBanner] = useState<BannerItem[]>([])
  const [goiy, setgoiy] = useState<Recommentperson[]>([])
  const [hub, sethub] = useState<Hubitem[]>([])
  const [trenddingplaylist, settrenddingplaylist] = useState<trenddingplaylistitem[]>([])
  const [newsongData, setNewsongData] = useState<Recommentnewsong[]>([]);
  const [newsong, setNewsong] = useState<newsong | null>(null); // Đổi tên biến
  const [columns, setColumns] = useState<Recommentperson[][]>([]);
  const [columnsnewsong, setColumnsnewsong] = useState<Recommentperson[][]>([]);
  const [selectedButton, setSelectedButton] = useState<string>('Tất cả');

  const sliceArrayIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  useEffect(() => {
    const getHome = async () => {
      try {
        const responsehome = await axios.get(
          'https://a239-167-235-8-252.ngrok-free.app/api/getHome',
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "true"
            }
          }
        );
        const responsegoiy = await axios.get(
          'https://a239-167-235-8-252.ngrok-free.app/api/getGoiy',
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "true"
            }
          }
        );
        const responsehub = await axios.get(
          'https://a239-167-235-8-252.ngrok-free.app/api/getHub',
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "true"
            }
          }
        );
        setColumns(sliceArrayIntoChunks(responsegoiy.data, 3));
        setColumnsnewsong(sliceArrayIntoChunks(responsehome?.data?.data?.items[2]?.items.all, 3));
        const homeData = responsehome.data?.data?.items[2]?.items;
        const conmeo: trenddingplaylistitem[] = responsehome.data.data.items
        const filterarr = conmeo.filter(conmeo => conmeo.viewType === "slider" && conmeo.sectionType === "playlist");
        settrenddingplaylist(filterarr)
        //console.log(filterarr)
        console.log(responsehome.data.data)
        setNewsongData(homeData); // Set dữ liệu cho mảng
        setNewsong(homeData);
        setNewsongData(responsehome?.data?.data?.items[2]?.items)
        sethub(responsehub.data?.data?.featured?.items);
        setBanner(responsehome?.data?.data?.items[0]?.items);
        setgoiy(responsegoiy.data);
      } catch (error) {
        console.error(error);
      }
    };
    getHome();
  }, [])

  const handlelammoigoiy = async () => {
    const responsegoiy = await axios.get(
      'https://a239-167-235-8-252.ngrok-free.app/api/getGoiy',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "true"
        }
      }
    );
    console.log(responsegoiy)
    setColumns(sliceArrayIntoChunks(responsegoiy.data, 3));
  }

  const handlerendervietnamsong = () => {

    setSelectedButton('Việt Nam')

    if (newsong) {

      setColumnsnewsong(sliceArrayIntoChunks(newsong.vPop, 3));
    }
  }
  const handlerenderorthersong = () => {
    setSelectedButton('Quốc tế')
    if (newsong) {

      setColumnsnewsong(sliceArrayIntoChunks(newsong.others, 3));
    }
  }
  const handlerenderallsong = () => {
    setSelectedButton('Tất cả')
    if (newsong) {

      setColumnsnewsong(sliceArrayIntoChunks(newsong.all, 3));
    }
  }

  return (
    <>
      <View style={{
        flexDirection: 'row',
        justifyContent: "space-between",
        gap: 5,
        padding: 10,
        alignItems: 'center',
      }}>
        <View>
          <Text style={style.Title}>
            Khám Phá
          </Text>
        </View>
        <View style={style.congcu}>
          <Text><Feather name="mic" size={27} color="black" /></Text>
          <Text><Entypo name="magnifying-glass" size={29} color="black" /></Text>
        </View>
      </View>
      <ScrollView style={{ marginBottom: 30 }}>
        <View>
          {/* banner */}
          <View style={{ marginTop: 6 }}>
            <Carousel
              data={Banner}
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              scrollAnimationDuration={1000}
              mode='parallax'
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image style={style.tinyBanner} source={{ uri: item.banner, }} />
                </View>
              )}
            />
          </View>
          {/* gợi ý bài hát */}
          <View style={{ marginLeft: 6, marginRight: 6 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
              <View>
                <Text style={style.Titlesmall}>Bắt đầu nghe từ một bài hát</Text>
                <Text style={style.Title} >Gợi ý cho bạn</Text>
              </View>
              <TouchableOpacity activeOpacity={0.6} style={style.button}>
                <Text style={style.buttonText} onPress={handlelammoigoiy}>Làm mới</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView horizontal={true} style={style.scrollView}>
            {columns.map((column, columnIndex) => (
              <View key={columnIndex} style={style.column}>
                {column.map((item, index) => (
                  <View key={index} style={style.itemContainer}>
                    <View style={style.row}>
                      <Image style={style.coverimg} source={{ uri: item.thumbnail, }} />
                      <View style={style.textContainer}>
                        <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
                          {item.title}
                        </Text>
                        <Text style={style.artist} numberOfLines={1} ellipsizeMode="tail">
                          {item.artistsNames}
                        </Text>
                      </View>
                    </View>
                    <View><Entypo name="dots-three-vertical" size={18} color="#9fa1a0" /></View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          {/* chủ đề và thể loại */}
          <View style={{ marginLeft: 6, marginRight: 6, padding: 5, alignItems: 'center', flexDirection: 'row', gap: 6 }}>
            <Text style={style.Title}>Chủ đề & thể loại</Text><AntDesign style={{ marginTop: 5 }} name="right" size={20} color="black" />
          </View>

          <ScrollView horizontal={true} style={style.scrollView}>
            {hub.map((column, columnIndex) => (
              <View key={columnIndex} style={style.columnhub}>
                <Image style={style.coverimghub} source={{ uri: column.thumbnailHasText }} />
              </View>
            ))}
          </ScrollView>
          {/* Mới Phát Hành */}
          <View style={{ marginLeft: 6, marginRight: 6, marginTop: 20, padding: 5, alignItems: 'center', flexDirection: 'row', gap: 6 }}>
            <Text style={style.Title}>Mới phát hành</Text><AntDesign style={{ marginTop: 5 }} name="right" size={20} color="black" />
          </View>
          <View style={{ marginLeft: 6, marginBottom: 10, marginTop: 10, flexDirection: 'row', gap: 5 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                style.buttonnewsong,
                selectedButton === 'Tất cả' ? style.selectedButton : null,
              ]}
              onPress={handlerenderallsong}
            >
              <Text style={[
                style.buttonText,
                selectedButton === 'Tất cả' ? style.selectedButtonText : null,
              ]}>Tất cả</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                style.buttonnewsong,
                selectedButton === 'Việt Nam' ? style.selectedButton : null,
              ]}
              onPress={handlerendervietnamsong}
            >
              <Text style={[
                style.buttonText,
                selectedButton === 'Việt Nam' ? style.selectedButtonText : null,
              ]}>Việt Nam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                style.buttonnewsong,
                selectedButton === 'Quốc tế' ? style.selectedButton : null,
              ]}
              onPress={handlerenderorthersong}
            >
              <Text style={[
                style.buttonText,
                selectedButton === 'Quốc tế' ? style.selectedButtonText : null,
              ]}>Quốc tế</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} style={style.scrollView}>
            {columnsnewsong.map((column, columnIndex) => (
              <View key={columnIndex} style={style.column}>
                {column.map((item, index) => (
                  <View key={index} style={style.itemContainer}>
                    <View style={style.row}>
                      <Image style={style.coverimg} source={{ uri: item.thumbnail, }} />
                      <View style={style.textContainer}>
                        <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
                          {item.title}
                        </Text>
                        <Text style={style.artist} numberOfLines={1} ellipsizeMode="tail">
                          {item.artistsNames}
                        </Text>
                        <Text style={style.artist} numberOfLines={1} ellipsizeMode="tail">
                          {moment(item.releaseDate * 1000).fromNow()}
                        </Text>
                      </View>
                    </View>
                    <View><Entypo name="dots-three-vertical" size={18} color="#9fa1a0" /></View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          {/* trendding playlist */}
          <View>
            {trenddingplaylist.map(item =>
              item.items.sortDescription ? (
                <View key={item.title}>
                  <View style={{ marginLeft: 6, marginRight: 6, marginTop: 20, padding: 5, alignItems: 'center', flexDirection: 'row', gap: 6 }}>
                    <Text style={style.Title}>{item.title}</Text>
                    <AntDesign style={{ marginTop: 5 }} name="right" size={20} color="black" />
                  </View>
                  <ScrollView horizontal={true} style={style.scrollView}>
                    {item.items.slice(0, 6).map(subItem => (
                      <View key={subItem.title} style={{ flexDirection: "column", width: 170, marginRight: 15 }}>
                        <View style={style.columntrendding}>
                          <Image style={style.coverimghub} source={{ uri: subItem.thumbnailM }} />
                        </View>
                        <Text style={style.artisttrendding} numberOfLines={2} ellipsizeMode="tail">
                          {subItem.sortDescription}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <View key={item.title}>
                  <View style={{ marginLeft: 6, marginRight: 6, marginTop: 20, padding: 5, alignItems: 'center', flexDirection: 'row', gap: 6 }}>
                    <Text style={style.Title}>{item.title}</Text>
                    <AntDesign style={{ marginTop: 5 }} name="right" size={20} color="black" />
                  </View>
                  <ScrollView horizontal={true} style={style.scrollView}>
                    {item.items.slice(0, 6).map(subItem => (
                      <View key={subItem.title} style={{ flexDirection: "column", width: 170, marginRight: 15 }}>
                        <View style={style.columntrendding}>
                          <Image style={style.coverimghub} source={{ uri: subItem.thumbnailM }} />
                        </View>
                        <Text style={style.artisttrendding} numberOfLines={2} ellipsizeMode="tail">
                          {subItem.title}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>)
            )}

          </View>
        </View>
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  // layout 
  layoutheader: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },

  tinyBanner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    borderWidth: 0,
    borderColor: '#ffffff',
  },

  coverimg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 4,
    borderWidth: 0,
  },

  coverimghub: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },

  scrollView: {
    marginLeft: 10, marginTop: 3, marginBottom: 3
  },



  column: {
    width: 300,
    marginRight: 10,
    gap: 10,
  },

  columnhub: {
    width: 145,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },

  columntrendding: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },

  itemContainer: {
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 20
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#d7dbd9",
  },

  buttonnewsong: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#d7dbd9",
  },

  selectedButton: {
    backgroundColor: '#8e44ad',  // Màu tím khi nút được chọn
    borderColor: '#8e44ad',
  },

  // element
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },

  Title: {
    fontSize: 25,
    fontWeight: '700',
  },

  Titlesmall: {
    color: "#9fa1a0",
    fontSize: 15,
    letterSpacing: -1,
    fontWeight: '400',
  },

  selectedButtonText: {
    color: 'white',  // Màu chữ khi nút được chọn
  },
  congcu: {
    alignItems: "center",
    fontSize: 30,
    fontWeight: '700',
    flexDirection: 'row',
    gap: 20,
  },

  text: {
    color: 'white',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
  },

  title: {
    fontWeight: '600',
  },
  artist: {
    fontWeight: '400',
    color: '#9fa1a0',
    fontSize: 12,
  },
  artisttrendding: {
    flexWrap: "wrap",
    marginLeft: 5,
    fontWeight: '400',
    color: '#9fa1a0',
    fontSize: 12,
  },
})

export default index