
# React Native Movie App

This repository contains the final project for the Digitalent Scholarship: Mobile App Development with React Native by Progate. The project focuses on developing a movie application using React Native, integrating with a movie API to fetch and display movie data. The app allows users to search for movies, view details, and manage a list of favorite movies.



## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![](doc/shot01.png?raw=true) ![](doc/shot02.png?raw=true) ![](doc/shot03.png?raw=true)
![](doc/shot04.png?raw=true) ![](doc/shot05.png?raw=true) ![](doc/shot06.png?raw=true)



## Features

- Home Screen: Displays a list of popular, top-rated, and upcoming movies fetched from the movie API.
- Movie Details: Provides a detailed view of each movie, including synopsis, cast, and reviews.
- Search Functionality: Allows users to search for movies based on keywords.
- Favorite Movies: Enables users to mark movies as favorites and view them later.
- Fetching Movies from API: Integrates with a movie API to retrieve and display movie data.


## API Reference

#### Get Movie List

```http
  GET https://api.themoviedb.org/3/movie/now_playing
  GET https://api.themoviedb.org/3/movie/popular
  GET https://api.themoviedb.org/3/movie/top_rated
  GET https://api.themoviedb.org/3/movie/upcoming
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get Movie Detail

```http
  GET https://api.themoviedb.org/3/movie/${movie_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `movie_id`| `string` | **Required**. Id of item to fetch |



## Installation

Install my-project with npm

```bash
  git clone https://github.com/faridkharis/progate-movie-app
  cd progate-movie-app
  npm install
  npm run start
```
    
## Contibutors

- [@faridkharis](https://www.github.com/faridkharis)
- [@indira71](https://www.github.com/indira71)
