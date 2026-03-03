/* eslint-disable @next/next/no-img-element */
export default function TofuSection() {
  return (
    <section
      id="tofu"
      className="py-20 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #F8F5F0 0%, #F0EBE3 50%, #F8F5F0 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="https://www.lineage.us/wp-content/uploads/2026/02/Tofu-Journal-Mockup.png"
            alt="The TOFU Journal"
            className="w-full max-w-[380px] md:max-w-[380px] max-w-[220px] block drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[#8A7A66] mb-3 block">
            A Complete Personal Discipleship System
          </span>
          <h2
            className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-[#1a2840] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The TOFU Journal
          </h2>
          <p className="text-[1.05rem] text-[#6B5E4F] font-light italic mb-6">
            Transform Your Walk with God &mdash; One Day at a Time
          </p>
          <div className="w-[50px] h-[2px] bg-[#C8B898] mb-6 mx-auto md:mx-0" />
          <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light mb-4">
            The TOFU Journal is a 365-day Bible reading and journaling system designed to help you build
            a consistent, meaningful relationship with Scripture. Whether you&apos;re new to the Bible or
            deepening an existing practice, this journal meets you where you are.
          </p>
          <div className="flex flex-col gap-3 my-6 items-center md:items-start">
            <div className="flex items-center gap-3 text-[0.88rem] text-[#3D352D]">
              <span className="text-[1.1rem]">&#128214;</span> 365-Day Bible Reading Plan
            </div>
            <div className="flex items-center gap-3 text-[0.88rem] text-[#3D352D]">
              <span className="text-[1.1rem]">&#9997;&#65039;</span> Guided Journaling Process
            </div>
            <div className="flex items-center gap-3 text-[0.88rem] text-[#3D352D]">
              <span className="text-[1.1rem]">&#128161;</span> Daily Reflection Prompts
            </div>
          </div>
          <a
            href="https://amzn.to/4r8R4sE"
            target="_blank"
            rel="noopener"
            className="inline-block px-9 py-3 bg-[#1a2840] text-white text-[0.82rem] font-semibold tracking-[0.08em] uppercase no-underline transition-all hover:bg-[#2a3d5c]"
          >
            Get Your Copy
          </a>
        </div>
      </div>
    </section>
  );
}
