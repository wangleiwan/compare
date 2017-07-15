import React, { Animated, View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import Tile from '../../components/tile';

@suite("<Tile />")
class TileTest {

    @test("should render default view")
    render_tile_1() {
      const wrapper = shallow(<Tile />);
      expect(wrapper.find(Animated.View)).to.have.length(6);
    }

    @test("should render custom view with addNew defined")
    render_tile_2() {
      const key: string = 'MODIFY_FAVS';
      const horzEnd:boolean = false;
      const vertEnd:boolean = false;
      let count: number = 0;
      const onAddNew: () => {} = () => count++;
      const wrapper = shallow(<Tile addNew onPress={onAddNew} horzEnd={horzEnd} vertEnd={vertEnd} key={key} />);
      expect(wrapper.find(View)).to.have.length(1);
      expect(wrapper.find('Add')).to.have.length(1);
      wrapper.find('Add').simulate('press');
      expect(count).to.equal(1);
    }

    @test("should render view when dummy = true")
    render_tile_3() {
      const key: string = 'MODIFY_FAVS';
      const horzEnd:boolean = false;
      const vertEnd:boolean = false;
      const dummy: boolean = true;
      const wrapper = shallow(
        <Tile dummy={dummy} horzEnd={horzEnd} vertEnd={vertEnd} key={key} />
      );
      expect(wrapper.find(Animated.View)).to.have.length(6);
    }

    @test("should render view when dummy = false")
    render_tile_4() {
      const key: string = 'MODIFY_FAVS';
      const horzEnd:boolean = false;
      const vertEnd:boolean = false;
      const dummy: boolean = false;
      const wrapper = shallow(
        <Tile key={key + 'd'} horzEnd={horzEnd} vertEnd={vertEnd} dummy={dummy} />
      );
      expect(wrapper.find(Animated.View)).to.have.length(6);
    }

    @test("should render view when state.isActive = false")
    render_tile_5() {
      const restLayouts: Array<object> = [{x: 100, y: 100}];
      const idx: number = 0;
      const key: string = 'MODIFY_FAVS';
      const horzEnd: boolean = false;
      const vertEnd: boolean = false;
      const name: string = 'MyName';
      const photoUrl: string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const editing: boolean = true;
      let isActivated: boolean = false;
      let isRemoved: boolean = false;
      let isClicked: boolean = false;
      const onRemove: () => {} = () => isRemoved = true;
      const onLayout: () => {} = () => isClicked = !isClicked;
      const onActivate: () => {} = () => isActivated = !isActivated;

      const wrapper = shallow(
        <Tile
            key={key}
            id={key}
            horzEnd={horzEnd}
            vertEnd={vertEnd}
            name={name}
            photoUrl={photoUrl}
            editing={editing}
            onRemove={onRemove}
            onLayout={onLayout}
            restLayout={restLayouts[idx]}
            onActivate={onActivate}
        />
      );
      expect(wrapper.find(Animated.View)).to.have.length(6);
    }

    @test("should render view when state.isActive = true")
    render_tile_6() {
      const restLayouts: Array<object> = [{x: 100, y: 100}];
      const containerLayout:object = {width: 100, height: 100};
      const idx: number = 0;
      const key: string = 'MODIFY_FAVS';
      const horzEnd: boolean = false;
      const vertEnd: boolean = false;
      const name: string = 'MyName';
      const photoUrl: string = 'https://s-media-cache-ak0.pinimg.com/564x/13/13/f4/1313f4a1985d9350ad4cab3b5bce8961.jpg';
      const editing: boolean = true;
      let isActivated: boolean = true;
      let isRemoved: boolean = false;
      let isClicked: boolean = false;
      const openVal: Animated.Value = new Animated.Value(1);
      const onRemove: () => {} = () => isRemoved = true;
      const onLayout: () => {} = () => isClicked = !isClicked;
      const onActivate: () => {} = () => isActivated = !isActivated;

      const wrapper = shallow(
        <Tile
            key={key}
            id={key}
            horzEnd={horzEnd}
            vertEnd={vertEnd}
            name={name}
            photoUrl={photoUrl}
            editing={editing}
            onRemove={onRemove}
            onLayout={onLayout}
            restLayout={restLayouts[idx]}
            onActivate={onActivate}
            openVal = {openVal}
            containerLayout = {containerLayout}
        />
      );

      wrapper.setState({isActive : true});

      expect(wrapper.find(Animated.View)).to.have.length(6);
      // expect(wrapper.find(Animated.View).get(1).props.style[1][0]).to.eql({
      //   position: 'absolute',
      //   left: 0,
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   width: undefined,
      //   height: undefined,
      //   borderRadius: 0,
      // });
    }

    @test("test function _onLongPress")
    test__onLongPress(){
      let tile = new Tile({});
      //tile._onLongPress();
    }

}
