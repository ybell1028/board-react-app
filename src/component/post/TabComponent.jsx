import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function TabComponent() {
    const classes = useStyles();
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">탭</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} onChange={handleChange}>
                    <MenuItem value={"life"}>일상</MenuItem>
                    <MenuItem value={"game"}>게임</MenuItem>
                    <MenuItem value={"dev"}>개발</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default TabComponent;
