import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Bolt, Flame, Gamepad2, Mountain, Network, Play, Shield, Sparkles, Swords, Trophy, Wand2 } from 'lucide-react';
import './styles.css';

const reactions = [
  { a: '🔥 Fire', b: '🧊 Ice', out: '💧 Water', note: 'melt the floor, change the chase lane' },
  { a: '⚡ Lightning', b: '💧 Water', out: '⚡ Shock zone', note: 'turn a puddle into punishment' },
  { a: '🔥 Fire', b: '🛢️ Oil', out: '🌋 Inferno', note: 'a quiet slick becomes a wildfire' },
  { a: '💨 Wind', b: '💨 Steam', out: 'clear sightline', note: 'counterplay through the cloud' },
  { a: '⚡ Lightning', b: '🪨 Earth', out: 'Shatter', note: 'break cover with a read' },
  { a: '🧊 Ice', b: '🔥 Fire', out: 'Snuffed', note: 'defense can be elemental too' },
];

const modes = [
  { icon: Swords, title: 'PvP', body: 'Symmetric mage-vs-mage duels where the only edge is execution, reads, cooldowns, mana, and terrain control.' },
  { icon: Trophy, title: 'Defeat the Tower', body: 'A roguelite climb through swarms, bosses, augments, shops, co-op revives, score, and the floor-100 architect.' },
  { icon: Wand2, title: 'Practice + Tutorial', body: 'A training room and solo lab to learn dash timing, charged casts, terrain patches, and combo reactions.' },
  { icon: Network, title: 'Local + LAN', body: 'Couch 2P, gamepad support, arcade joystick mode, LAN host/join, and co-op tower runs.' },
];

const pillars = [
  ['Every projectile is a skillshot', 'Hits are earned. Dodges matter. Dash gives mages a real outplay button.'],
  ['Every spell leaves a footprint', 'Fire burns, ice steals jump, lightning punishes contact, water conducts, steam hides, wind shoves.'],
  ['Build your own kit', 'Five roles — poke, control, attack, defense, heavy — each with interchangeable choices and one-tap spellbooks.'],
  ['The floor is the meta', 'The best cast might not hit the player. It might transform the terrain before they can punish you.'],
];

function Logo() {
  return <div className="spellLogo" aria-label="Spellvolt"><span>Spell</span><span>volt</span></div>;
}

function Nav() {
  return <nav className="nav">
    <a className="brand" href="#top" aria-label="Spellvolt home"><img src="/assets/icon.png" alt=""/><span>Spellvolt</span></a>
    <div className="navLinks">
      <a href="#play">Play</a><a href="#modes">Loadout</a><a href="#matrix">Interactions</a><a href="#screens">Screens</a>
    </div>
    <a className="navCta" href="https://tjonestj.itch.io/spell-duel"><Play size={15}/> Play on itch</a>
  </nav>
}

function Hero() {
  return <header id="top" className="hero section">
    <div className="heroCopy">
      <Logo />
      <div className="eyebrow"><Sparkles size={16}/> 1v1 · arcade · combat</div>
      <h1>Shoot the player — or shoot the floor.</h1>
      <p className="lede">A neon side-view wizard battler where skillshots leave living terrain behind. Build a five-spell kit, reshape the arena, and turn elemental reactions into outplays.</p>
      <div className="heroActions">
        <a className="primaryBtn" href="https://tjonestj.itch.io/spell-duel"><Play size={18}/> Play on itch.io</a>
        <a className="secondaryBtn" href="#screens">See real screenshots <ArrowRight size={18}/></a>
      </div>
      <div className="stats">
        <div><strong>PvP</strong><span>duels</span></div>
        <div><strong>100</strong><span>tower floors</span></div>
        <div><strong>LAN</strong><span>co-op + versus</span></div>
      </div>
    </div>
    <figure className="heroScreenshot">
      <img src="/assets/screenshots/itch-shot.png" alt="Spellvolt main menu showing PvP, Defeat the Tower, Practice, Level Editor, Replay Tutorial, and Quit Game" />
      <figcaption><span>Current build v1.2.0</span><b>Real in-game menu capture</b></figcaption>
    </figure>
  </header>
}

function Systems() {
  return <section id="systems" className="section systems">
    <div className="sectionHeader"><span className="kicker">The shared core</span><h2>Prediction, positioning, terrain shaping.</h2><p>Spellvolt’s identity is environmental persistence: every cast creates a new tactical problem that can be dodged, exploited, cleansed, or transformed.</p></div>
    <div className="pillarGrid">
      {pillars.map(([title, body], i) => <article className="pillar" key={title}><span className="num">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}
    </div>
  </section>
}

function Modes() {
  return <section id="modes" className="section modes">
    <div className="modeVisual">
      <Logo />
      <div className="menuStack">
        <span className="menuButton active">PVP</span>
        <span className="menuButton tower">DEFEAT THE TOWER</span>
        <span className="menuButton">PRACTICE</span>
        <span className="menuButton editor">LEVEL EDITOR</span>
      </div>
    </div>
    <div>
      <span className="kicker">Ways to play</span><h2>Itch menu energy, now on spellvolt.com.</h2>
      <div className="modeList">{modes.map(({icon: Icon, title, body}) => <article className="mode" key={title}><Icon size={22}/><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
    </div>
  </section>
}

function Matrix() {
  return <section id="matrix" className="section matrix">
    <div className="sectionHeader"><span className="kicker">Interactions</span><h2>The reaction system is the meta.</h2><p>Terrain is not decoration. It is ammunition, cover, trap, counterplay, and combo starter.</p></div>
    <div className="reactionGrid">{reactions.map(r => <article className="reaction" key={`${r.a}-${r.b}`}><div className="formula"><span>{r.a}</span><Bolt size={14}/><span>{r.b}</span><ArrowRight size={14}/><strong>{r.out}</strong></div><p>{r.note}</p></article>)}</div>
  </section>
}

function Screens() {
  return <section id="screens" className="section screens">
    <div className="sectionHeader"><span className="kicker">Real game captures</span><h2>Neon UI, arcade floor, spell-mode clarity.</h2><p>The site now uses screenshots pulled from the actual current Itch presentation instead of placeholder mockups.</p></div>
    <div className="screenGrid">
      <figure><img src="/assets/screenshots/itch-shot.png" alt="Spellvolt v1.2.0 main menu with PvP selected"/><figcaption>v1.2.0 main menu — PvP / Tower / Practice / Level Editor</figcaption></figure>
      <figure><img src="/assets/screenshots/itch-cover.png" alt="Spell Duel menu showing VS Bot, VS Player, and VS LAN"/><figcaption>Classic duel menu — VS Bot, local 2P, and LAN</figcaption></figure>
    </div>
  </section>
}

function Spellbook() {
  const cards = [
    ['Pyromancer', Flame, 'charge fireballs, wildfire patches, inferno finishers'],
    ['Stormcaller', Bolt, 'fast pressure, shock zones, explosive conversions'],
    ['Cryomancer', Shield, 'freeze lanes, deny jumps, melt into water setups'],
    ['Trickster', Gamepad2, 'wind, vortex, platforms, terrain misdirection'],
  ];
  return <section className="section spellbook"><div className="sectionHeader"><span className="kicker">Loadout</span><h2>Pick a spellbook, then make it yours.</h2></div><div className="bookGrid">{cards.map(([name, Icon, copy]) => <article className="book" key={name}><Icon/><h3>{name}</h3><p>{copy}</p></article>)}</div></section>
}

function CTA() {
  return <section id="play" className="section cta"><div><span className="kicker">spellvolt.com</span><h2>Enter the neon arena.</h2><p>Play the current build, test PvP and Tower, then come back with a better read on which surfaces, reactions, and spellbooks define your style.</p></div><div className="ctaActions"><a className="primaryBtn" href="https://tjonestj.itch.io/spell-duel"><Play size={18}/> Play on itch.io</a><a className="secondaryBtn" href="#matrix">Study interactions</a></div></section>
}

function App() { return <><Nav/><main><Hero/><Systems/><Modes/><Matrix/><Screens/><Spellbook/><CTA/></main><footer>© {new Date().getFullYear()} Spellvolt · 1v1 · arcade · combat · spellvolt.com</footer></>; }

createRoot(document.getElementById('root')).render(<App />);
