export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Article: { id: number };
};
