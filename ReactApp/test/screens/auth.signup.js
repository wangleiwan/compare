import React, { Animated, View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { Signup } from '../../screens/Auth.Signup';

@suite("<Signup />")
class SignupTest {
    @test("render account id form view with auth.error = 400, auth.loading = false")
    render_accountId_form_1() {
      const auth = {
        error: 400,
        loading: false
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(7);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
    }

    @test("render account id form view with state.error = 400, auth.loading = false")
    render_accountId_form_2() {
      const auth = {
        error: null,
        loading: false
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: 400});

      expect(wrapper.find('View')).to.have.length(7);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTransText')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
    }

    @test("render account id form view with no error, auth.loading = false")
    render_accountId_form_3() {
      const auth = {
        error: null,
        loading: false
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(7);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
    }

    @test("simulate back event on account id form view")
    simulate_accountId_form_back() {
      const auth = {
        error: null,
        loading: false
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(7);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
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
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(7);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
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
      const signup = (user) => {};
      const wrapper = shallow(<Signup auth={auth} signup={signup} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({accountId: 540099501});
      wrapper.setState({user: {username: 'abc@example.com', password: '123' }});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(7);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("render account id form view with no error, auth.loading = true")
    render_accountId_form_4() {
      const auth = {
        error: null,
        loading: true
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: true});
      wrapper.setState({error: null});

      expect(wrapper.find('View')).to.have.length(7);
      // expect(wrapper.find('LoadingCircle')).to.have.length(2);
      expect(wrapper.find('A')).to.have.length(0);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
    }

    @test("render signup form view without error, loading = false")
    render_signup_form_1() {
      const auth = {
        error: null,
        loading: false
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'weak'});

      expect(wrapper.find('View')).to.have.length(10);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("render signup form view with auth.error = 400")
    render_signup_form_2() {
      const auth = {
        error: 400
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'weak'});

      expect(wrapper.find('View')).to.have.length(10);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(0);
    }

    @test("render signup form view with state.error = 400")
    render_signup_form_3() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: true});
      wrapper.setState({error: 400});
      wrapper.setState({passStrength: 'weak'});

      expect(wrapper.find('View')).to.have.length(10);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(1);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(0);
    }

    @test("render signup form view with state.secureTextEntry = false")
    render_signup_form_4() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'weak'});

      expect(wrapper.find('View')).to.have.length(10);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
    }

    @test("render signup form view with different password strengths")
    render_signup_form_5() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'weak'});
      wrapper.setState({password: {
        length: 5
      }});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);

      wrapper.setState({passStrength: 'ok'});
      wrapper.setState({password: {
        length: 6
      }});

      wrapper.setState({passStrength: 'good'});
      wrapper.setState({password: {
        length: 10
      }});

      wrapper.setState({passStrength: 'strong'});
      wrapper.setState({password: {
        length: 15
      }});
    }

    @test("simulate back event on signup form view")
    simulate_signup_form_back() {
      const auth = {
        error: null
      };
      const navigator = [{route: 1}, {route: 2}];
      const clear = () => { auth.error = null; };
      const wrapper = shallow(<Signup auth={auth} clearAuthError={clear} navigator={navigator} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'weak'});
      wrapper.setState({password: {
        length: 5
      }});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);

      wrapper.find('Button').forEach(function (node, index) {
        if(index === 0)
          node.simulate('press');
      });
    }

    @test("simulate next event on signup form view with invalid name")
    simulate_signup_form_next_1() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'good'});
      wrapper.setState({password: {
        length: 10
      }});
      wrapper.setState({email: 'abc@example.com'});
      wrapper.setState({name: null});
      wrapper.setState({mobile: '+1 (202) 010 1234'});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("simulate next event on signup form view with invalid email")
    simulate_signup_form_next_2_1() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'good'});
      wrapper.setState({password: {
        length: 10
      }});
      wrapper.setState({email: 'abc@'});
      wrapper.setState({name: 'ABC'});
      wrapper.setState({mobile: '+1 (202) 010 1234'});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("simulate next event on signup form view with invalid email")
    simulate_signup_form_next_2_2() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'good'});
      wrapper.setState({password: {
        length: 10
      }});
      wrapper.setState({name: 'ABC'});
      wrapper.setState({mobile: '+1 (202) 010 1234'});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("simulate next event on signup form view with invalid mobile")
    simulate_signup_form_next_3() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'good'});
      wrapper.setState({password: {
        length: 10
      }});
      wrapper.setState({email: 'abc@example.com'});
      wrapper.setState({name: 'ABC'});
      wrapper.setState({mobile: '202010123'});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("simulate next event on signup form view with invalid password")
    simulate_signup_form_next_4_1() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'weak'});
      wrapper.setState({email: 'abc@example.com'});
      wrapper.setState({name: 'ABC'});
      wrapper.setState({mobile: '+1 (202) 010 1234'});

      expect(wrapper.find('View')).to.have.length(10);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(1);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("simulate next event on signup form view with invalid password")
    simulate_signup_form_next_4_2() {
      const auth = {
        error: null
      };
      const wrapper = shallow(<Signup auth={auth} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'weak'});
      wrapper.setState({password: {
        length: 2
      }});
      wrapper.setState({email: 'abc@example.com'});
      wrapper.setState({name: 'ABC'});
      wrapper.setState({mobile: '+1 (202) 010 1234'});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("simulate next event on signup form view with valid data")
    simulate_signup_form_next_5() {
      const auth = {
        error: null
      };
      const signup = (user) => { return true; };
      const wrapper = shallow(<Signup auth={auth} signup={signup} />);
      wrapper.setState({accountIdNeeded: false});
      wrapper.setState({secureTextEntry: false});
      wrapper.setState({error: null});
      wrapper.setState({passStrength: 'good'});
      wrapper.setState({password: {
        length: 10
      }});
      wrapper.setState({email: 'abc@example.com'});
      wrapper.setState({name: 'ABC'});
      wrapper.setState({mobile: '+1 (202) 010 1234'});

      expect(wrapper.find('View')).to.have.length(12);
      // expect(wrapper.find('LoadingCircle')).to.have.length(1);
      expect(wrapper.find('A')).to.have.length(2);
      expect(wrapper.find('Alerts')).to.have.length(0);
      expect(wrapper.find('MiTextInput')).to.have.length(3);
      expect(wrapper.find('MiTextInputMask')).to.have.length(1);
      expect(wrapper.find('Button')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(3);
      
      wrapper.find('Button').forEach(function (node, index) {
        if(index === 1)
          node.simulate('press');
      });
    }

    @test("clicks login anchor on signup form")
    clicks_login() {
      const auth = {
        error: null
      };
      const clear = () => { auth.error = null; };
      const navigator ={
        replace: () => {}
      }
      const wrapper = shallow(<Signup auth={auth} clearAuthError={clear} navigator={navigator} />);
      wrapper.find('A').forEach(function (node, index){
        if(index === 1)
          node.simulate('press');
      });
    }

}