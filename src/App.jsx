import { Stack } from "@mui/material";
import LogoIcon from "./assets/LogoIcon";
import Landing from "./components/Landing";
import { HeaderNavbar } from "./styles";

function App() {
    return (
        <Stack>
            <HeaderNavbar>
                <LogoIcon />
            </HeaderNavbar>
            <Landing />
        </Stack>
    );
}

export default App;
