import { Tabs } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Khám Phá',
              tabBarIcon: ({ color, focused }) => (
                <Feather name="disc" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="thuvien"
            options={{
              title: 'Thư Viện',
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons name={focused ? 'music-box-multiple' : 'music-box-multiple-outline'} size={24} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="banxephang"
            options={{
              title: 'Ranking',
              tabBarIcon: ({ color}) => (
                <FontAwesome6 name="ranking-star" size={24} color={color}/>
              ),
            }}
          />
          <Tabs.Screen
            name="radio"
            options={{
              title: 'Radio',
              tabBarIcon: ({ color, focused }) => (
                <Feather name="radio" size={24} color={color} />
              ),
            }}
          />
           <Tabs.Screen
            name="canhan"
            options={{
              title: 'Cá nhân',
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons name={focused ? 'account-music' : 'account-music-outline'} size={24} color={color} />
              ),
            }}
          />         
        </Tabs>
  );
}
