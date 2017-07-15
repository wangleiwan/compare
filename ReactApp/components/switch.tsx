import React, { Component, PropTypes } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	PanResponder,
	TouchableWithoutFeedback,
	Dimensions,
	Platform
} from 'react-native';
// App Globals
import AppStyles, { Style } from "../styles";
//component
import MiText from '../components/text';

interface props {
    value?: boolean;
    onValueChange?: any;
    disabled?: boolean;
    activeText?: string;
	activeTextStyle?: object;
	inactiveTextStyle?: object;
	containerStyle?: object;
	inActiveText?: string;
	backgroundActive?: string;
	backgroundInactive?: string;
	circleActiveColor?: string;
	circleInActiveColor?: string;
	circleSize?: number;
}

export default class Switch extends Component<props, any> {
	static defaultProps = {
		value: false,
		onValueChange: () => null,
		disabled: false,
		activeText: 'ON',
		inActiveText: 'OFF',
		backgroundActive: 'green',
		backgroundInactive: 'gray',
		circleActiveColor: 'white',
		circleInActiveColor: 'white',
		circleSize: 30,
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			value: props.value,
			transformSwitch: new Animated.Value(props.value ? -Style.getWidth(2.2) : -Style.getWidth(30)),
			backgroundColor: new Animated.Value(props.value ? 75 : -75),
			circleColor: new Animated.Value(props.value ? 75 : -75)
		};

		this.handleSwitch = this.handleSwitch.bind(this);
		this.animateSwitch = this.animateSwitch.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { disabled } = this.props;
		if (nextProps.value === this.props.value) {
			return;
		}
		if (disabled) {
			return;
		}

		this.animateSwitch(nextProps.value, () => {
			this.setState({ value: nextProps.value });
		});
	}

	handleSwitch() {
		const { value } = this.state;
		const { onValueChange, disabled } = this.props;
		if (disabled) {
			return;
		}

		this.animateSwitch(!value, () => {
			this.setState({ value: !value }, () => onValueChange(this.state.value));
		});
	}

	animateSwitch(value, cb = () => { }) {
		Animated.parallel([
			Animated.spring(this.state.transformSwitch, {
				toValue: value ?  -Style.getWidth(2.2) : -Style.getWidth(30),
			}),
			Animated.timing(this.state.backgroundColor, {
				toValue: value ? 75 : -75,
				duration: 200
			}),
			Animated.timing(this.state.circleColor, {
				toValue: value ? 75 : -75,
				duration: 200
			})
		]).start(cb);
	}

	render() {
		const {
			transformSwitch,
			backgroundColor,
			circleColor,
		} = this.state;

		const {
			backgroundActive,
			backgroundInactive,
			circleActiveColor,
			circleInActiveColor,
			activeText,
			inActiveText,
			circleSize,
			containerStyle,
			activeTextStyle,
			inactiveTextStyle
		} = this.props;

		const interpolatedColorAnimation = backgroundColor.interpolate({
			inputRange: [-75, 75],
			outputRange: [backgroundInactive, backgroundActive]
		});

		const interpolatedCircleColor = circleColor.interpolate({
			inputRange: [-75, 75],
			outputRange: [circleInActiveColor, circleActiveColor]
		});

    return (
			<TouchableWithoutFeedback onPress={this.handleSwitch}>
				<Animated.View
					style={[
						styles.container,
            			containerStyle,
						{backgroundColor: interpolatedColorAnimation}
					]}>
					<Animated.View
						style={[
							styles.animatedContainer,
							{ transform: [{ translateX: transformSwitch }]},
						]}>
						
						<View style={{width: Style.getWidth(32), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
							<MiText weight={'base'} center style={[styles.text, activeTextStyle, styles.activeText]}>
								{activeText}
							</MiText>
						</View>

						<Animated.View style={[styles.circle, {backgroundColor: interpolatedCircleColor}]} />
						
						<View style={{width: Style.getWidth(32), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
							<MiText weight={'base'} center style={[styles.text, inactiveTextStyle, styles.inactiveText]}>
								{inActiveText}
							</MiText>
						</View>
						
					</Animated.View>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: Style.getWidth(48),
		height: Platform.OS === 'ios' ? Style.getHeight(20) : Style.getWidth(20),
		borderRadius: 4,
		backgroundColor: '#B3B3B3',
	},
	animatedContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: Style.getWidth(80),
		height: Platform.OS === 'ios' ? Style.getHeight(20) : Style.getWidth(20),
	},
	circle: {
		width: Style.getWidth(16),
		height: Style.getWidth(16),
		borderRadius: 3,
		backgroundColor: 'white'
	},
	text: {
		fontSize: Platform.OS === 'ios' ? Style.getHeight(11) : Style.getWidth(11),
		lineHeight: Style.getHeight(13.5),
		color: 'white',
		backgroundColor: 'transparent',
		flex: 1
	},
	inactiveText: {
	  marginRight: Platform.OS === 'ios' ? Style.getWidth(2) : Style.getWidth(1)
	},
	activeText: {
	  marginLeft: Platform.OS === 'ios' ? Style.getWidth(2) : Style.getWidth(1)
	}
});
