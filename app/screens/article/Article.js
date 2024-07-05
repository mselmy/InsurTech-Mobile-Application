import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetAllArticlesQuery, useGetArticleByIdQuery } from '../../redux/slices/articleSlice'
import ArticleCard from './components/ArticleCard';
import { ScrollView } from '@gluestack-ui/themed';

const Article = () => {
  const { data, error, isLoading } = useGetAllArticlesQuery();
  console.log("data=>>>>>>>", data);
  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.view}>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>{error.message}</Text>}
        {data && data.map((article) => <ArticleCard key={article.id} data={article} />)}
      </View>
    </ScrollView>
  )
}

export default Article

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    padding: 20
  },
  view: {
    flex: 1,
    padding: 20
  },
  card: {
    p: "$5",
    borderRadius: "$lg",
    maxWidth: 360,
    m: "$3"
  } 
})