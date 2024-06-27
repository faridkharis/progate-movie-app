import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieList from '../components/movies/MovieList'
import type { Movie } from '../types/app'
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getMovie()
    void checkIsFavorite(id).then(setIsFavorite)
  }, [id])

  const getMovie = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
    .then(async (response) => await response.json())
    .then((response) => {
      setMovie(response)
    })
    .catch((errorResponse) => {
      console.log(errorResponse)
    })
  }

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        '@FavoriteList'
      )
  
      let favMovieList: Movie[] = []
  
      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }
  
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        '@FavoriteList'
      )
      
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData);
        const newFavMovieList = favMovieList.filter((favMovie) => favMovie.id !== id);

        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(newFavMovieList));
        setIsFavorite(false);
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const toggleFavorite = (): void => {
    if (isFavorite && (movie != null)) {
      void removeFavorite(movie.id);
    } else if (movie != null) {
      void addFavorite(movie);
    }
  }

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    try {
      const favoriteMovies = await AsyncStorage.getItem('@FavoriteList');
      if (favoriteMovies != null) {
        const favorites: Movie[] = JSON.parse(favoriteMovies);
        return favorites.some((favMovie) => favMovie.id === id);
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <ScrollView>
      {(movie != null) ? (
        <>
          <Image
            resizeMode="cover"
            style={styles.backdrop}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            }}
          />

          <TouchableOpacity
            onPress={toggleFavorite}
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
          
          <Text style={{ fontSize: 20 }}>title: {movie.title}</Text>
          <Text style={{ fontSize: 20 }}>vote_average: {movie.vote_average.toFixed(1)}</Text>
          <Text style={{ fontSize: 20 }}>overview: {movie.overview}</Text>
          <Text style={{ fontSize: 20 }}>original_language: {movie.original_language}</Text>
          <Text style={{ fontSize: 20 }}>popularity: {movie.popularity.toFixed(2)}</Text>
          <Text style={{ fontSize: 20 }}>release_date: {movie.release_date.toString()}</Text>
          <Text style={{ fontSize: 20 }}>vote_count: {movie.vote_count}</Text>

          <MovieList
            title='Recommendation'
            path={`/movie/${movie.id}/recommendations`}
            coverType='poster'
            key='{movieList.title}'
          />
        </>
      ) : (
        <Text>Loading ...</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    width: 280,
    height: 160,
  },
})

export default MovieDetail