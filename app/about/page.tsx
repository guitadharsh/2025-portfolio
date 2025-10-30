import Image from "next/image";
import familyImage from "@/public/assets/images/actor-4.png";

const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 max-w-5xl mx-auto text-center md:text-left">
      {/* 👨‍👩‍👧 Family Image */}
      <div className="relative w-48 h-48 md:w-70 md:h-70 rounded-2xl overflow-hidden shadow-lg border border-stone-300">
        <Image
          src={familyImage}
          alt="My Family"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* 💬 About Content */}
      <div className="max-w-xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-serif text-primary flex items-baseline gap-2 flex-wrap">
          A Family Boy from Kerala
          <div className="text-sm sm:text-base italic text-primary/80 font-serif">
            തിരുവനന്തപുരം
          </div>
        </h2>

        <p className="text-stone-700 leading-relaxed text-base md:text-lg font-serif">
          I’m a <strong>Malayali</strong>rooted in Kerala, India. A{" "}
          <strong>software developer</strong> by profession and a{" "}
          <strong>music enthusiast</strong> by heart. With around{" "}
          <strong>3 years of experience</strong> in building digital products,
          I’m constantly learning how to blend logic with emotion.
        </p>

        <p className="text-stone-700 leading-relaxed text-base md:text-lg font-serif">
          I love listening to tunes, even though I’m still searching for my
          perfect <em>tones and chords</em>. Music, like code, speaks to me, I
          just haven’t learned all its words yet.
        </p>

        <p className="text-stone-600 italic font-serif">
          I find beauty in nostalgia, old-world warmth, and vintage simplicity.
        </p>
      </div>
    </section>
  );
};

export default About;
