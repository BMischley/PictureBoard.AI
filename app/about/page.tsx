import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-quaternary-grey">
      <div>
        <h2 className="font-semibold mb-4 text-2xl">About PictureBoard.ai</h2>
              <p className="max-w-5xl">
                PictureBoard.ai is designed for someone who has a non-verbal
                disability and uses picture boards to communicate with people.
                This includes basic communication like yes, no, and what they
                want or need at a certain point in time. Our system will provide
                value to this persona by allowing them to create picture boards
                that are more tailored to their interests beyond basic
                communication. For example, a user who wants to talk about
                football can create an entire picture board related to the
                various aspects of football, whether that be certain teams,
                plays, or current controversies. Some unique considerations
                built into our system for our client include the ability for
                users to easily resize and rearrange images generated. This is
                to create a truly customizable picture board creating experience
                for the user.
              </p>
      </div>
		</main>
	);
}
