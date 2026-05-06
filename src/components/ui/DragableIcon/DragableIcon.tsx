import { MdDragIndicator } from "react-icons/md";
import classes from "./DragableIcon.module.css"
import { ComponentProps, FC } from "react";

type TDragableIconProps = ComponentProps<"div">

const DragableIcon: FC<TDragableIconProps> = ({ ref }) => {
    return (
        <div ref={ref}>
            <MdDragIndicator className={classes["icon"]} />
        </div>
    );
};

export default DragableIcon;