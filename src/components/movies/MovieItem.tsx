import React from 'react'
import { Image, ImageBackground, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import type { MovieItemProps } from '../../types/app'
import { LinearGradient } from 'expo-linear-gradient'

const MovieItem = ({ movie, size, coverType }: MovieItemProps): JSX.Element => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieDetail', { id: movie.id })
  const date = new Date(movie.release_date)
  
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
      {
        coverType === 'poster'
        ? (
          <View>
            <Image
              resizeMode="cover"
              style={[size, styles.image]}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            />
            <View>
              <Text numberOfLines={1} style={styles.posterTitle}>{movie.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <View style={{flexDirection: 'row', gap: 2}}>
                  <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
                  <Text style={styles.rating}>({movie.vote_count.toLocaleString('en-US')})</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <ImageBackground
            resizeMode="cover"
            style={[size, styles.backgroundImage]}
            imageStyle={styles.backgroundImageStyle}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path
              }`,
            }}
          >
            <LinearGradient
              colors={['#00000000', 'rgba(0, 0, 0, 0.8)']}
              locations={[0.4, 0.8]}
              style={styles.gradientStyle}
            >
              <Text style={styles.backdropTitle} numberOfLines={1}>{movie.title}</Text>
              <Text
                style={{
                  color: '#e1e3ed',
                  fontSize: 14,
                  fontWeight: '600',
                  marginBottom: 10
                }}
                numberOfLines={1}
              >
                {date.toLocaleString('default', {month: 'long'})} {date.getDate()}, {date.getFullYear()}
              </Text>
              <Text style={styles.backdropOverview} numberOfLines={2}>{movie.overview}</Text>
            </LinearGradient>
          </ImageBackground>
        )
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    marginRight: 4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  backdropTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: .5,
    marginTop: 5,
  },
  backdropOverview: {
    color: '#e1e3ed',
    letterSpacing: .3,
    width: '90%',
  },
  posterTitle: {
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
  backgroundImage: {
    marginRight: 4,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  gradientStyle: {
    padding: 16,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

export default MovieItem