import { getSubmissionById} from "@/src/db/queries/select";
import { SubmissionAttachment, SubmissionView } from "@/types";
import { useEffect, useState } from "react";

export function useViewSubmission(submissionId: number) {
  const [submission, setSubmission] = useState<SubmissionView | null>(null);
  const [attachments, setAttachments] = useState<SubmissionAttachment>({} as SubmissionAttachment);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const data = await getSubmissionById(submissionId);
        if (data) {
          setSubmission(data.submission);
          setAttachments(data.attachments);
        } else {
          setError("Submission not found.");
        }
      } catch (err) {
        setError("Failed to fetch submission.");
      } finally {
        setLoading(false);
      }
    }

    fetchSubmission();
  }, [submissionId,setSubmission]);

  return { submission, attachments, loading, error };
}
