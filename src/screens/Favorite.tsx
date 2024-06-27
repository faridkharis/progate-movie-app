import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, } from 'react-native'
import MovieItem from '../components/movies/MovieItem'
import type { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Favorite = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  useEffect(() => {
    void getFavoriteMovies()
  }, [])

  const getFavoriteMovies = async (): Promise<void> => {
    try {
      const favoriteMoviesData = await AsyncStorage.getItem('@FavoriteList')
      if (favoriteMoviesData !== null) {
        const movies: Movie[] = JSON.parse(favoriteMoviesData)
        movies.map(movie => {console.log(movie.title)})
        setFavoriteMovies(movies)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
      <View style={styles.container} >

        <FlatList
        data={favoriteMovies}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={styles.poster}
              coverType={'backdrop'}
            />
          )}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
        />
        
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 160,
  },
})

export default Favorite