import React, { Animated, View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {HomeFavorites} from '../../components/home-favorites';

@suite("<HomeFavorites />")
class HomeFavoritesTest {

    @test("should render view when editing = true")
    render_view_1() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
      const favorites = {
        editing: true,
        order: [0,1,2,3,4],
        data: ['I','II','III','IV','V']
      };

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );
      
      expect(wrapper.find(View)).to.have.length.of.at.least(2);
    }

    @test("should render view when editing = false")
    render_view_2() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );
      
      expect(wrapper.find(View)).to.have.length.of.at.least(2);
    }

    @test("should render view when activeKey is not null")
    render_view_3() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );

      wrapper.setState({activeKey : 0});
      expect(wrapper.find(View)).to.have.length.of.at.least(2);
    }

    @test("simulates onMove event")
    render_view_4() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );

      wrapper.setState({activeKey : 0});
      expect(wrapper.find('Tile')).to.have.length(5);
      wrapper.find('Tile').forEach(function (node) {
        if(node.props()['onMove'])
          node.simulate('move');
      });
      expect(wrapper.find('Tile')).to.have.length(5);
    }

     @test("simulates onLastMove event")
    render_view_5() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );

      wrapper.setState({activeKey : 0});
      expect(wrapper.find('Tile')).to.have.length(5);
      wrapper.find('Tile').forEach(function (node) {
        if(node.props()['onLastMove'])
          node.simulate('lastmove');
      });
      expect(wrapper.find('Tile')).to.have.length(5);
    }

    @test("simulates onRemove event")
    render_view_6() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );

      wrapper.setState({activeKey : 0});
      expect(wrapper.find('Tile')).to.have.length(5);
      wrapper.find('Tile').forEach(function (node) {
        node.simulate('remove');
      });
      expect(wrapper.find('Tile')).to.have.length(5);
    }

    @test("simulates onDeactivate event")
    render_view_7() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );

      wrapper.setState({activeKey : 0});
      expect(wrapper.find('Tile')).to.have.length(5);
      wrapper.find('Tile').forEach(function (node) {
        if(node.props()['onDeactivate'])
          node.simulate('deactivate');
      });
      expect(wrapper.find('Tile')).to.have.length(5);
    }

    @test("simulates onActivate event")
    render_view_8() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );

      wrapper.setState({activeKey : 0});
      expect(wrapper.find('Tile')).to.have.length(5);
      wrapper.find('Tile').forEach(function (node) {
        if(node.props()['onActivate'])
          node.simulate('activate');
      });
      expect(wrapper.find('Tile')).to.have.length(6);
    }

    /*@test("simulates onLayout event (view resize)")
    render_view_9() {
      let isAdded: boolean = false;
      const onAddNew: () => {} = () => isAdded = true;
      let isTalking: boolean = false;
      const pushToTalk: () => {} = () => isTalking = true;
      const endPushToTalk: () => {} = () => isTalking = false;
      let modified: boolean = false;
      const modify: () => {} = () => modified = true;
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

      const wrapper = shallow(
        <HomeFavorites
          pushToTalk={pushToTalk}
          endPushToTalk={endPushToTalk}
          editing={favorites.editing}
          order={favorites.order}
          modify={modify}
          favorites={favorites.data}
          onAddNew={onAddNew} />
      );

      wrapper.setState({activeKey : 0});
      wrapper.setState({restLayouts : [{
                          x: 100,
                          y: 100
                        },{
                          x: 50,
                          y: 50
                        }]
      });
      expect(wrapper.find('View')).to.have.length(3);
      wrapper.find('View').forEach(function (node) {
        if(node.props()['onLayout'])
          node.simulate('layout');
      });
      expect(wrapper.find('View')).to.have.length(3);
    }
    */
    
}
