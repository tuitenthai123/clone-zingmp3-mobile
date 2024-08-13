import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,SafeAreaView,StatusBar,Dimensions,Image, ImageSourcePropType, ScrollView} from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Carousel from 'react-native-reanimated-carousel';

const index = () => {

interface BannerItem {
  sectionId: string;
  banner:string;
  cover:string;
  encodeId:string;
}

  const width = Dimensions.get('window').width;
  const [Banner, setBanner] = useState<BannerItem[]>([])
  useEffect(() => {
    const getHome = async () => {
      try {
        const response = await fetch(
          'https://backendbaocaoweb.vercel.app/api/home',
        );
        const json = await response.json();
        setBanner(json.data.items[0].items)
      } catch (error) {
        console.error(error);
      }
    };
    getHome()
  }, [])
  return (
    <ScrollView>
      <SafeAreaView style={{flex:1,marginTop:StatusBar.currentHeight}}>
            <View>
              <View style={{
                flexDirection:'row',
                justifyContent:"space-between",
                gap:10,
                padding:10,
                alignItems:'center',
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
    
    {/* banner */}
              <View style={{marginTop:6}}>
                <Carousel
                    data={Banner}
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    scrollAnimationDuration={1000}
                    mode='parallax'
                    renderItem={({ index,item }) => (
                            <View
                                style={{
                                  flex:1,
                                    alignItems:'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image style={style.tinyLogo} source={{uri: item.banner,}}/>
                            </View>
                    )}
                  />
              </View>
      {/* gợi ý bài hát */}
              <ScrollView horizontal={true} style={style.scrollView}>

              </ScrollView>     
            </View>
          </SafeAreaView>
    </ScrollView>
    
  )
}
const style = StyleSheet.create({ 
  layoutheader:{
    flexDirection:'row',
    justifyContent:"space-between",
  },
  Title:{
    fontSize:25,
    fontWeight:'700',
  },
  congcu:{
    alignItems:"center",
    fontSize:30,
    fontWeight:'700',
    flexDirection:'row',
    gap:20,
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#ffffff', 
  },
  scrollView: {
    marginTop: 50,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
  },
})

export default index