import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

  const convertMovieRuntime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  const convertReleasedDate = (releasedDate: string): number => {
    const date = new Date(releasedDate)
    const year = date.getFullYear()
    return year;
  }

  return (
    <ScrollView>
      {(movie != null) ? (
        <View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
              }}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <TouchableOpacity
              style={styles.toggleFav}
                onPress={toggleFavorite}
                >
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={24}
                  color={isFavorite ? "#de4e4e" : "black"}
                  />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center', marginBottom: 10}}>
              <FontAwesome name="star" size={18} color="#FFD700" />
              <Text style={{color: '#7d8199', fontSize: 16}}>{movie.vote_average.toFixed(2)}</Text>
              <Text style={{color: '#7d8199', fontSize: 16}}>({movie.vote_count.toLocaleString('en-US')} votes)</Text>
            </View>
            <View style={{flexDirection: 'row', columnGap: 10, marginBottom: 10}}>
              {movie.genres.slice(0, 3).map((genre) => (
                <Text
                  key={genre.id}
                  style={{
                    color: '#88A4E8',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    backgroundColor: '#DBE3FF',
                    borderRadius: 100,
                    fontSize: 12
                  }}
                >
                  {genre.name}
                </Text>
              ))}
            </View>
            <View style={{flexDirection: 'row', columnGap: 30, marginBottom: 20}}>
              <View style={{flexDirection: 'column', rowGap: 2}}>
                <Text style={{color: '#7d8199', fontSize: 14}}>Length</Text>
                <Text style={{color: '#414454', fontSize: 16, fontWeight: '500'}}>{convertMovieRuntime(movie.runtime)}</Text>
              </View>
              <View style={{flexDirection: 'column', rowGap: 2}}>
                <Text style={{color: '#7d8199', fontSize: 14}}>Language</Text>
                <Text style={{color: '#414454', fontSize: 16, fontWeight: '500'}}>{movie.spoken_languages[0].english_name}</Text>
              </View>
              <View style={{flexDirection: 'column', rowGap: 2}}>
                <Text style={{color: '#7d8199', fontSize: 14}}>Popularity</Text>
                <Text style={{color: '#414454', fontSize: 16, fontWeight: '500'}}>{movie.popularity.toFixed(2)}</Text>
              </View>
              <View style={{flexDirection: 'column', rowGap: 2}}>
                <Text style={{color: '#7d8199', fontSize: 14}}>Released</Text>
                <Text style={{color: '#414454', fontSize: 16, fontWeight: '500'}}>{convertReleasedDate(movie.release_date.toString())}</Text>
              </View>
            </View>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#414454', marginBottom: 5}}>Overview</Text>
            <Text style={{fontSize: 16, color: '#7d8199', lineHeight: 23, letterSpacing: .4, marginBottom: 40}}>{movie.overview}</Text>
            <MovieList
              title='Recommendation'
              path={`/movie/${movie.id}/recommendations`}
              coverType='poster'
              key='{movieList.title}'
            />
          </View>
        </View>
      ) : (
        <Text>Loading ...</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  titleContainer : {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: '#414454',
    fontSize: 24,
    fontWeight: '800',
    flex: .8,
    letterSpacing: .5,
  },
  toggleFav: {
    flex: .2,
    alignItems: 'flex-end',
    marginTop: 5,
  }
})

export default MovieDetail