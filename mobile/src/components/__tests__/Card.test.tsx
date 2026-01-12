import React from 'react';
import renderer from 'react-test-renderer';
import { Card } from '../Card';
import { BlogPost } from '../../types';

const mockPost: BlogPost = {
  id: 1,
  title: "Test Title",
  excerpt: "Test Excerpt",
  date: "2025-01-01",
  category: "Test Cat",
  image: "http://test.com/img.jpg",
  featured: false
};

describe('Card', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Card post={mockPost} onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal variant correctly', () => {
    const tree = renderer.create(<Card post={mockPost} onPress={() => {}} variant="horizontal" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
