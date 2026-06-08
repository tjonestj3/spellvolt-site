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
  { icon: Swords, title: 'The Duel', body: 'Symmetric mage-vs-mage. No power creep in the ring — just aim, reads, cooldowns, mana, and terrain control.' },
  { icon: Trophy, title: 'Defeat the Tower', body: 'A roguelite climb through swarms, bosses, augments, shops, co-op revives, score, and the floor-100 architect.' },
  { icon: Gamepad2, title: 'Couch + Arcade', body: 'Local 2P, gamepad support, arcade joystick mode, rebinds, and a readable neon HUD built for fast play.' },
  { icon: Network, title: 'LAN Co-op / PvP', body: 'Host-authoritative network play keeps combat honest while spells, patches, and reactions stay synced.' },
];

const pillars = [
  ['Skillshots first', 'Every projectile is aimed. Hits are earned, dodges matter, and Dash gives mages a real outplay button.'],
  ['The floor fights back', 'Fire burns, ice steals jump, lightning punishes contact, water conducts, steam hides, wind shoves.'],
  ['Build your own spellbook', 'Five roles — poke, control, attack, defense, heavy — each with interchangeable choices and one-tap presets.'],
  ['Reactions are the meta', 'The question is not only “can I hit you?” It is “can I reshape the arena before you can punish me?”'],
];

function Nav() {
  return <nav className="nav">
    <a className="brand" href="#top" aria-label="Spellvolt home"><img src="/assets/icon.png" alt=""/><span>Spellvolt</span></a>
    <div className="navLinks">
      <a href="#systems">Systems</a><a href="#modes">Modes</a><a href="#matrix">Matrix</a><a href="#play">Play</a>
    </div>
    <a className="navCta" href="https://tjonestj.itch.io/spell-duel"><Play size={15}/> Play build</a>
  </nav>
}

function ArenaPreview() {
  return <div className="arenaCard" aria-label="Animated Spellvolt arena preview">
    <div className="stars" />
    <div className="moon" />
    <div className="hud"><span>P1 XENOS</span><span className="hp"><i/><i/><i/><i/></span><span>P2 RIVAL</span></div>
    <div className="platform platformTop" />
    <div className="platform platformMid" />
    <div className="mage mageLeft"><img src="/assets/wizard_idle.png" alt="Wizard" /></div>
    <div className="mage mageRight"><img src="/assets/wizard_idle.png" alt="Rival wizard" /></div>
    <div className="boltArc fire"><img src="/assets/fireball_128.png" alt="" /></div>
    <div className="boltArc ice"><img src="/assets/icebolt_128.png" alt="" /></div>
    <div className="patchLine firePatch"><span/><b/><em/></div>
    <div className="patchLine icePatch"><span/><b/><em/></div>
    <div className="patchLine shockPatch"><span/><b/><em/></div>
    <div className="castLabel labelOne">FIRE + OIL → INFERNO</div>
    <div className="castLabel labelTwo">SHOOT THE FLOOR</div>
    <div className="floor" />
  </div>
}

function Hero() {
  return <header id="top" className="hero section">
    <div className="heroCopy">
      <div className="eyebrow"><Sparkles size={16}/> current v1.2 build foundation</div>
      <h1>Every spell rewrites the arena.</h1>
      <p className="lede">Spellvolt is a neon 2D wizard battler where skillshots linger as living terrain — fire, ice, lightning, water, wind, oil, steam, earth — and the best players win by reading both the opponent and the floor.</p>
      <div className="heroActions">
        <a className="primaryBtn" href="https://tjonestj.itch.io/spell-duel"><Play size={18}/> Play on itch.io</a>
        <a className="secondaryBtn" href="#systems">Explore systems <ArrowRight size={18}/></a>
      </div>
      <div className="stats">
        <div><strong>5</strong><span>spell roles</span></div>
        <div><strong>100+</strong><span>tower floors</span></div>
        <div><strong>∞</strong><span>elemental plays</span></div>
      </div>
    </div>
    <ArenaPreview />
  </header>
}

function Systems() {
  return <section id="systems" className="section systems">
    <div className="sectionHeader"><span className="kicker">The core loop</span><h2>Shoot the player — or shoot the floor.</h2><p>Spellvolt’s identity is environmental persistence: every cast creates a new tactical problem that can be dodged, exploited, cleansed, or transformed.</p></div>
    <div className="pillarGrid">
      {pillars.map(([title, body], i) => <article className="pillar" key={title}><span className="num">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}
    </div>
  </section>
}

function Modes() {
  return <section id="modes" className="section modes">
    <div className="modeVisual">
      <div className="towerShaft">
        {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{'--i': i}} />)}
      </div>
      <div className="bossCard"><Mountain size={18}/><span>Floor 100</span><strong>XENOS, THE ARCHITECT</strong></div>
    </div>
    <div>
      <span className="kicker">Ways to play</span><h2>Duel clean. Climb loud.</h2>
      <div className="modeList">{modes.map(({icon: Icon, title, body}) => <article className="mode" key={title}><Icon size={22}/><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
    </div>
  </section>
}

function Matrix() {
  return <section id="matrix" className="section matrix">
    <div className="sectionHeader"><span className="kicker">Elemental matrix</span><h2>The meta is the reaction system.</h2><p>Terrain is not decoration. It is ammunition, cover, trap, counterplay, and combo starter.</p></div>
    <div className="reactionGrid">{reactions.map(r => <article className="reaction" key={`${r.a}-${r.b}`}><div className="formula"><span>{r.a}</span><Bolt size={14}/><span>{r.b}</span><ArrowRight size={14}/><strong>{r.out}</strong></div><p>{r.note}</p></article>)}</div>
  </section>
}

function Spellbook() {
  const cards = [
    ['Pyromancer', Flame, 'charge fireballs, wildfire patches, inferno finishers'],
    ['Stormcaller', Bolt, 'fast pressure, shock zones, explosive conversions'],
    ['Cryomancer', Shield, 'freeze lanes, deny jumps, melt into water setups'],
    ['Trickster', Wand2, 'wind, vortex, platforms, terrain misdirection'],
  ];
  return <section className="section spellbook"><div className="sectionHeader"><span className="kicker">Spellbooks</span><h2>Pick a style, then make it yours.</h2></div><div className="bookGrid">{cards.map(([name, Icon, copy]) => <article className="book" key={name}><Icon/><h3>{name}</h3><p>{copy}</p></article>)}</div></section>
}

function CTA() {
  return <section id="play" className="section cta"><div><span className="kicker">spellvolt.com ready</span><h2>Enter the neon arena.</h2><p>Designed as a polished public landing page for the current Spellvolt build: PvP, Tower, loadouts, elemental reactions, LAN, arcade controls, and the new living patch-art direction.</p></div><div className="ctaActions"><a className="primaryBtn" href="https://tjonestj.itch.io/spell-duel"><Play size={18}/> Play now</a><a className="secondaryBtn" href="https://github.com/tjonestj3/spell-duel">View repo</a></div></section>
}

function App() { return <><Nav/><main><Hero/><Systems/><Modes/><Matrix/><Spellbook/><CTA/></main><footer>© {new Date().getFullYear()} Spellvolt · Built from the current game systems · Mage-vs-mage neon arena combat</footer></>; }

createRoot(document.getElementById('root')).render(<App />);
