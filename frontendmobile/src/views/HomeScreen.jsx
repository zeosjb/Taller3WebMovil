import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import Header from '../components/Header';
import RepositoryCard from '../components/RespositoryCard';

const HomeScreen = () => {
  const repositories = [
    {
      name: 'Repo 1',
      created_at: '2023-01-01',
      updated_at: '2023-01-10',
      commits_count: 5,
      commits: [
        { sha: '123abc', author: 'John Doe', message: 'Initial commit', date: '2023-01-01T12:00:00Z' },
        // Agrega más commits según sea necesario
      ],
    },
    {
      name: 'Repo 2',
      created_at: '2023-02-01',
      updated_at: '2023-02-15',
      commits_count: 10,
      commits: [
        { sha: '456def', author: 'Jane Smith', message: 'Fix issue #1', date: '2023-02-05T15:30:00Z' },
        // Agrega más commits según sea necesario
      ],
    },
    // ... más repositorios
  ];

  return (
    <View style={styles.container} >
      <Header />

      {/* Mapea los repositorios y usa RepositoryCard para cada uno */}
      {repositories.map((repo, index) => (
        <RepositoryCard key={index} repository={repo} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default HomeScreen;
