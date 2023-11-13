"use client";
import { useSubmissionContext } from "@/components/submission/SubmissionContext";
import Progress from "./Progress";
import SubmissionCard from "../wrappers/SubmissionCard";
import { useParams } from "next/navigation";
import CircleBackground from "@/components/wrappers/CircleBackground";
import Link from "next/link";

function SubmissionLayout({ children }: { children: React.ReactNode }) {
  const { steps } = useSubmissionContext();
  const params = useParams();
  return (
    <CircleBackground size="half">
      <SubmissionCard>
        <h1 className="text-2xl font-bold text-center pt-4 pb-1">
          Create a Picture Board!
        </h1>
        
        <div className="mx-auto w-3/5">
          <Progress steps={steps} />
        </div>
        {children}
      </SubmissionCard>
    </CircleBackground>
  );
}

export default SubmissionLayout;
