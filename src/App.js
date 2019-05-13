import React, { Component } from 'react';
import FormDemo from './demo/FormDemo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import applyTheme from './theme';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    grid: {
        minHeight: '400px',
        height: '100vh'
    },
    card: {
        maxWidth: 600
    }
});

class App extends Component {
    state = {
        openDialog: false,
        formKey: 0,
        formData: {}
    };

    onDialogClose = this.onDialogClose.bind(this);
    onDialogClose() {
        this.setState(state => ({
            openDialog: false,
            formKey: state.formKey + 1
        }), () => { // clear local form data
            this.setState({
                formData:{}
            });
        });
    }

    openDialog = this.openDialog.bind(this);
    openDialog(formData) {
        this.setState({
            openDialog: true,
            formData
        });
    }


    render() {
        const { classes } = this.props;

        return (
            <Grid className={classes.grid}
                container justify="center" alignItems="center">

                    <Card raised className={classes.card}>
                        <CardContent>
                            <Typography gutterBottom variant="h5">React Form Validation Demo</Typography>
                            <FormDemo key={this.state.formKey} onSubmit={this.openDialog} />
                        </CardContent>
                    </Card>

                    <Dialog open={this.state.openDialog} onClose={ this.onDialogClose }>
                        <DialogTitle>Form Data Submited</DialogTitle>
                        <DialogContent>
                            <List>
                            {
                                Object.entries(this.state.formData).map(([key, value], index) => (
                                    <ListItem key={index}>
                                        <ListItemText>{`${key}: ${value}`}</ListItemText>
                                    </ListItem>
                                ))
                            }
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onDialogClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
            </Grid>
        );
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired
        };
    }
}

export default compose (
    applyTheme,
    withStyles(styles)
) (App);
