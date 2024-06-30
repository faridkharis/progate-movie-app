import React, { useCallback, useState } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import type { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import FavoriteMovieItem from '../components/movies/FavoriteMovieItem'

const Favorite = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  useFocusEffect(
    useCallback(() => {
      void getFavoriteMovies()
    }, [])
  )

  const getFavoriteMovies = async (): Promise<void> => {
    try {
      const favoriteMoviesData = await AsyncStorage.getItem('@FavoriteList')
      if (favoriteMoviesData !== null) {
        const movies: Movie[] = JSON.parse(favoriteMoviesData)
        setFavoriteMovies(movies)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
      <View style={styles.container} >
        <Text style={styles.title}>Favorite Movies</Text>
        <FlatList
        data={favoriteMovies}
          renderItem={({ item }) => (
            <FavoriteMovieItem
              movie={item}
              size={styles.poster}
              coverType={'poster'}
            />
          )}
          showsVerticalScrollIndicator={false}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#414454',
    marginBottom: 20,
  },
  poster: {
    width: 100,
    height: 160,
  },
})

export default Favorite