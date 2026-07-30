"use client";

import { useEffect, useState } from "react";

const scenes = [
  { id: "cosmos", label: "深空", image: "/suzy-avatar.jpg" },
  { id: "sakura", label: "樱花", image: "/theme-sakura.webp" },
  { id: "snow", label: "雪日", image: "/theme-snow.webp" },
  { id: "spring", label: "和风", image: "/theme-spring.webp" },
  { id: "sky", label: "晴空", image: "/theme-sky.webp" },
  { id: "y2k", label: "Y2K", image: "/theme-y2k.webp" },
] as const;

const projects = [
  {
    no: "01",
    title: "Jetsen Production Partner",
    cn: "制作方业务门户",
    brief: "把剧本评审、制作协作、成片交付、发行与结算，编排为一条可追踪的生产链。",
    context: "外部制作团队面对的并不是一张简单的任务表，而是一套跨角色、跨阶段、跨平台的内容生产关系。",
    solution: "以剧集为业务主线，将评审、合同、资源、渠道与收益信息放进同一语境；用状态推进和角色权限降低沟通成本。",
    scope: ["产品架构", "端到端流程", "交互原型", "桌面端交付"],
    facts: [["8+", "核心业务模块"], ["2", "平台身份体系"], ["1", "统一制作链路"]],
    url: "https://saas-release-portal.suzywang168.chatgpt.site",
    tone: "olive",
  },
  {
    no: "02",
    title: "Jetsen Admin Portal",
    cn: "平台运营管理后台",
    brief: "平台方独立登录的运营中枢，让内容、制作方、财务、渠道与风控数据真正发生关系。",
    context: "平台管理员和制作方是两拨人。管理后台需要的是全局判断、例外处理和治理能力，而不是复制制作方界面。",
    solution: "围绕平台工作台、制作方治理、结算审核、内容业务、渠道管理、数据分析与 RBAC 重建信息架构。",
    scope: ["后台策略", "数据可视化", "权限设计", "操作闭环"],
    facts: [["7", "业务中心"], ["20+", "可操作数据视图"], ["100%", "关键按钮闭环"]],
    url: "https://frameflow-admin-portal.suzywang168.chatgpt.site",
    tone: "blue",
  },
  {
    no: "03",
    title: "Reelay",
    cn: "AI 影视创作工作台",
    brief: "用无限画布连接角色、场景、分镜与生成任务，让 AI 影像生产从灵感变成流程。",
    context: "AI 影视创作同时具有非线性探索与严格生产约束。传统列表无法表达素材、镜头和版本之间的关系。",
    solution: "用节点式画布承载创作思考，用结构化侧栏管理资产与参数，并保留团队协作和生成记录。",
    scope: ["创作工具", "无限画布", "AI 工作流", "桌面应用"],
    facts: [["∞", "可扩展创作画布"], ["3", "核心资产层"], ["2", "桌面系统支持"]],
    url: "https://reelay-workspace.suzywang168.chatgpt.site",
    tone: "rose",
  },
];

export default function Home() {
  const [scene, setScene] = useState<(typeof scenes)[number]["id"]>("cosmos");
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [bookingState, setBookingState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    document.documentElement.dataset.theme = scene;
  }, [scene]);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      document.documentElement.classList.add("pointer-seen");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const activeScene = scenes.find(item => item.id === scene) ?? scenes[0];
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <div className="cursor-companion" aria-hidden="true"><i /><span>✦</span></div>
      <div className="scene-particles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--particle": index } as React.CSSProperties} />)}
      </div>
      <header className="topbar">
        <button className="wordmark" onClick={() => jump("home")}><b>SUZY</b><span>LABORATORY</span></button>
        <nav>
          <button onClick={() => jump("work")}>Work</button>
          <button onClick={() => jump("profile")}>Profile</button>
          <button onClick={() => jump("method")}>Method</button>
          <button onClick={() => jump("conversation")}>Conversation</button>
        </nav>
        <button className="book-mini" onClick={() => jump("conversation")}>预约对话 ↗</button>
      </header>

      <section className="opening" id="home">
        <div className="opening-index">AQUARIUS / 2026 / SHANGHAI</div>
        <div className="opening-title">
          <p>Independent product &amp; visual laboratory</p>
          <h1>把不循常规的想象，<br /><i>编辑</i>成可抵达的世界。</h1>
        </div>
        <div className="opening-portrait">
          <div className="portrait-frame">
            <img key={activeScene.image} src={activeScene.image} alt={`Suzy · ${activeScene.label}`} />
            <span>PORTRAIT STUDY · {activeScene.label}</span>
          </div>
          <div className="scene-list">
            <small>CHOOSE A MOOD</small>
            {scenes.map((item, index) => (
              <button key={item.id} className={scene === item.id ? "active" : ""} onClick={() => setScene(item.id)}>
                <span>0{index + 1}</span>{item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="opening-note">
          <span>ABOUT THE LAB</span>
          <p>Suzy Laboratory 是一个关于动漫、影视与数字产品的个人实验室。这里关心的不只是“做出一个页面”，而是如何把复杂业务梳理成秩序，把创作者的直觉变成真实可用的工具。</p>
          <button onClick={() => jump("work")}>阅读项目档案 <b>↓</b></button>
        </div>
        <div className="vertical-note">IMAGINATION WITH DISCIPLINE</div>
      </section>

      <div className="ticker"><span>ANIME DIRECTION — PRODUCT STRATEGY — AI FILM WORKFLOW — INTERACTION DESIGN — CREATIVE TECHNOLOGY —</span></div>

      <section className="manifesto" id="profile">
        <span className="section-no">00 / STATEMENT</span>
        <blockquote>“水瓶座负责打开宇宙，<br />专业能力负责把飞船造好。”</blockquote>
        <div className="manifesto-copy">
          <p>我在内容、技术与人的交界处工作。对我来说，产品不是功能的集合，而是一种叙事：它需要明确角色、建立节奏、处理冲突，并让每个人知道下一幕将发生什么。</p>
          <p>我擅长把模糊的业务愿景拆成信息架构、交互流程与可验证原型，同时保留作品应有的情绪、个性和记忆点。</p>
        </div>
      </section>

      <section className="project-section" id="work">
        <div className="section-intro">
          <span className="section-no">01—03 / SELECTED WORK</span>
          <h2>三个作品，<br />同一条内容生产链。</h2>
          <p>从外部制作方，到平台运营，再到 AI 创作工作台。这三个产品不是孤立的界面，而是同一内容生态中的不同观察位置。</p>
        </div>

        <div className="project-list">
          {projects.map(project => (
            <article className={`project ${project.tone}`} key={project.no}>
              <div className="project-heading">
                <span>{project.no}</span>
                <div><small>{project.cn}</small><h3>{project.title}</h3></div>
                <button onClick={() => setActiveProject(project)}>CASE FILE ↗</button>
              </div>
              <p className="project-brief">{project.brief}</p>
              <div className="project-body">
                <div className="project-poster" aria-hidden="true">
                  <span>SUZY LAB / CASE {project.no}</span>
                  <b>{project.title.split(" ")[0]}</b>
                  <i>{project.cn}</i>
                </div>
                <div className="project-story">
                  <div><small>CONTEXT / 起点</small><p>{project.context}</p></div>
                  <div><small>RESPONSE / 解法</small><p>{project.solution}</p></div>
                  <ul>{project.scope.map(item => <li key={item}>{item}</li>)}</ul>
                  <div className="facts">{project.facts.map(([value, label]) => <span key={label}><b>{value}</b><small>{label}</small></span>)}</div>
                  <div className="project-actions">
                    <a href={project.url} target="_blank" rel="noreferrer">访问在线作品 ↗</a>
                    <button onClick={() => setActiveProject(project)}>查看完整档案</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="method" id="method">
        <div className="method-title"><span className="section-no">04 / WORKING METHOD</span><h2>从一张白纸，<br />到一套能工作的系统。</h2></div>
        <ol>
          <li><span>01</span><h3>Listen for the real problem</h3><p>不急着画页面。先识别角色、权力关系、业务目标和真正阻塞协作的地方。</p></li>
          <li><span>02</span><h3>Edit the complexity</h3><p>像剪辑影片一样组织复杂度：删掉噪音、建立节奏，让重点在正确的时刻出现。</p></li>
          <li><span>03</span><h3>Prototype the truth</h3><p>让原型承担验证责任。按钮、状态、数据和异常流程，都需要真实到足以做决定。</p></li>
          <li><span>04</span><h3>Ship, observe, refine</h3><p>发布不是终点。观察使用行为，再把经验带回下一轮设计与产品判断。</p></li>
        </ol>
      </section>

      <section className="conversation" id="conversation">
        <div className="conversation-copy">
          <span className="section-no">05 / FOUNDER CONVERSATION</span>
          <h2>如果你也在建造<br />一个尚未存在的世界。</h2>
          <p>欢迎预约 30 分钟 Founder 对话。可以聊动漫影视产品、AI 创作工具、复杂后台、0→1 原型，或一个还没有名字的想法。</p>
          <div className="booking-meta">
            <span><small>DURATION</small>30 minutes</span>
            <span><small>FORMAT</small>Google Meet</span>
            <span><small>LANGUAGE</small>中文 / English</span>
          </div>
          <a href="mailto:suzywang168@gmail.com?subject=Founder%20Conversation">suzywang168@gmail.com ↗</a>
        </div>
        <form className="booking-form" onSubmit={async event => {
          event.preventDefault();
          setBookingState("sending");
          const form = new FormData(event.currentTarget);
          const response = await fetch("/api/booking", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(Object.fromEntries(form)),
          }).catch(() => null);
          setBookingState(response?.ok ? "sent" : "error");
          if (response?.ok) event.currentTarget.reset();
        }}>
          <div className="form-caption"><span>REQUEST A TIME</span><b>预约 Founder 对话</b></div>
          <label><span>你的名字</span><input name="name" required placeholder="Name" /></label>
          <label><span>联系邮箱</span><input name="email" type="email" required placeholder="Email" /></label>
          <div className="form-row">
            <label><span>希望日期</span><input name="preferredDate" type="date" required /></label>
            <label><span>所在时区</span><input name="timezone" required placeholder="Asia/Shanghai" /></label>
          </div>
          <label><span>想聊什么</span><select name="topic" defaultValue="产品与原型"><option>产品与原型</option><option>AI 影视创作</option><option>合作咨询</option><option>其他想法</option></select></label>
          <label><span>补充说明</span><textarea name="notes" placeholder="用几句话介绍你正在做的事…" /></label>
          <button type="submit" disabled={bookingState === "sending"}>
            {bookingState === "sending" ? "正在提交…" : bookingState === "sent" ? "预约申请已收到 ✓" : "提交预约申请 ↗"}
          </button>
          <small>{bookingState === "sent" ? "Suzy 会通过邮件确认，并发送 Google Calendar 邀请。" : bookingState === "error" ? "提交暂时失败，请直接发送邮件。" : "提交后，预约信息会被安全保存，仅用于本次沟通。"}</small>
        </form>
      </section>

      <footer>
        <div><b>SUZY LABORATORY</b><span>动漫 · 影视 · 产品 · 想象力</span></div>
        <p>© 2026 SUZY WANG. BUILT FOR IDEAS WITH A PULSE.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button>
      </footer>

      {activeProject && (
        <div className="case-overlay" onMouseDown={() => setActiveProject(null)}>
          <aside onMouseDown={event => event.stopPropagation()}>
            <button className="case-close" onClick={() => setActiveProject(null)}>关闭 ×</button>
            <span>CASE STUDY / {activeProject.no}</span>
            <h2>{activeProject.title}</h2>
            <h3>{activeProject.cn}</h3>
            <p className="case-lead">{activeProject.brief}</p>
            <div className="case-columns"><div><small>THE SITUATION</small><p>{activeProject.context}</p></div><div><small>THE DESIGN RESPONSE</small><p>{activeProject.solution}</p></div></div>
            <div className="facts">{activeProject.facts.map(([value, label]) => <span key={label}><b>{value}</b><small>{label}</small></span>)}</div>
            <div className="case-links">
              <a href={activeProject.url} target="_blank" rel="noreferrer">进入在线作品 ↗</a>
              <a href="https://github.com/suzywang168-oss/reelay-desktop/releases/tag/desktop-latest" target="_blank" rel="noreferrer">下载 Windows / macOS 版本 ↓</a>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
