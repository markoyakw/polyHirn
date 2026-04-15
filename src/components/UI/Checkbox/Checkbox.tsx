import { ComponentPropsWithoutRef, FC } from "react";
import classes from "./Checkbox.module.css"

type TCheckboxProps = {} & Omit<ComponentPropsWithoutRef<"input">, "type">

const Checkbox: FC<TCheckboxProps> = ({ ...props }) => {
    return (
        <input className={classes.checkbox} type="checkbox" {...props} />
    );
};

export default Checkbox;