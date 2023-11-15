import Image from "next/image";

type reviewCardProps = {
  header: string;
  message: string;
  name: string;
  college: string;
  photo: string;
};

export default function ReviewCard(props: reviewCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:w-2/3 md:w-3/4 mx-auto px-11 border-[0.5px] border-neutral-300 ">
      
      <h3 className="text-lg font-bold mt-4 text-center">{props.header}</h3>
      <p className="text-sm font-normal mt-2 text-center text-[#5E6672]">
        {props.message}
      </p>
      <div className="flex flex-col mb-5 mt-5 gap-4 items-center">
      <Image
          src={props.photo}
          alt="user profile photo"
          width={300}
          height={132}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <h2 className="font-bold">{props.name}</h2>
        </div>
      </div>
    </div>
  );
}
