import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { BLOG_POSTS } from '../data/posts';
import { COLORS } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;
type ArticleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Article'>;

interface Props {
  route: ArticleScreenRouteProp;
  navigation: ArticleScreenNavigationProp;
}

export const ArticleScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <View style={styles.center}>
        <Text>MissingNo. Found (Post not found)</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{'< Back to Dex'}</Text>
        </TouchableOpacity>

        <Image source={{ uri: post.image }} style={styles.heroImage} />
        
        <View style={styles.metaContainer}>
           <Text style={styles.category}>{post.category}</Text>
           <Text style={styles.date}>{post.date}</Text>
        </View>

        <Text style={styles.title}>{post.title}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.systemLog}>[SYSTEM LOG]: Accessing Data Entry #{post.id}...</Text>
        
        <Text style={styles.bodyText}>{post.excerpt}</Text>
        
        <Text style={styles.bodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>Trainer Tip: Always verify your data before deploying!</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pkWhite,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  backBtn: {
    marginBottom: 20,
    marginTop: 40,
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.pkBlack,
    borderRadius: 4,
  },
  backBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: COLORS.pkBlack,
    marginBottom: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: {
    color: COLORS.pkBlue,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  date: {
    color: COLORS.textMuted,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.pkBlack,
    marginBottom: 20,
  },
  systemLog: {
    fontFamily: 'Courier', // Monospace feel
    color: COLORS.pkGreen,
    marginBottom: 15,
    backgroundColor: '#000',
    padding: 5,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textMain,
    marginBottom: 20,
  },
  tipBox: {
    backgroundColor: '#eee',
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.pkBlue,
    marginTop: 10,
  },
  tipText: {
    fontStyle: 'italic',
    color: COLORS.textMain,
  },
});
