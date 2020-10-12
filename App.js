import * as React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

// const peopleObjects = [{name: "Blake", subtitle: "developer"},{name: "Tia", subtitle: "software developer"}, {name: "Matt", subtitle: "software dev"}, {name: "Stephen", subtitle: "dev"}];

export default function People() {
  const peopleObjects = [
    {
      id: 1,
      name: "Blake", 
      subtitle: "Software Developer",
      content: "Card content 1"
    },
    {
      id: 2,
      name: "Tia", 
      subtitle: "Software Developer",
      content: "Card content 2"
    }, 
    {
      id: 3,
      name: "Matt", 
      subtitle: "Software Developer",
      content: "Card content 3"
    }, 
    {
      id: 4,
      name: "Stephen", 
      subtitle: "Software Developer",
      content: "Card content 4"
    }
  ];

  const renderCard = () => {
    return (peopleObjects.map(people => {
      return (
      <>
        <Card>
          <Card.Title title={people.name} subtitle={people.subtitle} />
          <Card.Content>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Paragraph>{people.content}</Paragraph>

        
            <Button>
              <Icon.Button
                name="github"
                backgroundColor="#2b3137"
                // onPress={this.gotoGithub}
              >
              Check my Github
              </Icon.Button>
            </Button>

            <Button>
              <Icon.Button
                name="linkedin"
                backgroundColor="#0e76a8"
                // onPress={this.gotoLinkedin}
              >
              Connect on Linkedin
              </Icon.Button>
            </Button>

        </Card>
      </>

    );
    }));
  }
  
  return(
    <View>
    {renderCard()}
    </View>
    )
}