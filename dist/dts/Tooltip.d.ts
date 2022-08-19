export default Tooltip;
declare class Tooltip extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    renderedElement: any;
    timeout: any;
    toggleTooltip: () => void;
    wrapWithAction: (actionType: any, children: any) => any;
    getTooltipStyle: () => {
        tooltipStyle: any;
        pastMiddleLine: boolean;
    };
    renderPointer: (pastMiddleLine: any) => JSX.Element;
    renderContent: (withTooltip: any) => any;
    getElementPosition: () => void;
}
declare namespace Tooltip {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactElementLike>;
        const withPointer: PropTypes.Requireable<boolean>;
        const popover: PropTypes.Requireable<PropTypes.ReactElementLike>;
        const height: PropTypes.Requireable<string | number>;
        const width: PropTypes.Requireable<string | number>;
        const containerStyle: any;
        const pointerColor: PropTypes.Requireable<string>;
        const pointerStyle: PropTypes.Requireable<object>;
        const onClose: PropTypes.Requireable<(...args: any[]) => any>;
        const onOpen: PropTypes.Requireable<(...args: any[]) => any>;
        const withOverlay: PropTypes.Requireable<boolean>;
        const toggleWrapperProps: PropTypes.Requireable<object>;
        const overlayColor: PropTypes.Requireable<string>;
        const backgroundColor: PropTypes.Requireable<string>;
        const highlightColor: PropTypes.Requireable<string>;
        const actionType: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const toggleWrapperProps_1: {};
        export { toggleWrapperProps_1 as toggleWrapperProps };
        const withOverlay_1: boolean;
        export { withOverlay_1 as withOverlay };
        const highlightColor_1: string;
        export { highlightColor_1 as highlightColor };
        const withPointer_1: boolean;
        export { withPointer_1 as withPointer };
        const actionType_1: string;
        export { actionType_1 as actionType };
        const height_1: number;
        export { height_1 as height };
        const width_1: number;
        export { width_1 as width };
        const containerStyle_1: {};
        export { containerStyle_1 as containerStyle };
        const pointerStyle_1: {};
        export { pointerStyle_1 as pointerStyle };
        const backgroundColor_1: string;
        export { backgroundColor_1 as backgroundColor };
        export function onClose_1(): void;
        export { onClose_1 as onClose };
        export function onOpen_1(): void;
        export { onOpen_1 as onOpen };
    }
}
import * as React from "react";
import PropTypes from "prop-types";
