export interface ProgressProps {
    steps: StepProps[];
  }
  export interface StepProps {
    name: string;
    active: boolean;
    completed: boolean;
  }
  