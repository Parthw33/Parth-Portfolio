import { GridBackground } from "../bg-patterns";

const Publications = () => {
  const publications = [
    {
      title: "Voice Dubber – Voice, Text, Caption Translation Solution",
      date: "15 Dec, 2024",
      publisher: "ARC publication, Dubai, UAE",
      mentor: "Dr Pramod Ganjewar",
      authors: "5",
      paperLink:
        "https://drive.google.com/file/d/1p3SMAUT8AJ-3ImvzpJVU-q1zRARaoJEG/view?usp=sharing",
      description:
        "This project introduces an AI-driven transcription system designed to revolutionize voice dubbing and caption generation across multiple languages. Leveraging state-of-the-art machine learning algorithms, it facilitates seamless voice-to-text and text-to-voice conversions with a focus on precision, adaptability, and user accessibility. By retaining emotional nuances and preserving contextual integrity in translations, the system promotes effective cross-cultural communication. Emphasizing user-centric design, scalability, and multi-platform compatibility, this solution aims to set new industry standards in audio content translation through synchronized captions and natural voice dubbing.",
      skills: [
        "Artificial Neural Networks",
        "Artificial Intelligence",
        "Machine Learning",
        "CNN",
        "Tensorflow",
        "Keras",
        "Google APIs",
        "Algorithms",
        "HMM model",
        "DeepSpeech",
        "Deep Learning",
      ],
    },
  ];

  return (
    <GridBackground spotlight={true} className="py-16">
      <div className="container mx-auto px-4 no-scrollbar relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="heading mb-4">Publications & Research</h2>
          <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="bg-card/60 backdrop-blur-sm rounded-[var(--radius)] overflow-hidden border border-border hover:border-primary transition-all duration-300"
            >
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-card-foreground">
                      {pub.title}
                    </h3>
                    <a
                      href={pub.paperLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius)] hover:bg-primary/90 transition-colors duration-200 text-sm font-medium group"
                    >
                      View Paper
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">{pub.publisher}</div>
                    <div className="flex items-center">{pub.date}</div>
                    <div className="flex items-center">
                      Authors: {pub.authors}
                    </div>
                    <div className="flex items-center">
                      Mentor: {pub.mentor}
                    </div>
                  </div>
                </div>

                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {pub.description}
                </p>

                <div>
                  <h4 className="text-lg font-semibold text-card-foreground mb-3">
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pub.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-[var(--radius)] text-sm border border-border hover:bg-secondary/70 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridBackground>
  );
};

export default Publications;
