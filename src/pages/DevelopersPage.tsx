import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Instagram,
  Globe,
} from "lucide-react";
import allisonProfilePic from "../assets/images/allison.jpg";
import biancaProfilePic from "../assets/images/bianca.jpg";

const DevelopersPage = () => {
  const developers = [
    {
      role: "Developer",
      name: "Bianca Garutti",
      bio: "As an experienced AR developer across multiple platforms, I have successfully collaborated to bring more than 500 AR solutions to life for global brands and organizations. Consistently exceeding client expectations, I am always driven to discover creative and innovative ways to translate their ideas into augmented reality experiences, solidifying my position as an expert in the AR industry.",
      email: "ar@biancagarutti.com",
      social: {
        github: "https://github.com/biancavgarutti-pixel",
        linkedin: "https://www.linkedin.com/in/biancagarutti/",
        instagram: "https://www.instagram.com/biancagarutti/",
        website: "https://www.biancagarutti.com/",
      },
      avatar: biancaProfilePic,
    },
    {
      role: "Developer",
      name: "Allison Barros",
      bio: (
        <>
          <p>
            Senior Frontend Engineer | User-Focused Web Application Development
          </p>
          <p>
            As a Senior Frontend Engineer with a degree in Systems Analysis and
            Development and 15 years of comprehensive experience, his career
            spans diverse roles including Requirements Analyst, Quality
            Assurance, Infrastructure, Backend, Frontend, and Tech Lead. This
            broad background enables him to tackle complex challenges and adapt
            to evolving project needs with exceptional versatility.
          </p>
        </>
      ),
      email: "barros.allison@gmail.com",
      social: {
        github: "https://github.com/allisonbarrosx",
        linkedin: "https://www.linkedin.com/in/allison-barros/",
        // twitter: "#",
        website: "https://allison-barrosdev.vercel.app/",
      },
      avatar: allisonProfilePic,
    },
  ];

  return (
    <div className="min-h-screen bg-[#06060e] text-white pt-32 pb-20 px-6">
      {/* Background Glows (Matching your screenshot style) */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16">
          <p className="text-purple-500 uppercase tracking-[0.4em] text-xs mb-4">
            Créditos do Sistema
          </p>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
            Desenvolvedores
          </h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
        </header>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="group relative bg-[#11111d] border border-white/5 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-500 hover:bg-[#16162d]"
            >
              {/* Role Badge (2ª Geração style) */}
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 border-l-2 border-purple-500 pl-3">
                {dev.role}
              </span>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Avatar area */}
                <div className="relative w-24 h-24 shrink-0">
                  <div className="absolute inset-0 bg-purple-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform opacity-20" />
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    className="relative z-10 w-full h-full object-cover rounded-xl border border-white/10 bg-[#0a0a14]"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold uppercase tracking-wide group-hover:text-purple-400 transition-colors">
                    {dev.name}
                  </h2>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                    {dev.bio}
                  </p>
                </div>
              </div>

              {/* Social / Contact Bar */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-4">
                  {dev.social.github && (
                    <a
                      href={dev.social.github}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {dev.social.linkedin && (
                    <a
                      href={dev.social.linkedin}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {/* {dev.social.twitter && (
                    <a
                      href={dev.social.twitter}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="Twitter"
                    >
                      <Twitter size={20} />
                    </a>
                  )} */}
                  {dev.social.instagram && (
                    <a
                      href={dev.social.instagram}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {dev.social.website && (
                    <a
                      href={dev.social.website}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="Website"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>

                <a
                  href={`mailto:${dev.email}`}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-all"
                >
                  <Mail size={14} />
                  Contato
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <footer className="mt-20 text-center">
          <p className="text-gray-600 text-xs uppercase tracking-[0.2em]">
            Viaje no tempo através dos pixels. © 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DevelopersPage;
