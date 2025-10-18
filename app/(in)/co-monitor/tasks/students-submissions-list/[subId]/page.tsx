import SubmissonCom from "@/components/SubmissionCom/SubmissonCom";
import { requireAuth } from "@/context/auth";

import React from "react";
interface Props {
  params: Promise<{ subId: number }>;
}
export default async function page({ params }: Props) {
  const { subId } = await params;
  const { userId } = await requireAuth();
  return (
    <div>
      <SubmissonCom id={subId} CoMentorId={userId} />
    </div>
  );
}
