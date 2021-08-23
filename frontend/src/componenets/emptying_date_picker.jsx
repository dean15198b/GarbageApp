import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const EmptyingDatePicker = ({
  emptyingDate,
  setEmptyingDate,
  header,
  error,
}) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        className={classes.root}
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id={header}
        label={emptyingDate !== null && emptyingDate !== "" ? "" : header}
        value={emptyingDate}
        onChange={(newDate) =>
          setEmptyingDate(newDate && newDate.toDateString())
        }
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        error={!!error}
      />
    </MuiPickersUtilsProvider>
  );
};
export default EmptyingDatePicker;
