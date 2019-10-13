import React from "react";

import { FormattedMessage } from "react-intl";

import {
  Dialog,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

const Modal = ({ open, handleClose, confirm, title, content }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      <FormattedMessage id={title} />
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <FormattedMessage id={content} />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={confirm} color="primary">
        <FormattedMessage id="confirm" />
      </Button>
      <Button onClick={handleClose} color="secondary" autoFocus>
        <FormattedMessage id="cancel" />
      </Button>
    </DialogActions>
  </Dialog>
);

export default Modal;
