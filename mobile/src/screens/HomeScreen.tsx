import React from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlogPost, RootStackParamList } from '../types';
import { BLOG_POSTS } from '../data/posts';
import { COLORS } from '../constants/theme';
import { Card } from '../components/Card';
import { StatusBar } from 'expo-status-bar';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  const recentPosts = BLOG_POSTS.filter(p => !p.featured);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>PokéLog</Text>
      <View style={styles.sensorArray}>
         <View style={[styles.sensor, styles.sensorBig]} />
         <View style={[styles.sensor, styles.sensorRed]} />
         <View style={[styles.sensor, styles.sensorYellow]} />
         <View style={[styles.sensor, styles.sensorGreen]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Entry</Text>
          <Card 
            post={featuredPost} 
            onPress={() => navigation.navigate('Article', { id: featuredPost.id })} 
            variant="featured"
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Logs</Text>
          {recentPosts.map(post => (
             <Card 
               key={post.id} 
               post={post} 
               onPress={() => navigation.navigate('Article', { id: post.id })}
               variant="horizontal" 
             />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 30, // Status bar safe area
  },
  headerContainer: {
    backgroundColor: COLORS.pkRed,
    padding: 20,
    paddingBottom: 30,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.pkDarkRed,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  sensorArray: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  sensor: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  sensorBig: {
    width: 40,
    height: 40,
    backgroundColor: '#00bfff', // Cyan
    marginRight: 10,
  },
  sensorRed: { width: 15, height: 15, backgroundColor: '#cc0000' },
  sensorYellow: { width: 15, height: 15, backgroundColor: '#ffcb05' },
  sensorGreen: { width: 15, height: 15, backgroundColor: '#32cd32' },

  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.textMain,
    textTransform: 'uppercase',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.pkRed,
    paddingLeft: 10,
  },
});
