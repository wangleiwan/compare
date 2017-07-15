import React, { Image, TextInput, Platform } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import MessageImage from '../../components/messenger-image';

@suite("<MessageImage />")
class MessageImageTest {

    @test("should render view")
    render_view_1() {
      const lightboxProps = {

      };
      const imageProps = {

      };
      const photoUrl: string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const currentMessage: object = {
        image: {uri: photoUrl}
      }
      const wrapper = shallow(<MessageImage currentMessage={currentMessage} lightboxProps={lightboxProps} imageProps={imageProps} />);
      expect(wrapper.find('View')).to.have.length(1);
      expect(wrapper.find('Lightbox')).to.have.length(1);
      expect(wrapper.find('Image')).to.have.length(1);
    }
   
   
    
}
