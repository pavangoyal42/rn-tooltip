"use strict";
//  @flow
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const deprecated_react_native_prop_types_1 = require("deprecated-react-native-prop-types");
const prop_types_1 = __importDefault(require("prop-types"));
const Triangle_1 = __importDefault(require("./Triangle"));
const helpers_1 = require("./helpers");
const getTooltipCoordinate_1 = __importDefault(require("./getTooltipCoordinate"));
const ViewPropTypes = deprecated_react_native_prop_types_1.ViewPropTypes || react_native_1.View.propTypes;
class Tooltip extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isVisible: false,
            yOffset: 0,
            xOffset: 0,
            elementWidth: 0,
            elementHeight: 0,
        };
        this.toggleTooltip = () => {
            const { onClose } = this.props;
            this.getElementPosition();
            this.setState((prevState) => {
                if (prevState.isVisible && !helpers_1.isIOS) {
                    onClose && onClose();
                }
                return { isVisible: !prevState.isVisible };
            });
        };
        this.wrapWithAction = (actionType, children) => {
            switch (actionType) {
                case 'press':
                    return (<react_native_1.TouchableOpacity onPress={this.toggleTooltip} activeOpacity={1} {...this.props.toggleWrapperProps}>
            {children}
          </react_native_1.TouchableOpacity>);
                case 'longPress':
                    return (<react_native_1.TouchableOpacity onLongPress={this.toggleTooltip} activeOpacity={1} {...this.props.toggleWrapperProps}>
            {children}
          </react_native_1.TouchableOpacity>);
                default:
                    return children;
            }
        };
        this.getTooltipStyle = () => {
            const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
            const { height, backgroundColor, width, withPointer, containerStyle, } = this.props;
            const { x, y } = getTooltipCoordinate_1.default(xOffset, yOffset, elementWidth, elementHeight, helpers_1.ScreenWidth, helpers_1.ScreenHeight, width, withPointer);
            const tooltipStyle = {
                position: 'absolute',
                left: react_native_1.I18nManager.isRTL ? null : x,
                right: react_native_1.I18nManager.isRTL ? x : null,
                width,
                height,
                backgroundColor,
                // default styles
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                borderRadius: 10,
                padding: 10,
                ...containerStyle,
            };
            const pastMiddleLine = yOffset > y;
            if (typeof height !== 'number' && pastMiddleLine) {
                tooltipStyle.bottom = helpers_1.ScreenHeight - y;
            }
            else if (typeof height === 'number' && pastMiddleLine) {
                tooltipStyle.top = y - height;
            }
            else {
                tooltipStyle.top = y;
            }
            return { tooltipStyle, pastMiddleLine };
        };
        this.renderPointer = (pastMiddleLine) => {
            const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
            const { backgroundColor, pointerColor, pointerStyle } = this.props;
            return (<react_native_1.View style={{
                position: 'absolute',
                top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
                left: react_native_1.I18nManager.isRTL ? null : xOffset + elementWidth / 2 - 7.5,
                right: react_native_1.I18nManager.isRTL ? xOffset + elementWidth / 2 - 7.5 : null,
            }}>
        <Triangle_1.default style={{
                borderBottomColor: pointerColor || backgroundColor,
                ...pointerStyle,
            }} isDown={pastMiddleLine}/>
      </react_native_1.View>);
        };
        this.renderContent = (withTooltip) => {
            const { popover, withPointer, highlightColor, actionType } = this.props;
            if (!withTooltip)
                return this.wrapWithAction(actionType, this.props.children);
            const { yOffset, xOffset, elementWidth, elementHeight } = this.state;
            const { pastMiddleLine, tooltipStyle } = this.getTooltipStyle();
            return (<React.Fragment>
        <react_native_1.View style={{
                position: 'absolute',
                top: yOffset,
                left: react_native_1.I18nManager.isRTL ? null : xOffset,
                right: react_native_1.I18nManager.isRTL ? xOffset : null,
                backgroundColor: highlightColor,
                overflow: 'visible',
                width: elementWidth,
                height: elementHeight,
            }}>
          {this.props.children}
        </react_native_1.View>
        {withPointer && this.renderPointer(Boolean(pastMiddleLine))}
        <react_native_1.View style={tooltipStyle}>{popover}</react_native_1.View>
      </React.Fragment>);
        };
        this.getElementPosition = () => {
            this.renderedElement &&
                this.renderedElement.measureInWindow((pageOffsetX, pageOffsetY, width, height) => {
                    this.setState({
                        xOffset: pageOffsetX,
                        yOffset: pageOffsetY,
                        elementWidth: width,
                        elementHeight: height,
                    });
                });
        };
    }
    componentDidMount() {
        // wait to compute onLayout values.
        this.timeout = setTimeout(this.getElementPosition, 500);
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    render() {
        const { isVisible } = this.state;
        const { onClose, withOverlay, onOpen, overlayColor } = this.props;
        return (<react_native_1.View collapsable={false} ref={(e) => (this.renderedElement = e)}>
        {this.renderContent(false)}
        <react_native_1.Modal animationType="fade" visible={isVisible} transparent onDismiss={onClose} onShow={onOpen} onRequestClose={onClose}>
          <react_native_1.TouchableOpacity style={styles.container(withOverlay, overlayColor)} onPress={this.toggleTooltip} activeOpacity={1}>
            {this.renderContent(true)}
          </react_native_1.TouchableOpacity>
        </react_native_1.Modal>
      </react_native_1.View>);
    }
}
Tooltip.propTypes = {
    children: prop_types_1.default.element,
    withPointer: prop_types_1.default.bool,
    popover: prop_types_1.default.element,
    height: prop_types_1.default.oneOfType([prop_types_1.default.number, prop_types_1.default.string]),
    width: prop_types_1.default.oneOfType([prop_types_1.default.number, prop_types_1.default.string]),
    containerStyle: ViewPropTypes.style,
    pointerColor: prop_types_1.default.string,
    pointerStyle: prop_types_1.default.object,
    onClose: prop_types_1.default.func,
    onOpen: prop_types_1.default.func,
    withOverlay: prop_types_1.default.bool,
    toggleWrapperProps: prop_types_1.default.object,
    overlayColor: prop_types_1.default.string,
    backgroundColor: prop_types_1.default.string,
    highlightColor: prop_types_1.default.string,
    actionType: prop_types_1.default.oneOf(['press', 'longPress', 'none']),
};
Tooltip.defaultProps = {
    toggleWrapperProps: {},
    withOverlay: true,
    highlightColor: 'transparent',
    withPointer: true,
    actionType: 'press',
    height: 40,
    width: 150,
    containerStyle: {},
    pointerStyle: {},
    backgroundColor: '#617080',
    onClose: () => { },
    onOpen: () => { },
};
const styles = {
    container: (withOverlay, overlayColor) => ({
        backgroundColor: withOverlay
            ? overlayColor
                ? overlayColor
                : 'rgba(250, 250, 250, 0.70)'
            : 'transparent',
        flex: 1,
    }),
};
exports.default = Tooltip;
