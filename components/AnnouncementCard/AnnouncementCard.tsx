interface IProps {
  title: string;
  description: string;
  createdAt: string;
}

const AnnouncementsCard = ({ description, title, createdAt }: IProps) => {
  return (
    <div
      className="relative p-6 rounded-2xl bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl mx-auto mb-6 border-1 border-gray-300 max-h-[220] h-[220] flex flex-col justify-between"
      data-testid="announcement-card"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-2 bg-[#319DC4] rounded-l-xl"
        data-testid="announcement-card-accent"
      ></div>
      <div className="flex justify-between items-center mb-4">
        <h3
          className="text-xl font-semibold text-gray-900 hover:text-[#FFA41F] transition-all duration-300 ease-in-out"
          data-testid="announcement-title"
        >
          {title}
        </h3>
      </div>
      <p
        className="text-gray-700 mt-2 text-sm md:text-base line-clamp-3"
        data-testid="announcement-description"
      >
        {description}
      </p>
      <div
        className="flex justify-between items-center mt-4 text-sm text-gray-500"
        data-testid="announcement-footer"
      >
        <div className="flex items-center" data-testid="announcement-date-container">
          <span className="text-[#FFA41F] font-medium" data-testid="announcement-date-label">
            Date:
          </span>
          <span className="ml-1" data-testid="announcement-date-value">
            {createdAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsCard;
