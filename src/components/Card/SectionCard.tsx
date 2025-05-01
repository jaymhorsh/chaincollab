import React, { ReactNode } from 'react';

const SectionCard = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <section className="md:px-6 px-3 w-full py-4 pb-10 relative rounded-lg my-4 bg-white">
      <div className="w-full h-full">
        <div className="flex flex-col justify-center  gap-y-3">
          <div>
            <p className="text-xl font-bold">{title}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  md:w-[90%]">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SectionCard;
