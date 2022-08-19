declare type Coord = {
    x: number;
    y: number;
};
declare const getTooltipCoordinate: (x: number, y: number, width: number, height: number, ScreenWidth: number, ScreenHeight: number, receivedTooltipWidth: number | string, withPointer: boolean) => Coord;
export default getTooltipCoordinate;
