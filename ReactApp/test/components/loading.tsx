import React , {Animated} from 'react-native';
import Animation from 'lottie-react-native';
import { render, mount, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Loading from '../../components/loading';
import td from 'testdouble';

@suite("<Loading />")
class LoadingTest {

    @test("should render view when transparent = true")
    render_view_1() {
      const text: string = 'please wait';
      const transparent: boolean = true;
      const wrapper = shallow(<Loading finished={false} text={text} transparent={transparent} />);
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal(text);
    }

    @test("should render view when transparent = false")
    render_view_2() {
      const text: string = 'please wait';
      const transparent: boolean = false;
      const wrapper = shallow(<Loading finished={false} text={text} transparent={transparent} />);
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal(text);
    }

    @test("should render view when finished = true")
    render_view_3() {
      const text: string = 'please wait';
      const transparent: boolean = false;
      const wrapper = shallow(<Loading finished={false} text={text} transparent={transparent} />);
      wrapper.setState({finished: true});
      expect(wrapper.find(Animation)).to.have.length(1);
      expect(wrapper.find(Animation).props()).to.have.deep.property('source','check');
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal(text);
    }

    @test("should render view when finished = false")
    render_view_4() {
      const text: string = 'please wait';
      const transparent: boolean = false;
      const wrapper = shallow(<Loading finished={false} text={text} transparent={transparent} />);
      expect(wrapper.find(Animation)).to.have.length(1);
      expect(wrapper.find(Animation).props()).to.have.deep.property('source','loading');
      expect(wrapper.find('View')).to.have.length(2);
      expect(wrapper.find('MiTransText')).to.have.length(1);
      expect(wrapper.find('MiTransText').props().children).to.equal(text);
    }
    /*
    @test("calls componentDidMount")
    render_view_5() {
      const text: string = 'please wait';
      const transparent: boolean = false;
      const wrapper = mount(<Loading finished={false} text={text} transparent={transparent} />);
      //expect(Loading.prototype.componentDidMount.calledOnce).to.equal(true);
      //sinon.spy(Loading.prototype, 'componentDidMount');
      //wrapper.setState({progress: new Animated.Value(10)});
      //let tdLoading = new Loading({text: text, transparent: transparent, finished: true});
      let pLoading = Loading.prototype;
      pLoading.setState({progress: new Animated.Value(0)});
      console.log(td.verify(pLoading.componentDidMount()));
    }
    */

    @test("test function componentDidMount")
    test_componentDidMount() {
      let loading = new Loading({});
      loading.componentDidMount();
    }

    /*@test("test function cycleAnimation")
    test_cycleAnimation() {
      let loading = new Loading({});
      loading.cycleAnimation();
    }*/
}
