"use client";
import { useCallback } from "react";
import Button from "../Button";

interface FormContainerProps {
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  onSubmit: () => void;
}

// Conatainer for all forms

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  onSubmit,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-slate-50">
        <div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div className="h-full opacity-100 ">
            <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none translate lg:h-auto md:h-auto focus:outline-none">
              {/* Header */}
              <div className="relative flex items-center justify-center p-6 rounded-t border-b-1px">
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* body */}
              <form onSubmit={handleSubmit}>
                <div className="relative flex-auto p-6">{body}</div>
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center w-full gap-4">
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                      />
                    )}

                    <Button
                      type="submit"
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </form>

              {/* footer */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormContainer;
