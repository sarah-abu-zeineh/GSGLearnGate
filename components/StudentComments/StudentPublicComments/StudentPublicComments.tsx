"use client";

import { Comments, StudentName } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  comments: Comments[] | null;
  studentId: number;
  courseId: string;
  taskId: string;
  studentName: StudentName[];
}
const StudentPublicComments = (props: IProps) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comments[] | null>(props.comments);
  const handleClick = async () => {
    if (content !== "") {
      try {
        const response = await fetch("/api/student/insertComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content,
            studentId: Number(props.studentId),
            taskId: Number(props.taskId),
            courseId: Number(props.courseId),
            isPublic: true,
            submissionId: null,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit comment");
        }
        const newComment = await response.json();
        setComments((prev) => [...(prev || []), newComment]);
        setContent("");
        toast.success("Comment Added Successfully", { autoClose: 3000 });
      } catch (error) {
        console.error("Insert Comment failed:", error);
        toast.error("Something went wrong!! Please try again...", {
          autoClose: 3000,
        });
      }
    } else {
      toast.warning("Add Content then post comment", { autoClose: 3000 });
    }
  };
  return (
    <section
      data-testid="public-comments-section"
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2
        data-testid="public-comments-title"
        className="text-xl font-semibold text-[#FFA41F] mb-4"
      >
        Public Comments
      </h2>
      <div data-testid="comments-list" className="space-y-4">
        {comments &&
          comments
            .filter((comment) => comment.isPublic)
            .map((comment) => {
              return (
                <div
                  key={comment.id}
                  data-testid="comment-item"
                  className="bg-[#FFF5E8] p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <p data-testid="comment-content" className="text-sm text-neutral-700">
                    <span data-testid="comment-user" className="font-medium text-[#E99375]">
                      {comment.userName || props.studentName[0].name}:
                    </span>{" "}
                    {comment.content}
                  </p>
                  <p data-testid="comment-date" className="text-xs text-neutral-700">
                    {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
      </div>
      <form data-testid="comment-form" className="space-y-4 mt-5">
        <textarea
          data-testid="comment-input"
          className="w-full p-4 border border-[#E99375] rounded-lg focus:ring-2 focus:ring-[#FFA41F] focus:outline-none"
          rows={4}
          placeholder="Write a public comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-center">
          <button
            data-testid="comment-submit-button"
            type="button"
            className="px-6 py-3 bg-[#FFA41F] text-white rounded-lg font-semibold shadow hover:bg-[#FF8700] transition"
            onClick={handleClick}
          >
            Post Comment
          </button>
        </div>
      </form>
    </section>
  );
};

export default StudentPublicComments;
