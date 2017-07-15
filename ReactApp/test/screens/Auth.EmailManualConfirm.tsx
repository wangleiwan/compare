import React, { View, Image, TextInput } from 'react-native';
import MiTransText from '../../components/MiTransText';
import MiTextInput from '../../components/MiTextInput';
import Button from '../../components/button';

import { expect } from 'chai';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";

import { EmailManual } from '../../screens/Auth.EmailManualConfirm';

@suite("<EmailManual />")
class EmailTest {
    @test("should render with initial state")
    render_view() {
        const props = {
            authInfo: {},
            data: {},
            user: {},
            loading: false,
            error: null,
            init: true,
        }

        const wrapper = shallow(<EmailManual auth={props} />);

        const initialState = {
            finished: false,
            verifying: false,
            verificationCode: ''
        }

        wrapper.setState({...initialState});

        expect(wrapper.find('View')).to.have.length(5);
        expect(wrapper.find(MiTransText)).to.have.length(1);
        expect(wrapper.find(Button)).to.have.length(2);
        expect(wrapper.find(MiTextInput)).to.have.length(1);
    }
}