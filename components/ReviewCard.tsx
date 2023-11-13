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
      
      {/* <h3 className="text-sm font-medium mt-4 text-center">{props.header}</h3> */}
      <p className="text-sm font-normal mt-4 text-center text-[#5E6672]">
        {props.message}
      </p>
      <div className="flex xl:flex-row flex-col mb-16 mt-12 gap-4 items-center">
       
        <div className="flex flex-col">
          <h2 className="font-bold">{props.name}</h2>
        </div>
      </div>
    </div>
  );
}
