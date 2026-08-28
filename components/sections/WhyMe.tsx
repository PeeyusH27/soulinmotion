const PRACTICES = [
  'Yoga', 'Meditation', 'NLP', 'Chakra work',
  'Energy practices', 'Vedanta', 'Human behaviour',
];

export default function WhyMe() {
  return (
    <section className="sec" id="why">
      <div className="wrap story">
        <div className="reveal">
          <span className="kicker">Why choose me</span>
          <p className="story-lede" style={{ marginTop: 18 }}>
            I don’t teach transformation from a textbook. <b>I have lived it.</b>
          </p>
        </div>

        <div className="story-cols reveal" data-delay="1">
          <p>
            I began as an architect and set designer in Mumbai, creating worlds for films, while
            living a very real, very demanding life of my own. Stress, anxiety, relationships,
            confusion and the feeling that something had to change led me deep into yoga,
            meditation, NLP, chakra work, energy practices, Vedanta and the study of human
            behaviour.
          </p>
          <p>
            Over the years, I didn’t just learn these systems. I experimented with them in my own
            life. I questioned them, experienced them, integrated them and watched how the mind,
            body, emotions and patterns shape the reality we live.
          </p>
          <p>
            Today, I bring all of that together in a way that is practical, experiential and deeply
            human.
          </p>
          <p>
            And because transformation doesn’t have to be heavy, rigid or boring, we’ll explore it
            with curiosity, creativity, depth and lots of laughter and fun.
          </p>
        </div>

        <div className="story-tags reveal" data-delay="2">
          {PRACTICES.map((tag) => (
            <span className="chip chip--sage" key={tag}>{tag}</span>
          ))}
        </div>

        <blockquote className="pull reveal">
          I won’t teach you to suppress your emotions or become someone you’re not. I’ll help you
          understand the patterns that are getting in the way of who you already have the potential
          to become.
        </blockquote>

        <p className="story-close reveal">
          I know where the mind can take you.
          <span>I also know what becomes possible when you learn to see it clearly.</span>
        </p>
      </div>
    </section>
  );
}
