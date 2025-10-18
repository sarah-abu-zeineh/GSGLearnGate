import UpdateCourseForm from '@/components/UpdateCourseForm';
import { getCoMonitorsNames, getMonitorsNames } from '@/src/db/queries/select';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const Page = async() => {
    const monitors = await getMonitorsNames();
    const coMonitors = await getCoMonitorsNames();
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Update Course</h1>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Hi, Admin</span>
            <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
          </div>
        </div>
      </div>

      <UpdateCourseForm monitors={monitors} coMonitors={coMonitors}/>
    </div>
  );
};

export default Page;