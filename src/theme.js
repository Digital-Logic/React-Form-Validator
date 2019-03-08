import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

const darkTheme = {
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: 'dark',
        primary: {
            main: "rgba(55,229,255, 0.87)"
        }
    }
};

function applyTheme(WrappedComponent) {
    function ApplyTheme(props) {
        return (
            <MuiThemeProvider theme={createMuiTheme(darkTheme)}>
                <CssBaseline />
                <WrappedComponent {...props} />
            </MuiThemeProvider>
        );
    }
    return ApplyTheme;
}

export default applyTheme;
