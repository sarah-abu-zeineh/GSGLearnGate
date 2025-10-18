import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

interface IProps {
  link: string;
}

const CreateTaskBottom = ({ link }: IProps) => {
  return (
    <Link
      href={link}
      className="flex items-center px-4 py-2 bg-[#FFA41F] text-white rounded-md hover:bg-[#F59000] self-start md:self-auto max-sm:text-xs max-sm:px-1 max-sm:py-1 max-sm:w-[80]"
      data-testid="create-task-link"
    >
      <Plus
        size={18}
        weight="bold"
        className="mr-2"
        data-testid="create-task-icon"
      />
      <span data-testid="create-task-text">Create New Task</span>
    </Link>
  );
};

export default CreateTaskBottom;
