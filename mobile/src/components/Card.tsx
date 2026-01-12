import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { BlogPost } from '../types';
import { COLORS } from '../constants/theme';

interface CardProps {
  post: BlogPost;
  onPress: () => void;
  variant?: 'featured' | 'horizontal';
}

export const Card: React.FC<CardProps> = ({ post, onPress, variant = 'featured' }) => {
  const isHorizontal = variant === 'horizontal';

  return (
    <TouchableOpacity
      style={[styles.card, isHorizontal && styles.cardHorizontal, isHorizontal ? styles.shadowSmall : styles.shadowLarge]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.imageContainer, isHorizontal && styles.imageContainerHorizontal]}>
        <Image source={{ uri: post.image }} style={styles.image} />
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{post.category}</Text>
        </View>
      </View>

      <View style={[styles.content, isHorizontal && styles.contentHorizontal]}>
        <View style={styles.meta}>
          <Text style={styles.date}>{post.date}</Text>
          <Text style={styles.metaSep}>|</Text>
          <Text style={styles.readTime}>#{post.id}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
        {!isHorizontal && <Text style={styles.excerpt} numberOfLines={3}>{post.excerpt}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderColor: COLORS.pkBlack,
    borderWidth: 3,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: COLORS.pkWhite,
  },
  cardHorizontal: {
    flexDirection: 'row',
    height: 120,
  },
  shadowLarge: {
    // Android elevation
    elevation: 5,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 0,
  },
  shadowSmall: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 0,
  },
  imageContainer: {
    height: 200,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.pkBlack,
    position: 'relative',
  },
  imageContainerHorizontal: {
    width: 120,
    height: '100%',
    borderBottomWidth: 0,
    borderRightWidth: 3,
    borderRightColor: COLORS.pkBlack,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.pkYellow,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: COLORS.pkBlack,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.pkBlack,
    textTransform: 'uppercase',
  },
  content: {
    padding: 15,
  },
  contentHorizontal: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  metaSep: {
    marginHorizontal: 5,
    color: COLORS.textMuted,
    fontSize: 10,
  },
  date: {
    fontSize: 10,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  readTime: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});
