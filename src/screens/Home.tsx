import React from 'react'
import { View, Text, Button } from 'react-native'

const Home = ({ navigation }: { navigation: any }): JSX.Element => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Movie Detail"
        onPress={() => navigation.navigate("MovieDetail")}
      />
    </View>
  )
}

export default Home
