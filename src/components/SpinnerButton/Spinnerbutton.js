import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
function Spinnerbutton({ user }) {
  const [wait, SetWait] = useState(false);
  const SetDelay = (e) => {
    e.preventDefault();
    SetWait(true);
    setTimeout(() => {
      // console.log('This will run after 1 second!')
      SetWait(false);
    }, 10000);

    user.resendConfirmationCode((err, result) => {
      if (err) {
        console.log(err);
      } else if (result) {
        console.log(result);
      }
    });
  };

  return (
    <div>
      <Button
        onClick={SetDelay}
        disabled={wait}
        style={{ backgroundColor: "#01a495", minWidth: "150px" }}
      >
        {wait && (
          <Spinner
            style={{ marginRight: "5px" }}
            as="span"
            variant="warning"
            size="sm"
            role="status"
            aria-hidden="true"
            animation="grow"
          />
        )}
        {wait ? "you can resend code in some time..." : "Resend Code"}
      </Button>
    </div>
  );
}

export default Spinnerbutton;
