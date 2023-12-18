import React, { useState, useEffect } from 'react';
import { Card, Title, Paragraph, List } from 'react-native-paper';
import userApi from '../api/userApi';

const RepositoryCard = ({ repository }) => {
  const [expanded, setExpanded] = useState(false);
  const [commits, setCommits] = useState([]);

  const handlePress = async () => {
    setExpanded(!expanded);

    if (expanded || commits.length > 0) {
      return;
    }

    try {
      const response = await userApi.get(`github/repos/${repository.name}/commits`);

      if (response.status === 200) {
        setCommits(response.data.commits);
      } else {
        alert('Error fetching commits:', response.data.message);
      }
    } catch (error) {
      alert('Error fetching commits:', error.message);
    }
  };

  const formatDate = (fullDate) => {
    return fullDate.substring(0, fullDate.indexOf('T'));
  };

  return (
    <Card style={{ backgroundColor: 'white', borderRadius: 0 }}>
      <Card.Content>
        <Title>{repository.name}</Title>
        <Paragraph>Fecha de creación: {formatDate(repository.created_at)}</Paragraph>
        <Paragraph>Actualizado: {formatDate(repository.updated_at)}</Paragraph>
        <Paragraph>Cantidad de commits: {repository.commits_count}</Paragraph>
        <List.Accordion
          title="Ver commits"
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{ color: expanded ? 'black' : 'white' }}
          style={{ backgroundColor: expanded ? '#fcaf43' : 'black', marginTop: 5 }}
        >
          {Array.isArray(commits) &&
            commits.map((commit) => (
              <List.Item
                key={commit.sha}
                title={`Mensaje: ${commit.message}`}
                description={`Autor: ${commit.author}\nFecha: ${formatDate(commit.date)}`}
                left={() => <List.Icon icon="source-branch" />}
              />
            ))}
        </List.Accordion>
      </Card.Content>
    </Card>
  );
};

export default RepositoryCard;