import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormattedMessage } from "react-intl";
import { mainColor } from "../utils/colors";

export default function FullModal({ open, handleClose, children, title }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ textAlign: "center", fontSize: 14, color: mainColor }}
        >
          <FormattedMessage id={title} />
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="cancel" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
