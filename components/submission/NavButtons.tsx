import React from "react";

function NavButtons({
  onClickForward,
  onClickBack,
  disabledForward,
  disabledBack,
  forwardText,
  forForward,
  forBack,
  loadingForward,
  loadingBack,
}: {
  onClickForward: () => void;
  onClickBack: () => void;
  disabledForward: boolean;
  disabledBack: boolean;
  forwardText?: string;
  forForward?: string;
  forBack?: string;
  loadingForward?: boolean;
  loadingBack?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <button
        className={`btn btn-gray w-32 `}
        disabled={disabledBack}
        onClick={onClickBack}
        form={forBack}
      >
        {loadingBack && <span className="loading loading-spinner"></span>} Back
      </button>
      <button
        className={`btn btn-primary w-32`}
        disabled={disabledForward}
        onClick={onClickForward}
        form={forForward}
      >
        {loadingForward && <span className="loading loading-spinner"></span>}{" "}
        {forwardText || "Next"}
      </button>
    </div>
  );
}

export default NavButtons;
