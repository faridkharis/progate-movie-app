import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {API_ACCESS_TOKEN} from '@env'
import {useNavigation, StackActions} from '@react-navigation/native'

interface Genre {
  id: number
  name: string
}

export default function CategorySearch(): JSX.Element {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)

  const navigation = useNavigation()
  const pushAction = StackActions.push('CategorySearchResult', {
    genre: selectedGenre,
  })

  useEffect(() => {
    getGenres()
  }, [])

  const getGenres = async (): Promise<void> => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
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
        setGenres(response.genres)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre)
  }

  return (
    <View style={styles.container}>
      <View style={styles.genreList}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={{...styles.genreItem, backgroundColor: genre.id === selectedGenre?.id ? '#8978A4' : '#C0B4D5'}}
            onPress={() => handleGenreSelect(genre)}
          >
            <Text style={styles.genreText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={() => navigation.dispatch(pushAction)}>
        <Text style={styles.textSearch}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreItem: {
    width: '48%',
    backgroundColor: '#C0B4D5',
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
  },
  genreText: {
    color: '#000',
    textAlign: 'center',
  },
  searchButton: {
    width: '100%',
    paddingVertical: 15,
    marginVertical: 22,
    backgroundColor: '#C0B4D5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  textSearch: {
    fontSize: 20,
    color: '#fff',
  },
})
