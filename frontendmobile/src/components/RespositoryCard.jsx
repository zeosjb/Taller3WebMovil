import React, { useState } from 'react';
import { Card, Title, Paragraph, List } from 'react-native-paper';

const RepositoryCard = ({ repository }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const formatDate = (fullDate) => {
    return fullDate.substring(0, fullDate.indexOf('T'));
  };

  return (
    <Card style={{backgroundColor: "white"}}>
      <Card.Content>
        <Title>{repository.name}</Title>
        <Paragraph>Fecha de creación: {repository.created_at}</Paragraph>
        <Paragraph>Actualizado: {repository.updated_at}</Paragraph>
        <Paragraph>Cantidad de commits: {repository.commits_count}</Paragraph>

        {/* Utiliza List.Accordion para el acordeón */}
        <List.Accordion
          title="Ver commits"
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{ color: expanded ? 'black' : 'white' }} // Invertir los colores
          style={{ backgroundColor: expanded ? 'white' : 'black' }} // Invertir los colores
        >
          {repository.commits.map((commit) => (
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
