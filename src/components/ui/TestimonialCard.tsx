interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const TestimonialCard = ({
  quote,
  name,
  role,
  initials,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col">
      <p className="italic text-gray-200 mb-4">"{quote}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};
