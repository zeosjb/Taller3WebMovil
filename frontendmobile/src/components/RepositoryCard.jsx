import React, { useState, useEffect } from 'react';
import { Card, Title, Paragraph, List } from 'react-native-paper';
import userApi from '../api/userApi';

const RepositoryCard = ({ repository }) => {
  const [expanded, setExpanded] = useState(false);
  const [commits, setCommits] = useState([]);

  /**
   * Maneja el evento de presionar para expandir/cerrar y cargar los commits de un repositorio.
   * 
   * @async
   * @function
   * @returns {Promise<void>} Promesa que se resuelve después de manejar el evento.
   */
  const handlePress = async () => {
    setExpanded(!expanded);

    // Si el panel está expandido o ya hay commits cargados, no hace nada.
    if (expanded || commits.length > 0) {
      return;
    }

    try {
      // Realiza una solicitud para obtener los commits del repositorio.
      const response = await userApi.get(`github/repos/${repository.name}/commits`);
      // Verifica el estado de la respuesta.
      if (response.status === 200) {
        // Si es exitoso, actualiza el estado de los commits.
        setCommits(response.data.commits);
      } else {
        // Si hay un error, muestra una alerta con el mensaje de error.
        alert('Error fetching commits:', response.data.message);
      }
    } catch (error) {
      // Captura cualquier error de la solicitud y muestra una alerta.
      alert('Error fetching commits:', error.message);
    }
  };

  /**
   * Formatea una fecha completa eliminando la parte de la hora.
   *
   * @param {string} fullDate - Fecha completa en formato ISO.
   * @returns {string} Fecha formateada (solo la parte de la fecha).
   */
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