import React from "react";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const EmptyingDatePicker = ({ emptyingDate, setEmptyingDate, header }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id={header}
      label={header}
      value={emptyingDate && new Date(emptyingDate)}
      onChange={(newDate) => setEmptyingDate(newDate.toDateString())}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  </MuiPickersUtilsProvider>
);
export default EmptyingDatePicker;
