import React from 'react-native';
import {Provider} from 'react-redux';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {AppContainer} from '../../containers/app';
/*
import {loadUsers} from '../../redux/users';
import {loadConvs} from '../../redux/conversations';
import {save,load as loadFavs} from '../../redux/favorites';
import {loadProfile, loadAuth, sendVerify, login} from '../../redux/auth'; */

@suite("<AppContainer />")
class AppContainerTest {

    @test("should render view")
    render_view_1() {
      const favorites = {
        editing: false,
        order: [0,1,2,3,4],
        data: [{
                name: 'I',
              },
              {
                name: 'II',
              },
              {
                name: 'III',
              },
              {
                name: 'IV',
              },
              {
                name: 'V',
              }]
        };

      const users = [{
        _id: 111
      },{
        _id: 112
      },{
        _id: 113
      },];

      /*let authLoaded: boolean = false;
      const loadAuth = () => {
        authLoaded = true;
      };

      let favsLoaded: boolean = false;
      const loadFavs = () => {
        favsLoaded = true;
      };

      let usersLoaded: boolean = false;
      const loadUsers = () => {
        usersLoaded = true;
      };

      let convsLoaded: boolean = false;
      const loadConvs = () => {
        convsLoaded = true;
      };

      let saved: boolean = false;
      const save = () => {
          saved = true;
      }*/

      
      const wrapper = shallow(
        <AppContainer />);
      
      wrapper.setState({favorites: favorites, users: users});

      expect(wrapper.find('View')).to.have.length(1);
      //expect(wrapper.find(Navigator)).to.have.length(1);
    }
}