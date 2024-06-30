import React from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import type { MovieItemProps } from '../../types/app'

const FavoriteMovieItem = ({ movie, size }: MovieItemProps): JSX.Element => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieDetail', { id: movie.id })

  const convertMovieRuntime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }
  
  return (
    <TouchableOpacity
      style={{
        marginBottom: 16,
      }}
      onPress={() => {
        navigation.dispatch(pushAction)
      }}
    >
      <View style={{flexDirection: 'row', gap: 16, maxWidth: '100%'}}>
        <Image
          resizeMode="cover"
          style={[size, styles.image]}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
        <View style={{flexDirection: 'column', gap: 10}}>
          <Text numberOfLines={2} style={styles.posterTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={18} color="#FFD700" />
            <View style={{flexDirection: 'row', gap: 2}}>
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
              <Text style={styles.rating}>({movie.vote_count.toLocaleString('en-US')})</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', columnGap: 5}}>
            {movie.genres.slice(0, 2).map((genre) => (
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
          <View style={{flexDirection: 'row', gap: 8}}>
            <FontAwesome name="clock-o" size={18} color="#7d8199" />
            <Text style={styles.rating}>{convertMovieRuntime(movie.runtime)}</Text>
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
  posterTitle: {
    color: '#414454',
    fontWeight: '700',
    fontSize: 20,
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
    fontSize: 16,
    fontWeight: '500',
  },
})

export default FavoriteMovieItem