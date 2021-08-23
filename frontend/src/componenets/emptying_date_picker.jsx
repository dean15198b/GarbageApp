import React from "react";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const EmptyingDatePicker = ({
  emptyingDate,
  setEmptyingDate,
  header,
  error,
}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id={header}
      label={emptyingDate === "" ? "" : header}
      value={emptyingDate}
      onChange={(newDate) => setEmptyingDate(newDate && newDate.toDateString())}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
      error={!!error}
    />
  </MuiPickersUtilsProvider>
);
export default EmptyingDatePicker;
