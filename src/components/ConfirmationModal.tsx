import { Modal, Box, Typography, Button } from "@material-ui/core";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ConfirmationModalProps {
  title: string;
  open: boolean;
  handleClose: (e: any) => void;
  handleConfirm: (e: any) => void;
}

const ConfirmationModal = ({
  title,
  open,
  handleClose,
  handleConfirm,
}: ConfirmationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={(e) => handleClose(e)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description">
          This action is permanent.
        </Typography>
        <div>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
