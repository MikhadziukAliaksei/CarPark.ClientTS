import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from './Typography';

const styles = (theme : any) => ({
  root: {
    padding: theme.spacing(2),
  },
  error: {
    backgroundColor: theme.palette.error,
    color: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success,
    color: theme.palette.success.dark,
  },
});

function FormFeedback(props : any) {
  return (
    <div
      className={clsx(
        props.classes.root,
        { [props.classes.error]: props.error, [props.classes.success]: props.success },
        props.className,
      )}
    >
      <Typography >{props.children}</Typography>
    </div>
  );
}

FormFeedback.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default withStyles(styles)(FormFeedback);