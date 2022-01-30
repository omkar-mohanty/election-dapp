import { IconButton } from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Link } from "react-router-dom";
export default function AddButton() {
    return (
        <>
            <IconButton
                position="static"
                size="large"
                variant="outlined"
                LinkComponent={Link}
                to="/add">
                <AddBoxOutlinedIcon />
            </IconButton>
        </>
    )
}