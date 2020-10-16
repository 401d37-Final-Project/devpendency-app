import React from 'react';
import renderer from 'react-test-renderer';
import Sketch from '../components/Sketch';
import { NavigationContainer } from '@react-navigation/native';
import Boookmarks from '../components/Bookmarks'
import Bookmarks from '../components/Bookmarks';

jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('<Sketch />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<NavigationContainer><Sketch /></NavigationContainer>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

describe('<Bookmarks />', () => {
    it('should do things', () => {
        const tree = renderer.create(<NavigationContainer><Bookmarks/></NavigationContainer>).toJSON()
        console.log(tree)
    });
})

