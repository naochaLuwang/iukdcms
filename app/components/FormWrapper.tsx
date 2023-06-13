"use client";
import { useCallback } from "react";
import Button from "../components/Button";

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

const FormWrapper: React.FC<FormContainerProps> = ({
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
      <div>
        <div className="pt-20">
          {/* CONTENT */}
          <div className="h-full opacity-100 ">
            <div className="relative flex flex-col h-full max-w-5xl mx-auto translate lg:h-auto md:h-auto focus:outline-none">
              {/* Header */}
              <div className="relative flex items-center justify-center p-6 rounded-t border-b-1px">
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* body */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* footer */}
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
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormWrapper;
