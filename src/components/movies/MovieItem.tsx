import React from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import type { MovieItemProps } from '../../types/app'

const MovieItem = ({ movie, size, coverType }: MovieItemProps): JSX.Element => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieDetail', { id: movie.id })
  
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        maxWidth: size.width,
        marginRight: 16,
        marginBottom: 16,
      }}
      onPress={() => {
        navigation.dispatch(pushAction)
      }}
    >
      <Image
        resizeMode="cover"
        style={[size, styles.image]}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${
            coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path
          }`,
        }}
      />
      
      <View style={{}}>
        <Text numberOfLines={1} style={styles.movieTitle}>{movie.title}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <View style={{flexDirection: 'row', gap: 2}}>
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            <Text style={styles.rating}>({movie.vote_count.toLocaleString('en-US')})</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    marginRight: 4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  movieTitle: {
    color: '#414454',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: .3,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rating: {
    color: '#7d8199',
    fontWeight: '400',
  },
})

export default MovieItem