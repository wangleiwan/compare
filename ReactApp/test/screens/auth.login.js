import React, { Animated, View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { Login } from '../../screens/Auth.Login';

@suite("<Login />")
class LoginTest {
    @test("render account id form view with auth.error = 400, auth.loading = true")
    render_accountId_form_1() {
      const auth = {
        error: 400,
        loading: false
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: true});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("render account id form view with auth.error = 400, auth.loading = false")
    render_accountId_form_2() {
      const auth = {
        error: 400,
        loading: true
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: true});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("render account id form view with state.error = 400, auth.loading = true")
    render_accountId_form_3() {
      const auth = {
        error: null,
        loading: true
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: 400});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("render account id form view with state.error = 400, auth.loading = false")
    render_accountId_form_4() {
      const auth = {
        error: null,
        loading: false
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: 400});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("simulate back event on account id form view")
    simulate_accountId_form_back() {
      const auth = {
        error: null,
        loading: false
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: 400});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 0)
          node.simulate('press');
      });
    }

    @test("simulate next event on account id form view")
    simulate_accountId_form_next() {
      const auth = {
        error: null,
        loading: false
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: 400});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("simulate next event on account id form view")
    simulate_accountId_form_next_2() {
      const auth = {
        error: null,
        loading: false
      };
      const login = (user) => { return true; };
      const wrapper = shallow(<Login auth={auth} login={login} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: 400});
      wrapper.setState({accountId: 540099501});
      wrapper.setState({user: {username: 'abc@example.com', password: '123' }});
      
      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("render login form view with auth.error = 400")
    render_login_form_1() {
      const auth = {
        error: 400
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("render login form view with state.error = 400")
    render_login_form_2() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: 400});
      
      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("render login form view without error (hide secure text)")
    render_login_form_3() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(2);
    }

    @test("render login form view without error (show secure text)")
    render_login_form_4() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(2);
    }

    @test("render login form view with error = 'Account not found'")
    render_login_form_5() {
      const auth = {
        error: 'Account not found'
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(2);
    }

    @test("simulate login event on login form view")
    simulate_login_form() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(2);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1) {
          node.simulate('press');
        }
      });
    }

    @test("simulate login event on login form view")
    simulate_login_form_2() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});
      wrapper.setState({username: 'abc@example.com'});
      
      expect(wrapper.find('View')).to.have.length(8);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(2);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1) {
          node.simulate('press');
        }
      });
    }

    @test("simulate login event on login form view")
    simulate_login_form_3() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});
      wrapper.setState({password: '123'});
      
      expect(wrapper.find('View')).to.have.length(10);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1) {
          node.simulate('press');
        }
      });
    }

    @test("simulate login event on login form view")
    simulate_login_form_4() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Login auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});
      wrapper.setState({username: 'abc'});
      wrapper.setState({password: '123'});
      
      expect(wrapper.find('View')).to.have.length(10);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1) {
          node.simulate('press');
        }
      });
    }

    @test("simulate login event on login form view")
    simulate_login_form_5() {
      const auth = {
        error: null
      };
      const login = (user) => { return true; };
      const wrapper = shallow(<Login auth={auth} login={login} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});
      wrapper.setState({username: 'abc@example.com'});
      wrapper.setState({password: '123'});

      expect(wrapper.find('View')).to.have.length(10);
      expect(wrapper.find('Image')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(2);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1) {
          node.simulate('press');
        }
      });
    }

}