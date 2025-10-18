import Image from "next/image";

interface IProps {
  imageURL: string;
  name: string;
  email: string;
}

export default function PersonCard({ email, imageURL, name }: IProps) {
  return (
    <div
      data-testid="person-card"
      className="flex items-center px-6 py-1.5 text-gray-900"
    >
      <Image
        data-testid="person-card-image"
        className="rounded-full"
        src={imageURL}
        alt={`${name} avatar`}
        width={25}
        height={25}
      />
      <div className="ml-3">
        <div data-testid="person-card-name" className="text-xs font-semibold">
          {name}
        </div>
        <div data-testid="person-card-email" className="text-gray-500 text-[10px]">
          {email}
        </div>
      </div>
    </div>
  );
}
