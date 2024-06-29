import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import type { MovieListProps, Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from './MovieItem'

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 120,
    height: 180,
  },
}

const MovieList = ({ title, path, coverType }: MovieListProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    getMovieList()
  }, [])

  const getMovieList = (): void => {
    const url = `https://api.themoviedb.org/3/${path}`
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
        setMovies(response.results as Movie[])
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={coverImageSize[coverType]}
            coverType={coverType}
          />
        )}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          ...styles.movieList,
          maxHeight: coverImageSize[coverType].height + 60,
        }}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#414454',
  },
  movieList: {
    marginTop: 8,
  },
})

export default MovieList