"use client";

import { useEffect, useState } from "react";

const works = [
  {
    number: "01",
    title: "Jetsen 制作方 Portal",
    category: "内容生产与发行",
    description: "面向外部制作团队的一站式工作门户，串联剧本评审、制作协作、成片验收、发行提报与收益结算。",
    tags: ["Product Design", "SaaS", "Content"],
    color: "violet",
    url: "https://saas-release-portal.suzywang168.chatgpt.site",
    mark: "JP",
    download: "https://github.com/suzywang168-oss/reelay-desktop/releases/tag/desktop-latest",
  },
  {
    number: "02",
    title: "Jetsen Admin Portal",
    category: "平台运营管理",
    description: "为平台管理员设计的业务中枢，覆盖制作方治理、财务结算、内容规则、渠道监控、数据分析与权限体系。",
    tags: ["Admin System", "Data", "Operations"],
    color: "cyan",
    url: "https://frameflow-admin-portal.suzywang168.chatgpt.site",
    mark: "JA",
    download: "https://github.com/suzywang168-oss/reelay-desktop/releases/tag/desktop-latest",
  },
  {
    number: "03",
    title: "Reelay 工作台",
    category: "AI 影视创作",
    description: "以无限画布组织角色、场景、镜头、音视频节点与团队协作，让复杂的 AI 动画生产过程清晰可控。",
    tags: ["AI Creation", "Node Canvas", "Collaboration"],
    color: "coral",
    url: "https://reelay-workspace.suzywang168.chatgpt.site",
    mark: "R",
    download: "https://github.com/suzywang168-oss/reelay-desktop/releases/tag/desktop-latest",
  },
];

const themes = [
  { id: "cosmos", label: "星空", icon: "✦", image: "/suzy-avatar.jpg" },
  { id: "sakura", label: "樱花", icon: "❀", image: "/theme-sakura.webp" },
  { id: "snow", label: "雪天", icon: "❄", image: "/theme-snow.webp" },
  { id: "spring", label: "和风", icon: "花", image: "/theme-spring.webp" },
  { id: "sky", label: "晴空", icon: "☼", image: "/theme-sky.webp" },
  { id: "y2k", label: "Y2K", icon: "⌁", image: "/theme-y2k.webp" },
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<(typeof works)[number] | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<(typeof themes)[number]["id"]>("cosmos");
  const [contactState, setContactState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const activeTheme = themes.find(item => item.id === theme) ?? themes[0];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="cosmos" aria-hidden="true">
        <i className="planet planet-a" />
        <i className="planet planet-b" />
        <i className="orbit orbit-a" />
        <i className="orbit orbit-b" />
        <i className="stars stars-a" />
        <i className="stars stars-b" />
      </div>

      <header className={scrolled ? "scrolled" : ""}>
        <button className="brand" onClick={() => scrollTo("home")} aria-label="回到首页">
          <span>SL</span>
          <b>Suzy laboratory</b>
        </button>
        <nav className={menuOpen ? "open" : ""}>
          <button onClick={() => scrollTo("works")}>作品 Works</button>
          <button onClick={() => scrollTo("about")}>关于 About</button>
          <button onClick={() => scrollTo("contact")}>联系 Contact</button>
        </nav>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">
          <i /><i />
        </button>
      </header>

      <div className="theme-switcher" aria-label="切换网站风格">
        <span>SCENE</span>
        {themes.map(item => (
          <button key={item.id} className={theme === item.id ? "active" : ""} onClick={() => setTheme(item.id)} title={`${item.label}风格`}>
            <i>{item.icon}</i><small>{item.label}</small>
          </button>
        ))}
      </div>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><i>♒</i> AQUARIUS CREATIVE LAB · EST. 2026</div>
          <h1>
            <span>想象力没有边界，</span>
            <em>专业让它成为现实。</em>
          </h1>
          <p>在动漫、影视与 AI 产品之间持续实验。把天马行空的世界观，转译为真实、清晰、可使用的数字产品。</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => scrollTo("works")}>探索作品 <span>↘</span></button>
            <button className="text-action" onClick={() => scrollTo("about")}>认识 Suzy <span>→</span></button>
          </div>
          <div className="hero-meta">
            <span><b>03</b><small>已发布作品</small></span>
            <span><b>AI × Film</b><small>创作方向</small></span>
            <span><b>∞</b><small>持续实验</small></span>
          </div>
        </div>

        <div className="portrait-stage">
          <div className="portrait-halo" />
          <div className="portrait-card">
            <img key={activeTheme.image} src={activeTheme.image} alt={`Suzy 的${activeTheme.label}动漫形象`} />
            <div className="portrait-caption">
              <span><i /> CREATOR PROFILE</span>
              <b>SUZY</b>
              <small>Product · Anime · AI</small>
            </div>
          </div>
          <span className="float-tag tag-a">IDEA / 021</span>
          <span className="float-tag tag-b">♒ FREE MIND</span>
          <span className="float-tag tag-c">BUILD / SHIP</span>
        </div>
      </section>

      <section className="marquee" aria-label="创作关键词">
        <div>ANIME · FILM · AI PRODUCT · STORYTELLING · AQUARIUS MIND · PROFESSIONAL CRAFT · ANIME · FILM · AI PRODUCT · STORYTELLING · AQUARIUS MIND · PROFESSIONAL CRAFT ·</div>
      </section>

      <section className="works" id="works">
        <div className="section-heading">
          <div>
            <span>SELECTED WORKS / 作品档案</span>
            <h2>把大胆构想，做成<br />可以体验的作品。</h2>
          </div>
          <p>每个作品都是一次关于内容、技术与人的实验。点击卡片可查看项目定位，并进入实际产品体验。</p>
        </div>

        <div className="work-list">
          {works.map((work) => (
            <article className={`work-card ${work.color}`} key={work.number}>
              <button className="work-main" onClick={() => setActiveWork(work)}>
                <span className="work-number">PROJECT / {work.number}</span>
                <div className="work-visual">
                  <i className="visual-grid" />
                  <strong>{work.mark}</strong>
                  <span>{work.category}</span>
                </div>
                <div className="work-copy">
                  <small>{work.category}</small>
                  <h3>{work.title}</h3>
                  <p>{work.description}</p>
                  <div>{work.tags.map(tag => <i key={tag}>{tag}</i>)}</div>
                </div>
                <span className="open-mark">↗</span>
              </button>
            </article>
          ))}
          <article className="work-card future">
            <div className="future-inner">
              <span>04 — ∞</span>
              <i>＋</i>
              <h3>Next experiment<br />is loading...</h3>
              <p>这里将持续收录新的产品、影像与 AI 创作实验。</p>
            </div>
          </article>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-mark">♒</div>
        <div className="about-copy">
          <span>ABOUT THE LAB / 关于实验室</span>
          <h2>水瓶座负责打开宇宙，<br />专业能力负责搭好飞船。</h2>
          <div className="about-grid">
            <p>Suzy laboratory 是一个持续生长的个人作品实验室，关注动漫影视、AI 内容创作与复杂数字产品。我喜欢从一个不按常理出现的想法出发，再用产品策略、交互设计和执行力把它变成可验证的体验。</p>
            <p>这里不只陈列最终结果，也保留每一次探索的方向：内容生产如何更自由、创作协作如何更顺畅、技术如何真正服务创作者。</p>
          </div>
          <div className="principles">
            <span><b>01</b><i>Imagination</i><small>保持不受限制的想象力</small></span>
            <span><b>02</b><i>Structure</i><small>用清晰结构承载复杂系统</small></span>
            <span><b>03</b><i>Delivery</i><small>让每个构想真正落地</small></span>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div>
          <span>LET&apos;S CREATE SOMETHING UNEXPECTED.</span>
          <h2>保持好奇，<br />继续创造。</h2>
        </div>
        <form className="contact-form" onSubmit={async event => {
          event.preventDefault();
          setContactState("sending");
          const form = new FormData(event.currentTarget);
          const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) }).catch(() => null);
          setContactState(response?.ok ? "sent" : "error");
          if (response?.ok) event.currentTarget.reset();
        }}>
          <div><input name="name" placeholder="你的名字 / Name" required /><input name="email" type="email" placeholder="邮箱 / Email" required /></div>
          <textarea name="message" placeholder="聊聊你的想法 / Tell me about your idea" required />
          <button type="submit" disabled={contactState === "sending"}>{contactState === "sending" ? "发送中…" : contactState === "sent" ? "已发送 ✓" : "发送消息 →"}</button>
          {contactState === "error" && <small>暂时无法提交，请直接发送邮件。</small>}
          <a href="mailto:suzywang168@gmail.com">suzywang168@gmail.com</a>
        </form>
        <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP <span>↑</span></button>
        <small>© 2026 SUZY LABORATORY · MADE FOR THE NEXT IDEA</small>
      </footer>

      {activeWork && (
        <div className="modal-backdrop" onMouseDown={() => setActiveWork(null)}>
          <aside className={`work-modal ${activeWork.color}`} onMouseDown={event => event.stopPropagation()}>
            <button className="close" onClick={() => setActiveWork(null)}>×</button>
            <span>PROJECT / {activeWork.number}</span>
            <div className="modal-mark">{activeWork.mark}</div>
            <small>{activeWork.category}</small>
            <h2>{activeWork.title}</h2>
            <p>{activeWork.description}</p>
            <div className="modal-tags">{activeWork.tags.map(tag => <i key={tag}>{tag}</i>)}</div>
            <div className="modal-actions">
              <a href={activeWork.url} target="_blank" rel="noreferrer">进入作品体验 <span>↗</span></a>
              <a className="download" href={activeWork.download} target="_blank" rel="noreferrer">下载桌面版 <span>↓</span></a>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
