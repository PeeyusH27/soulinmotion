import Headline from '../Headline';

/**
 * Real messages, kept in their original conversation shape.
 * Phone numbers from the screenshots are deliberately left out.
 */

const OFFER = 'Hello Queens\nI am taking 1:1 healing sessions.\nIf you wish to connect, feel free to do so….';

type Msg = { text: string; time?: string; out?: boolean; from?: string; quote?: { who: string; text: string } };

const CHATS: { who: string; sub: string; note: string; msgs: Msg[] }[] = [
  {
    who: 'Rachna Gupta',
    sub: 'Group message',
    note: 'After a morning healing session',
    msgs: [
      {
        text: 'Thankyou so much to Shradha also for the 11.00 am session, it was also a wonderful session ❤️🙏\n\nI request all the queens to attend the healing sessions in tinymiracles group as they are really the miracles that are happening to us n healing our bodies so effortlessly 🙏❤️🪷',
        time: '4:16 PM',
      },
    ],
  },
  {
    who: 'Vaishali P B',
    sub: 'Group message',
    note: 'Minutes after the session ended',
    msgs: [
      {
        text: 'Thank U So Much Shraddha ❤️✨ It was truly wonderful 🌸 Your healing felt so natural, calming & heart-touching Dear 😊🙏',
        time: '11:37 AM',
      },
      { from: 'Jyot', text: 'Thank you shraddha', time: '11:37 AM' },
      { text: 'Thank you so much 🙏☺️❤️', time: '11:44 AM', out: true },
    ],
  },
  {
    who: 'Dipikka Dhonaa',
    sub: 'Direct message',
    note: 'Replying to the 1:1 invitation',
    msgs: [
      { text: OFFER, time: '2:41 PM', out: true },
      { text: 'Thank you for the session it was amazing 😊', time: '3:00 PM' },
    ],
  },
  {
    who: 'Shivani',
    sub: 'Direct message',
    note: 'Three days after learning the technique',
    msgs: [
      { text: 'This is really miracle', time: '4:55 PM' },
      { text: 'Good to hear that 😌', time: '4:56 PM', out: true },
      { text: 'From last 3 days when I start this technique from that point I feel positive', time: '4:56 PM' },
      { text: 'That is beautiful 😌 Keep up', time: '4:56 PM', out: true },
      { text: '20% health issues kam hogaye hai', time: '4:56 PM' },
      { text: 'Thanks to uhhhh', time: '4:57 PM' },
    ],
  },
  {
    who: 'Swati',
    sub: 'Direct message',
    note: 'Replying to the 1:1 invitation',
    msgs: [
      {
        quote: { who: 'You', text: OFFER },
        text: "Excellent session.. Feeling so calm n rejoiced at d same tym.. It's like as if hv got back my own powers 💪\n\nThank u soooooo much @Shradha Saha stay blessed alwz 🤗 keep shining ✨",
        time: '10:38 AM',
      },
    ],
  },
  {
    who: 'Ratna Poddar',
    sub: 'Direct message',
    note: 'Sent the evening of the session',
    msgs: [
      {
        text: 'It was a really great amazing session….I just loved it…thank u so much from the core of my heart…u r truly blessed with such a beautiful heart…keep going…God bless u in all aspects of ur life. Thank u once again.',
        time: '4:51 PM',
      },
    ],
  },
];

const initials = (name: string) => name.charAt(0);

export default function Testimonials() {
  return (
    <section
      className="sec tint"
      id="voices"
      style={{ '--tint': 'var(--solar)', '--tint-x': '50%', '--tint-y': '0%' } as React.CSSProperties}
    >
      <div className="wrap">
        <div className="sec-head sec-head--center reveal">
          <span className="kicker" style={{ color: 'var(--gold-d)' }}>In their words</span>
          <Headline text="Messages that arrived after" mark={['after']} />
          <p className="lead">Unedited, straight from the conversations.</p>
        </div>

        <div className="wall">
          {/* the longest one reads better as a quote than as a chat */}
          <figure className="say reveal" style={{ margin: 0 }}>
            <span className="qm">“</span>
            <p>
              Today’s counselling session with Shradha Saha was very meaningful and had a good
              experience. I was very comfortable in expressing my thoughts and emotions. The
              discussion helped me to get clarity about my current situation and the thoughts
              influencing my feelings. Looking forward to practice the insights suggested by
              her….truely recommend her
            </p>
            <figcaption className="say-by">
              <span className="chat-ava">B</span>
              <span>
                <b>Bindu Varma</b>
                <span>After a counselling session</span>
              </span>
            </figcaption>
          </figure>

          {CHATS.map((chat) => (
            <article className="chat reveal" key={chat.who}>
              <div className="chat-bar">
                <span className="chat-ava">{initials(chat.who)}</span>
                <span className="chat-who">
                  <b>{chat.who}</b>
                  <span>{chat.sub}</span>
                </span>
              </div>

              <div className="chat-body">
                {chat.msgs.map((m, i) => (
                  <div className={`bubble${m.out ? ' bubble--out' : ''}`} key={i}>
                    {m.from && <b className="from">{m.from}</b>}
                    {m.quote && (
                      <span className="quoted">
                        <b>{m.quote.who}</b>
                        {m.quote.text}
                      </span>
                    )}
                    {m.text}
                    {m.time && <time>{m.time}</time>}
                  </div>
                ))}
              </div>

              <p className="chat-foot">{chat.note}</p>
            </article>
          ))}
        </div>
        <p className="swipe-hint">Swipe to read more</p>
      </div>
    </section>
  );
}
