"use client";

import { useEffect, useState } from "react";

type Language = "zh" | "en" | "ja";
const translations: Record<string, [string, string]> = {
  "作品 Works": ["Works", "作品"],
  "关于 About": ["About", "紹介"],
  "联系 Contact": ["Contact", "お問い合わせ"],
  "想象力没有边界，": ["Imagination has no limits.", "想像力に境界はない。"],
  "专业让它成为现实。": ["Professional craft makes it real.", "プロの力で現実にする。"],
  "在动漫、影视与 AI 产品之间持续实验。把天马行空的世界观，转译为真实、清晰、可使用的数字产品。": ["Exploring anime, film, and AI products—turning boundless ideas into clear, usable digital experiences.", "アニメ、映像、AIプロダクトを横断し、自由な世界観を明確で使えるデジタル体験へ。"],
  "探索作品": ["Explore Works", "作品を見る"],
  "认识 Suzy": ["Meet Suzy", "Suzyについて"],
  "已发布作品": ["Published Works", "公開作品"],
  "创作方向": ["Creative Focus", "制作領域"],
  "持续实验": ["Always Experimenting", "継続的な実験"],
  "把大胆构想，做成可以体验的作品。": ["Turning bold ideas into experiences.", "大胆な構想を、体験できる作品へ。"],
  "每个作品都是一次关于内容、技术与人的实验。点击卡片可查看项目定位，并进入实际产品体验。": ["Each work is an experiment in content, technology, and people. Open a project to explore the live product.", "すべての作品は、コンテンツ・技術・人をめぐる実験です。カードから実際のプロダクトを体験できます。"],
  "内容生产与发行": ["Content Production & Distribution", "コンテンツ制作・配信"],
  "平台运营管理": ["Platform Operations", "プラットフォーム運営"],
  "AI 影视创作": ["AI Film Creation", "AI映像制作"],
  "面向外部制作团队的一站式工作门户，串联剧本评审、制作协作、成片验收、发行提报与收益结算。": ["A unified portal for production partners, connecting script review, collaboration, delivery, distribution, and settlement.", "外部制作チーム向けの統合ポータル。脚本審査、制作協業、納品、配信、精算を連携します。"],
  "为平台管理员设计的业务中枢，覆盖制作方治理、财务结算、内容规则、渠道监控、数据分析与权限体系。": ["An operations hub for platform administrators covering partner governance, finance, content rules, channel monitoring, analytics, and permissions.", "制作会社管理、財務、コンテンツ規則、チャネル監視、分析、権限を統合した管理者向けハブです。"],
  "以无限画布组织角色、场景、镜头、音视频节点与团队协作，让复杂的 AI 动画生产过程清晰可控。": ["An infinite canvas for characters, scenes, shots, media nodes, and collaboration—making complex AI animation production clear and controllable.", "キャラクター、シーン、ショット、メディアノード、共同制作を無限キャンバスで整理し、AIアニメ制作を明確に管理します。"],
  "进入作品体验": ["Open Live Project", "作品を体験"],
  "下载桌面版": ["Download Desktop App", "デスクトップ版"],
  "水瓶座负责打开宇宙，专业能力负责搭好飞船。": ["Aquarius opens the universe. Professional craft builds the spacecraft.", "水瓶座が宇宙を開き、プロの力が宇宙船をつくる。"],
  "保持好奇，继续创造。": ["Stay curious. Keep creating.", "好奇心を持ち、創り続ける。"],
  "你的名字 / Name": ["Your name", "お名前"],
  "邮箱 / Email": ["Email", "メール"],
  "聊聊你的想法 / Tell me about your idea": ["Tell me about your idea", "アイデアを聞かせてください"],
  "发送消息 →": ["Send Message →", "送信 →"],
  "发送中…": ["Sending…", "送信中…"],
  "已发送 ✓": ["Sent ✓", "送信済み ✓"],
  "暂时无法提交，请直接发送邮件。": ["Unable to submit. Please email me directly.", "送信できません。メールでご連絡ください。"],
};

const original = new WeakMap<Text, string>();

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("zh");
  useEffect(() => {
    const apply = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach(node => {
        if (node.parentElement?.closest("[data-language-control]")) return;
        const source = original.get(node) ?? node.data;
        if (!original.has(node)) original.set(node, source);
        const key = source.trim();
        const translated = translations[key];
        if (!translated || language === "zh") node.data = source;
        else node.data = source.replace(key, translated[language === "en" ? 0 : 1]);
      });
      document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);
  return <div className="language-control" data-language-control>
    {(["zh", "en", "ja"] as Language[]).map(item => <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)}>{item === "zh" ? "中文" : item === "en" ? "EN" : "日本語"}</button>)}
  </div>;
}
