"use client";

import { useEffect, useState } from "react";

type Language = "en" | "zh" | "ja" | "de";
type Translation = [string, string, string];

const translations: Record<string, Translation> = {
  "Work": ["Work", "作品", "Projekte"], "Profile": ["Profile", "プロフィール", "Profil"],
  "Method": ["Method", "制作方法", "Methode"], "Conversation": ["Conversation", "対話", "Gespräch"],
  "预约对话 ↗": ["Book a conversation ↗", "対話を予約 ↗", "Gespräch buchen ↗"],
  "Independent product & visual laboratory": ["Independent product & visual laboratory", "独立プロダクト＆ビジュアル・ラボ", "Unabhängiges Produkt- und Visuallabor"],
  "把不循常规的想象，": ["Editing unconventional imagination", "既成概念にとらわれない想像を、", "Unkonventionelle Fantasie wird"],
  "编辑": ["into worlds", "世界へ編集し", "zu Welten editiert,"],
  "成可抵达的世界。": ["people can enter.", "人が足を踏み入れられる形にする。", "die Menschen betreten können."],
  "CHOOSE A MOOD": ["CHOOSE A MOOD", "ムードを選ぶ", "STIMMUNG WÄHLEN"],
  "深空": ["Cosmos", "宇宙", "Kosmos"], "樱花": ["Sakura", "桜", "Kirschblüte"],
  "雪日": ["Snow", "雪", "Schnee"], "和风": ["Wafū", "和風", "Wafū"], "晴空": ["Blue Sky", "青空", "Blauer Himmel"],
  "ABOUT THE LAB": ["ABOUT THE LAB", "ラボについて", "ÜBER DAS LABOR"],
  "Suzy Laboratory 是一个关于动漫、影视与数字产品的个人实验室。这里关心的不只是“做出一个页面”，而是如何把复杂业务梳理成秩序，把创作者的直觉变成真实可用的工具。": [
    "Suzy Laboratory is an independent practice spanning anime, film and digital products. The work goes beyond making interfaces: it brings order to complex systems and turns creative intuition into tools people can genuinely use.",
    "Suzy Laboratory は、アニメ、映像、デジタルプロダクトを横断する個人ラボです。画面を作るだけでなく、複雑な業務に秩序を与え、クリエイターの直感を実際に使える道具へ変えます。",
    "Suzy Laboratory ist eine unabhängige Praxis an der Schnittstelle von Anime, Film und digitalen Produkten. Es geht nicht nur um Oberflächen: Komplexe Systeme werden geordnet und kreative Intuition wird in wirklich nutzbare Werkzeuge übersetzt."
  ],
  "阅读项目档案": ["Read the case files", "プロジェクトを見る", "Projektakten lesen"],
  "“水瓶座负责打开宇宙，": ["“Aquarius opens the universe.", "「水瓶座が宇宙を開き、", "„Der Wassermann öffnet das Universum."],
  "专业能力负责把飞船造好。”": ["Professional craft builds the spacecraft.”", "プロの技術が宇宙船を造る。」", "Professionelles Handwerk baut das Raumschiff.“"],
  "我在内容、技术与人的交界处工作。对我来说，产品不是功能的集合，而是一种叙事：它需要明确角色、建立节奏、处理冲突，并让每个人知道下一幕将发生什么。": [
    "I work where content, technology and people meet. A product is not a collection of features—it is a narrative with roles, rhythm, tension and a clear next scene.",
    "コンテンツ、テクノロジー、人が交わる場所で仕事をしています。プロダクトは機能の集合ではなく、役割、リズム、葛藤、そして次の場面を持つ物語です。",
    "Ich arbeite dort, wo Inhalte, Technologie und Menschen zusammentreffen. Ein Produkt ist keine Sammlung von Funktionen, sondern eine Erzählung mit Rollen, Rhythmus, Spannung und einer klaren nächsten Szene."
  ],
  "我擅长把模糊的业务愿景拆成信息架构、交互流程与可验证原型，同时保留作品应有的情绪、个性和记忆点。": [
    "I translate ambiguous business visions into information architecture, interaction flows and testable prototypes, without losing the emotion and personality that make a product memorable.",
    "曖昧な事業構想を情報設計、インタラクション、検証可能なプロトタイプへ変換しながら、作品の感情と個性を守ります。",
    "Ich übersetze vage Geschäftsvisionen in Informationsarchitektur, Interaktionsabläufe und überprüfbare Prototypen, ohne Emotion und Wiedererkennungswert zu verlieren."
  ],
  "三个作品，": ["Three products.", "三つの作品。", "Drei Produkte."],
  "同一条内容生产链。": ["One connected content-production system.", "一つにつながるコンテンツ制作システム。", "Ein zusammenhängendes System für Content-Produktion."],
  "从外部制作方，到平台运营，再到 AI 创作工作台。这三个产品不是孤立的界面，而是同一内容生态中的不同观察位置。": [
    "From external production partners to platform operations and an AI creation workspace, these products represent three viewpoints within the same content ecosystem.",
    "外部制作会社、プラットフォーム運営、AI 制作ワークスペース。三つのプロダクトは同じ生態系を異なる位置から捉えています。",
    "Von externen Produktionspartnern über den Plattformbetrieb bis zum KI-Kreativarbeitsplatz: drei Perspektiven innerhalb desselben Content-Ökosystems."
  ],
  "制作方业务门户": ["Production partner portal", "制作パートナー・ポータル", "Portal für Produktionspartner"],
  "平台运营管理后台": ["Platform operations console", "プラットフォーム運営管理", "Plattform-Administration"],
  "AI 影视创作工作台": ["AI filmmaking workspace", "AI 映像制作ワークスペース", "KI-Filmproduktionsbereich"],
  "把剧本评审、制作协作、成片交付、发行与结算，编排为一条可追踪的生产链。": ["A traceable production chain for script review, collaboration, final delivery, distribution and settlement.", "脚本審査、制作協業、納品、配信、精算を追跡可能な制作チェーンに統合します。", "Ein nachvollziehbarer Produktionsprozess für Drehbuchprüfung, Zusammenarbeit, Abgabe, Distribution und Abrechnung."],
  "平台方独立登录的运营中枢，让内容、制作方、财务、渠道与风控数据真正发生关系。": ["An independent control centre connecting content, partners, finance, channels and risk data.", "コンテンツ、制作会社、財務、チャネル、リスクを結ぶ独立した運営中枢です。", "Eine unabhängige Schaltzentrale, die Inhalte, Partner, Finanzen, Kanäle und Risikodaten verbindet."],
  "用无限画布连接角色、场景、分镜与生成任务，让 AI 影像生产从灵感变成流程。": ["An infinite canvas connects characters, scenes, shots and generation tasks—turning AI filmmaking from inspiration into a process.", "キャラクター、シーン、ショット、生成タスクを無限キャンバスでつなぎ、着想を制作工程へ変えます。", "Eine unendliche Arbeitsfläche verbindet Figuren, Szenen, Einstellungen und Generierungsaufgaben—von der Inspiration zum Prozess."],
  "外部制作团队面对的并不是一张简单的任务表，而是一套跨角色、跨阶段、跨平台的内容生产关系。": ["External production teams work inside a relationship spanning roles, stages and platforms—not a simple task list.", "外部制作チームが扱うのは単純なタスクリストではなく、役割、工程、プラットフォームをまたぐ制作関係です。", "Externe Produktionsteams arbeiten in einem Beziehungsgeflecht über Rollen, Phasen und Plattformen hinweg."],
  "以剧集为业务主线，将评审、合同、资源、渠道与收益信息放进同一语境；用状态推进和角色权限降低沟通成本。": ["The series becomes the central business object. Reviews, contracts, assets, channels and revenue share one context, while status progression and permissions reduce coordination costs.", "作品シリーズを中心に審査、契約、素材、チャネル、収益を統合し、ステータスと権限で連携コストを下げます。", "Die Serie wird zum zentralen Geschäftsobjekt. Prüfungen, Verträge, Assets, Kanäle und Erlöse teilen einen Kontext; Status und Rechte senken den Abstimmungsaufwand."],
  "平台管理员和制作方是两拨人。管理后台需要的是全局判断、例外处理和治理能力，而不是复制制作方界面。": ["Platform administrators and production partners are separate audiences. Administrators need governance, exception handling and global judgement—not a duplicate partner interface.", "管理者と制作会社は別の利用者です。管理側には複製画面ではなく、全体判断、例外処理、ガバナンスが必要です。", "Plattformadministratoren und Produktionspartner sind getrennte Zielgruppen. Administratoren brauchen Governance, Ausnahmebehandlung und Gesamtüberblick—keine Kopie des Partnerportals."],
  "围绕平台工作台、制作方治理、结算审核、内容业务、渠道管理、数据分析与 RBAC 重建信息架构。": ["The architecture is organised around the platform desk, partner governance, settlement review, content operations, channel management, analytics and RBAC.", "運営デスク、制作会社管理、精算審査、コンテンツ運営、チャネル管理、分析、RBAC を軸に再設計しました。", "Die Architektur folgt Plattform-Desk, Partnersteuerung, Abrechnungsprüfung, Content-Betrieb, Kanalmanagement, Analytik und RBAC."],
  "AI 影视创作同时具有非线性探索与严格生产约束。传统列表无法表达素材、镜头和版本之间的关系。": ["AI filmmaking combines nonlinear exploration with strict production constraints. Conventional lists cannot express the relationships between assets, shots and versions.", "AI 映像制作には非線形な探索と厳密な制約が共存します。通常のリストでは素材、ショット、版の関係を表現できません。", "KI-Filmproduktion verbindet nichtlineare Erkundung mit strengen Produktionsbedingungen. Klassische Listen zeigen Beziehungen zwischen Assets, Einstellungen und Versionen nicht."],
  "用节点式画布承载创作思考，用结构化侧栏管理资产与参数，并保留团队协作和生成记录。": ["A node-based canvas supports creative thinking, structured panels manage assets and parameters, and collaboration plus generation history preserve continuity.", "ノード型キャンバスが思考を支え、構造化パネルが素材と設定を管理し、共同作業と生成履歴が連続性を保ちます。", "Eine knotenbasierte Arbeitsfläche trägt das kreative Denken; strukturierte Seitenleisten verwalten Assets und Parameter, Zusammenarbeit und Historie sichern Kontinuität."],
  "CONTEXT / 起点": ["CONTEXT", "背景", "KONTEXT"], "RESPONSE / 解法": ["DESIGN RESPONSE", "デザインの回答", "DESIGNANTWORT"],
  "产品架构": ["Product architecture", "プロダクト設計", "Produktarchitektur"], "端到端流程": ["End-to-end flow", "一貫したフロー", "End-to-End-Prozess"],
  "交互原型": ["Interactive prototype", "インタラクティブ原型", "Interaktiver Prototyp"], "桌面端交付": ["Desktop delivery", "デスクトップ提供", "Desktop-Auslieferung"],
  "后台策略": ["Admin strategy", "管理戦略", "Admin-Strategie"], "数据可视化": ["Data visualisation", "データ可視化", "Datenvisualisierung"],
  "权限设计": ["Permission design", "権限設計", "Rechtemodell"], "操作闭环": ["Operational closure", "操作の完結", "Geschlossene Abläufe"],
  "创作工具": ["Creative tooling", "制作ツール", "Kreativwerkzeug"], "无限画布": ["Infinite canvas", "無限キャンバス", "Unendliche Fläche"],
  "AI 工作流": ["AI workflow", "AIワークフロー", "KI-Workflow"], "桌面应用": ["Desktop app", "デスクトップアプリ", "Desktop-App"],
  "核心业务模块": ["Core modules", "主要モジュール", "Kernmodule"], "平台身份体系": ["Identity systems", "ID体系", "Identitätssysteme"], "统一制作链路": ["Unified workflow", "統合ワークフロー", "Einheitlicher Ablauf"],
  "业务中心": ["Business centres", "業務センター", "Geschäftsbereiche"], "可操作数据视图": ["Actionable views", "操作可能ビュー", "Interaktive Ansichten"], "关键按钮闭环": ["Critical actions covered", "主要操作を網羅", "Kritische Aktionen"],
  "可扩展创作画布": ["Expandable canvas", "拡張可能キャンバス", "Erweiterbare Fläche"], "核心资产层": ["Core asset layers", "主要素材レイヤー", "Asset-Ebenen"], "桌面系统支持": ["Desktop platforms", "対応OS", "Desktop-Systeme"],
  "访问在线作品 ↗": ["Visit live product ↗", "作品を開く ↗", "Live-Produkt öffnen ↗"], "查看完整档案": ["Read full case", "詳細を見る", "Vollständige Akte"],
  "CASE FILE ↗": ["CASE FILE ↗", "ケースファイル ↗", "PROJEKTAKTE ↗"],
  "从一张白纸，": ["From a blank page", "白紙から、", "Vom leeren Blatt"],
  "到一套能工作的系统。": ["to a system that works.", "機能するシステムへ。", "zu einem System, das funktioniert."],
  "Listen for the real problem": ["Listen for the real problem", "本当の課題を聴く", "Das eigentliche Problem hören"],
  "不急着画页面。先识别角色、权力关系、业务目标和真正阻塞协作的地方。": ["Before drawing screens, identify the roles, power relationships, business goals and true blockers.", "画面を描く前に、役割、権力関係、事業目標、連携を妨げる要因を見極めます。", "Vor dem Zeichnen werden Rollen, Machtverhältnisse, Geschäftsziele und echte Blockaden verstanden."],
  "Edit the complexity": ["Edit the complexity", "複雑さを編集する", "Komplexität editieren"],
  "像剪辑影片一样组织复杂度：删掉噪音、建立节奏，让重点在正确的时刻出现。": ["Organise complexity like a film edit: remove noise, establish rhythm and reveal what matters at the right moment.", "映像編集のようにノイズを削り、リズムを作り、必要な瞬間に要点を見せます。", "Komplexität wie einen Film schneiden: Rauschen entfernen, Rhythmus schaffen und Wichtiges im richtigen Moment zeigen."],
  "Prototype the truth": ["Prototype the truth", "原型で事実を検証する", "Wahrheit prototypisieren"],
  "让原型承担验证责任。按钮、状态、数据和异常流程，都需要真实到足以做决定。": ["A prototype must carry the burden of proof. Buttons, states, data and edge cases should be real enough to support decisions.", "ボタン、状態、データ、例外まで、意思決定に十分なリアリティを持たせます。", "Buttons, Zustände, Daten und Sonderfälle müssen real genug sein, um Entscheidungen zu tragen."],
  "Ship, observe, refine": ["Ship, observe, refine", "公開し、観察し、磨く", "Veröffentlichen, beobachten, verfeinern"],
  "发布不是终点。观察使用行为，再把经验带回下一轮设计与产品判断。": ["Release is not the end. Observe real behaviour and carry the learning into the next product decision.", "公開は終点ではありません。利用を観察し、学びを次の判断へ戻します。", "Der Launch ist nicht das Ende. Verhalten beobachten und Erkenntnisse in die nächste Entscheidung zurückführen."],
  "如果你也在建造": ["If you are building", "まだ存在しない世界を", "Wenn du eine Welt baust,"],
  "一个尚未存在的世界。": ["a world that does not exist yet.", "作っているなら。", "die es noch nicht gibt."],
  "欢迎预约 30 分钟 Founder 对话。可以聊动漫影视产品、AI 创作工具、复杂后台、0→1 原型，或一个还没有名字的想法。": ["Book a 30-minute founder conversation about anime and film products, AI creative tools, complex platforms, 0→1 prototypes—or an idea that does not have a name yet.", "30分の Founder 対話をご予約ください。アニメ・映像プロダクト、AI制作ツール、複雑な業務システム、0→1の原型、まだ名前のないアイデアについて話せます。", "Buche ein 30-minütiges Founder-Gespräch über Anime- und Filmprodukte, KI-Kreativwerkzeuge, komplexe Plattformen, 0→1-Prototypen oder eine Idee, die noch keinen Namen hat."],
  "中文 / English": ["English / 中文 / 日本語 / Deutsch", "日本語 / English / 中文 / Deutsch", "Deutsch / English / 中文 / 日本語"],
  "预约 Founder 对话": ["Book a founder conversation", "Founder 対話を予約", "Founder-Gespräch buchen"],
  "DURATION": ["DURATION", "時間", "DAUER"], "FORMAT": ["FORMAT", "形式", "FORMAT"], "LANGUAGE": ["LANGUAGE", "言語", "SPRACHE"],
  "REQUEST A TIME": ["REQUEST A TIME", "日時を申請", "TERMIN ANFRAGEN"],
  "THE SITUATION": ["THE SITUATION", "状況", "AUSGANGSLAGE"], "THE DESIGN RESPONSE": ["THE DESIGN RESPONSE", "デザインの回答", "DESIGNANTWORT"],
  "PORTRAIT STUDY ·": ["PORTRAIT STUDY ·", "ポートレート ·", "PORTRÄTSTUDIE ·"],
  "你的名字": ["Your name", "お名前", "Dein Name"], "联系邮箱": ["Email", "メール", "E-Mail"], "希望日期": ["Preferred date", "希望日", "Wunschdatum"],
  "所在时区": ["Time zone", "タイムゾーン", "Zeitzone"], "想聊什么": ["What would you like to discuss?", "相談テーマ", "Worüber möchtest du sprechen?"],
  "补充说明": ["Additional context", "補足", "Zusätzlicher Kontext"], "产品与原型": ["Product & prototyping", "プロダクトと原型", "Produkt & Prototyping"],
  "AI 影视创作": ["AI filmmaking", "AI映像制作", "KI-Filmproduktion"], "合作咨询": ["Partnership enquiry", "協業相談", "Kooperationsanfrage"], "其他想法": ["Another idea", "その他", "Andere Idee"],
  "提交预约申请 ↗": ["Submit booking request ↗", "予約を申請 ↗", "Terminanfrage senden ↗"], "正在提交…": ["Submitting…", "送信中…", "Wird gesendet…"],
  "预约申请已收到 ✓": ["Request received ✓", "申請を受け付けました ✓", "Anfrage erhalten ✓"],
  "提交后，预约信息会被安全保存，仅用于本次沟通。": ["Your details are stored securely and used only for this conversation.", "情報は安全に保存され、この対話のためにのみ使用されます。", "Deine Angaben werden sicher gespeichert und nur für dieses Gespräch verwendet."],
  "Suzy 会通过邮件确认，并发送 Google Calendar 邀请。": ["Suzy will confirm by email and send a Google Calendar invitation.", "Suzy がメールで確認し、Google Calendar の招待を送ります。", "Suzy bestätigt per E-Mail und sendet eine Google-Calendar-Einladung."],
  "暂时无法提交，请直接发送邮件。": ["Submission failed. Please email Suzy directly.", "送信できませんでした。メールでご連絡ください。", "Senden fehlgeschlagen. Bitte schreibe Suzy direkt."],
  "提交暂时失败，请直接发送邮件。": ["Submission failed. Please email Suzy directly.", "送信できませんでした。メールでご連絡ください。", "Senden fehlgeschlagen. Bitte schreibe Suzy direkt."],
  "动漫 · 影视 · 产品 · 想象力": ["Anime · Film · Product · Imagination", "アニメ · 映像 · プロダクト · 想像力", "Anime · Film · Produkt · Fantasie"],
  "BACK TO TOP ↑": ["BACK TO TOP ↑", "トップへ ↑", "NACH OBEN ↑"], "关闭 ×": ["Close ×", "閉じる ×", "Schließen ×"],
  "进入在线作品 ↗": ["Visit live product ↗", "作品を開く ↗", "Live-Produkt öffnen ↗"], "下载 Windows / macOS 版本 ↓": ["Download for Windows / macOS ↓", "Windows / macOS 版をダウンロード ↓", "Für Windows / macOS herunterladen ↓"]
};

const placeholders: Record<string, Translation> = {
  "用几句话介绍你正在做的事…": ["Tell me briefly what you are building…", "取り組んでいることを簡単に教えてください…", "Erzähle kurz, woran du arbeitest…"],
  "Asia/Shanghai": ["America/Los_Angeles", "Asia/Tokyo", "Europe/Berlin"]
};

const originals = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, string>();

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const apply = () => {
      const index = language === "en" ? 0 : language === "ja" ? 1 : 2;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach(node => {
        if (node.parentElement?.closest("[data-language-control]")) return;
        const source = originals.get(node) ?? node.data;
        if (!originals.has(node)) originals.set(node, source);
        const key = source.trim();
        const translated = translations[key];
        node.data = language === "zh" || !translated ? source : source.replace(key, translated[index]);
      });
      document.querySelectorAll("[placeholder]").forEach(element => {
        const source = originalAttributes.get(element) ?? element.getAttribute("placeholder") ?? "";
        if (!originalAttributes.has(element)) originalAttributes.set(element, source);
        const translated = placeholders[source];
        element.setAttribute("placeholder", language === "zh" || !translated ? source : translated[index]);
      });
      document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  return <div className="language-control" data-language-control aria-label="Language">
    {(["en", "zh", "ja", "de"] as Language[]).map(item =>
      <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)}>
        {item === "en" ? "EN" : item === "zh" ? "中文" : item === "ja" ? "日本語" : "DE"}
      </button>
    )}
  </div>;
}
