import React from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { DialPad } from '../../screens/DialPad';

@suite("<DialPad />")
class DialPadTest {
	  
    @test("render default view")
    render_view_1() {
      const wrapper = shallow(<DialPad />);

      expect(wrapper.find('View')).to.have.length(16);
      expect(wrapper.find('Image')).to.have.length(3);
      expect(wrapper.find('A')).to.have.length(15);
	  	expect(wrapper.find('MiTransText')).to.have.length(12);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
    }

	@test("simulate clicks on dialpad")
	simulate_clicks_A() {
	  const wrapper = shallow(<DialPad />);

	  wrapper.find('A').forEach(function(node, index){
		const arr = [0, 1, 14];
		if(arr.indexOf(index) < 0){
			node.simulate('press');
		}
	  });

	  expect(wrapper.state('number')).to.equal('123456789*0#');
	}
	
}