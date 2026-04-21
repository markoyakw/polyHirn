import { MdDragIndicator } from "react-icons/md";
import classes from "./DragableIcon.module.css"

const DragableIcon = () => {
    return (
        <MdDragIndicator className={classes["icon"]} />
    );
};

export default DragableIcon;