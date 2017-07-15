import React, { Image, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Alerts from '../../components/alerts';

@suite("<Alerts />")
class AlertsTest {

    @test("should render status alert")
    render_status_alert() {
      const message:string = 'Something\'s happening...';
      const wrapper = shallow(<Alerts status={message} />);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.contain(message);
    }

    @test("should render success alert")
    render_success_alert() {
      const message:string = 'Hello Success';
      const wrapper = shallow(<Alerts success={message} />);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.contain(message);
    }

    @test("should render error alert")
    render_error_alert() {
      const message:string = 'Error hey';
      const wrapper = shallow(<Alerts error={message} />);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.contain(message);
    }

}
