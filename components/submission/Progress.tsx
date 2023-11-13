import Check from "@/public/round-check.svg";

export interface ProgressProps {
  steps: StepProps[];
}
interface StepProps {
  name: string;
  active: boolean;
  completed: boolean;
}

function Progress({ steps }: ProgressProps) {
  return (
    <div className="flex items-center justify-center w-full h-20 pb-2">
      {steps.map((step, index) => {
        return (
          <div
            className={`flex flex-grow items-center ${
              index === steps.length - 1 && "flex-grow-0"
            }`}
            key={step.name}
          >
            <div className="flex flex-col  items-center relative">
              <div
                className={`rounded-full font-semibold border text-gray-400 
            ${
              step.active || step.completed
                ? "border-tertiary-navy"
                : "border-gray-400"
            }
             w-12 h-12 text-center flex  ${
               step.active && "bg-white text-tertiary-navy"
             } 
                ${step.completed && "bg-tertiary-navy text-white"}  
                ${
                  step.active &&
                  step.completed &&
                  " !text-white !bg-tertiary-navy"
                }
            items-center justify-center transition-all duration-500 `}
              >
                {step.completed && !step.active ? (
                 <div className="w-6 h-6">✓</div>
                ) : (
                  index + 1
                )}
              </div>
              <h1 className="first-letter:capitalize absolute text-sm -bottom-1/2  w-max  mx-auto  left-0 right-0  text-center h-fit">
                {step.name}
              </h1>
            </div>

            {index !== steps.length - 1 && (
              <hr className="flex-grow bg-gray-500 h-[2px]" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Progress;
