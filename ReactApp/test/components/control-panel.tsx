import React from 'react-native';
import { render, mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {ControlPanel} from '../../components/control-panel';

@suite("<ControlPanel />")
class ControlPanelTest {
  user =  {
      "createdOn": "2017-05-22T19:45:22.563Z",
      "modifiedOn": "2017-05-22T19:45:22.563Z",
      "accountId": 105990045,
      "name": "ABC",
      "userId": "abc@example.com",
      "email": "abc@example.com",
      "photoUrl": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/000/03a/266/370c9e9.jpg",
    };

  tabs=[
    {
      icon: "home",
      title: "Home",
      func: () => {
      }
    },
    {
      icon: "chat",
      title: "Chat",
      func: () => {
      }
    }];
  
  @test("should render default view")
  render_view() {
    const wrapper = shallow(<ControlPanel user={this.user} tabs={this.tabs} />);
    expect(wrapper.find('ScrollView')).to.have.length(1);
  }

}
