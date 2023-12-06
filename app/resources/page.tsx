import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-quaternary-grey">
      <div>
        <h2 className="font-semibold mb-4 text-2xl">The AI</h2>
              <p className="max-w-5xl">
                We leverage OpenAI's Dalle-3 with our own custom
                UI to generate our picture or communication boards!</p><a href="https://openai.com/dall-e-3">
                https://openai.com/dall-e-3
              </a>
      </div>
    </main>
  );
}
