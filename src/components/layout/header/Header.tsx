import { Stack } from "@/components/ui/Stack/Stack";
import { FC } from "react";
import ThemeChanger from "./ThemeChanger";

type THeaderProps = {
}

const Header: FC<THeaderProps> = () => {
    return (
        <Stack alignment="center" secondaryAxisAlignment="end">
            <ThemeChanger />
        </Stack>
    );
};

export default Header;