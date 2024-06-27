import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieList from '../components/movies/MovieList'
import type { Movie } from '../types/app'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    getMovie()
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