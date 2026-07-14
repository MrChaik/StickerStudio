import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{
    tabBarActiveTintColor: '#fbb511',
    tabBarInactiveTintColor: '#fefcf7',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: true,
    headerTintColor: '#ffffff',
    tabBarStyle: {
      backgroundColor: '#5607a0',
    },
  }}>
       <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle-sharp' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
