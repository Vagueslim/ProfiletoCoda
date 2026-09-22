import { escapeHtml as esc, relativeHref } from '../lib/html.js';
import { codaRoutePath, alternateCodaRoute } from '../../src/data/coda-routes.js';
import { codaProjects } from '../../src/data/coda-projects.js';
import { site } from '../../src/data/site-content.js';
import { renderCodaCase } from './coda-case.mjs';
import { renderCodaAbout } from './coda-about.mjs';

const text = (route, en, th) => route.locale === 'th' ? th : en;
const link = (route, page, slug = '') => relativeHref(route.path, codaRoutePath(route.locale, page, slug));
const asset = (route, path) => relativeHref(route.path, `/${path.replace(/^\//, '')}`);
const arrow = '<span aria-hidden="true">↗</span>';

function signalArt(route, compact = false) {
  return `<div class="co-signal${compact ? ' co-signal--compact' : ''}" role="group" aria-label="${text(route, 'Research dataset: 3,999 rescheduling records, split into 3,545 staff-assisted and 454 self-service records.', 'ข้อมูลที่ศึกษา: เปลี่ยนวัน 3,999 รายการ แบ่งเป็นผ่านเจ้าหน้าที่ 3,545 รายการ และลูกค้าทำเอง 454 รายการ')}">
    <div class="co-signal__top"><span>Q–CHANG / CHANGE DATE</span><span>${text(route, 'A SERVICE, RECONSIDERED', 'มองการเปลี่ยนวันใหม่อีกครั้ง')}</span></div>
    <div class="co-signal__drawing">
      <div class="co-signal__total"><span class="co-signal__eyebrow">${text(route, 'RECORDS STUDIED', 'รายการที่ศึกษา')}</span><strong>3,999<span class="co-signal__dot">.</span></strong><span>${text(route, 'One request. A whole system behind it.', 'หนึ่งคำขอ กับระบบที่อยู่เบื้องหลัง')}</span></div>
      <div class="co-signal__bridge" aria-hidden="true"><span></span><img src="${asset(route, '/src/assets/images/work/rescheduling-pain/stations/station-01.webp')}" alt="" width="246" height="246"></div>
      <div class="co-signal__branches">
        <div class="co-signal__branch"><span class="co-signal__node" aria-hidden="true"></span><strong>3,545</strong><span>${text(route, 'Staff-assisted', 'ผ่านเจ้าหน้าที่')}</span></div>
        <div class="co-signal__branch"><span class="co-signal__node" aria-hidden="true"></span><strong>454</strong><span>${text(route, 'Self-service', 'ลูกค้าทำเอง')}</span></div>
      </div>
    </div>
    <div class="co-signal__bottom"><span>${text(route, 'BOOKING → PEOPLE → COORDINATION', 'วันจอง → คน → การประสานงาน')}</span><span>${text(route, 'Research data · not an impact metric', 'ข้อมูลที่ศึกษา · ไม่ใช่ตัวเลขผลลัพธ์')}</span></div>
  </div>`;
}

function projectRows(route, home = false) {
  return codaProjects.map((project, i) => {
    const copy = project[route.locale];
    const visual = i === 0 ? signalArt(route, true) : `<div class="co-project__image co-project__image--${i}" style="--project-color:${esc(project.color)}"><img src="${asset(route, project.cover.src)}" alt="${esc(project.cover.alt[route.locale])}" loading="lazy"></div>`;
    return `<article class="co-project" data-coda-project="${project.slug}">
      <div class="co-project__meta"><span>${String(i + 1).padStart(2, '0')} / ${esc(copy.title)}</span><span>${esc(project.year)}</span></div>
      <div class="co-project__grid"><a class="co-project__visual" href="${link(route, 'work-detail', project.slug)}" aria-label="${esc(text(route, 'Read ', 'อ่าน ')+copy.title)}">${visual}</a>
        <div class="co-project__copy"><span class="co-kicker">${['01 — DISCOVERY', '02 — INTERACTION', '03 — SYSTEMS'][i]}</span><h${home ? '3' : '2'}>${esc(copy.problem)}</h${home ? '3' : '2'}><p>${esc(copy.role)}</p><a class="co-link" href="${link(route, 'work-detail', project.slug)}">${text(route, 'Explore the case', 'อ่านเรื่องนี้')} ${arrow}</a></div>
      </div></article>`;
  }).join('');
}

function home(route) {
  return `<section class="co-home-intro co-wrap"><div class="co-title-row"><h1><span class="co-for">for</span> CODA <span class="co-times">×</span><br>Dhittawat<span class="co-title-dot">.</span></h1><div class="co-title-note"><span class="co-kicker">A SELECTED PORTFOLIO / 2026</span><p>Lead UX/UI &amp;<br>Senior Product Designer</p><span>${text(route, 'Bangkok, Thailand', 'กรุงเทพฯ ประเทศไทย')}</span></div></div>
    <div class="co-hero-project"><div class="co-section-line"><span>${text(route, 'FEATURED CASE / 01', 'เคสเปิดเรื่อง / 01')}</span><a href="${link(route, 'work-detail', 'rescheduling-pain')}">Q-CHANG · Change Date ${arrow}</a></div>
    <a class="co-hero-art" href="${link(route, 'work-detail', 'rescheduling-pain')}" aria-label="${text(route, 'Read Q-CHANG Change Date', 'อ่าน Q-CHANG Change Date')}">${signalArt(route)}</a>
    <div class="co-hero-caption"><p>${text(route, 'A change of date was also a question of capacity, communication, and coordination.', 'การเปลี่ยนวันนัด เกี่ยวข้องกับทั้งความพร้อม การสื่อสาร และการประสานงาน')}</p><a class="co-link" href="${link(route, 'work-detail', 'rescheduling-pain')}">${text(route, 'Read the story', 'อ่านเรื่องนี้')} ${arrow}</a></div></div></section>
    <section class="co-introduction co-wrap" aria-labelledby="co-intro-title"><span class="co-kicker">${text(route, 'THE THREAD THROUGH MY WORK', 'สิ่งที่เชื่อมงานของฉัน')}</span><div><h2 id="co-intro-title">${text(route, 'Helping work move forward.', 'ช่วยให้งานเดินต่อได้')}</h2><p>${text(route, 'I work where people, information, and systems meet. I turn unclear workflows into interfaces and shared decisions that help teams take the next step.', 'ฉันทำงานตรงจุดที่คน ข้อมูล และระบบมาพบกัน แปลงขั้นตอนที่ไม่ชัดให้เป็นหน้าจอและการตัดสินใจร่วมกัน เพื่อให้ทีมทำงานขั้นต่อไปได้')}</p></div></section>
    <section class="co-selected co-wrap" aria-labelledby="co-selected-title"><div class="co-section-heading"><h2 id="co-selected-title">${text(route, 'Selected work', 'ผลงานที่เลือกมา')}<sup>03</sup></h2><a class="co-link" href="${link(route, 'work-index')}">${text(route, 'View work', 'ดูผลงาน')} ${arrow}</a></div>${projectRows(route, true)}</section>
    <section class="co-about-teaser co-wrap"><span class="co-kicker">${text(route, 'THE PERSON BEHIND THE WORK', 'คนที่อยู่เบื้องหลังงาน')}</span><div><h2>${text(route, 'There is more to the story.', 'ยังมีอีกด้านของเรื่องนี้')}</h2><p>${text(route, 'A career in design. Go, Sisyphus, and The Book of Why. And something I hope to build.', 'เส้นทางการออกแบบ โกะ ซิซิฟัส The Book of Why และสิ่งที่ฉันอยากสร้าง')}</p><a class="co-link" href="${link(route, 'about')}">${text(route, 'About Dhittawat', 'รู้จัก Dhittawat')} ${arrow}</a></div></section>`;
}

function work(route) {
  return `<section class="co-work-intro co-wrap"><span class="co-kicker">${text(route, 'SELECTED WORK / 03 CASES', 'ผลงานที่เลือกมา / 03 เคส')}</span><div class="co-title-row"><h1>${text(route, 'Work', 'ผลงาน')}<span class="co-title-dot">.</span></h1><p>${text(route, 'Finding the problem. Shaping the interaction. Connecting the system.', 'ค้นโจทย์ ออกแบบปฏิสัมพันธ์ และเชื่อมโครงสร้างระบบ')}</p></div></section><section class="co-work-list co-wrap" aria-label="${text(route, 'Three selected projects', 'สามผลงานที่เลือกมา')}">${projectRows(route)}</section>`;
}

export function renderCodaPage(route) {
  const titles = {home:'for CODA × Dhittawat', about:text(route,'About Dhittawat','รู้จัก Dhittawat'), 'work-index':text(route,'Selected work','ผลงานที่เลือกมา')};
  const project = codaProjects.find(item => item.slug === route.slug);
  return { active: route.page === 'home' ? 'home' : route.page === 'about' ? 'about' : 'work',
    meta:{title:`${titles[route.page] || project[route.locale].title} — Coda edition`, description: project ? project[route.locale].summary : text(route, 'Three product-design case studies by Dhittawat: Q-CHANG, WCF Digital, and PEC Smart Asset.', 'สามเรื่องราวการออกแบบของ Dhittawat: Q-CHANG, WCF Digital และ PEC Smart Asset')},
    body: route.page === 'home' ? home(route) : route.page === 'work-index' ? work(route) : route.page === 'about' ? renderCodaAbout(route) : renderCodaCase(route)
  };
}

export function renderCodaShell({route, meta, body, active}) {
  const alt = alternateCodaRoute(route);
  const alternateHref = relativeHref(route.path, alt.path);
  const nav = [['home','Home'],['about','About'],['work-index','Work']];
  const navLinks = nav.map(([page,label])=>`<a href="${link(route,page)}"${active === (page === 'work-index' ? 'work' : page) ? ' aria-current="page"' : ''}>${label}${label === 'Work' ? '<sup>03</sup>' : ''}</a>`).join('');
  const langLink = `<a class="co-language" data-coda-language href="${alternateHref}" hreflang="${alt.locale}" aria-label="${text(route,'Read this page in Thai','อ่านหน้านี้เป็นภาษาอังกฤษ')}"><span lang="${alt.locale}">${alt.locale.toUpperCase()}</span> ↗</a>`;
  return `<!doctype html><html lang="${route.locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><link rel="icon" href="${asset(route,'/favicon.png')}"><link rel="alternate" hreflang="${alt.locale}" href="${alternateHref}" vite-ignore><link rel="stylesheet" href="${asset(route,'/src/styles/coda.css')}"></head>
  <body class="co-site co-locale-${route.locale}" data-site-menu><a class="co-skip" href="#main-content">${text(route,'Skip to content','ข้ามไปเนื้อหา')}</a>
    <header class="co-header"><a class="co-brand" href="${link(route,'home')}" aria-label="Dhittawat — Home">D<span aria-hidden="true">.</span></a><nav class="co-nav" data-coda-nav aria-label="${text(route,'Primary navigation','เมนูหลัก')}">${navLinks}</nav><div class="co-header-actions">${langLink}<button type="button" class="co-menu-toggle" data-site-menu-toggle aria-controls="co-menu" aria-expanded="false">${text(route,'Menu','เมนู')} +</button></div></header>
    <aside class="co-menu" id="co-menu" role="dialog" aria-modal="true" aria-label="${text(route,'Navigation','เมนูนำทาง')}" aria-hidden="true" inert data-site-menu-panel><div class="co-menu-top"><span>for CODA × Dhittawat</span><button type="button" data-site-menu-close>${text(route,'Close','ปิด')} ×</button></div><nav aria-label="${text(route,'Mobile navigation','เมนูมือถือ')}">${navLinks}</nav></aside>
    <main id="main-content" tabindex="-1">${body}</main>
    <footer class="co-footer co-wrap"><div class="co-footer-top"><a class="co-footer-name" href="${link(route,'home')}">Dhittawat<span>.</span></a><a class="co-link" href="${esc(site.linkedin)}" target="_blank" rel="noreferrer">LinkedIn ${arrow}</a></div><div class="co-footer-bottom"><span>© 2026 Dhittawat Thongkhum</span><span>${text(route,'Selected work for CODA','ผลงานที่เลือกมาสำหรับ CODA')}</span><a href="#main-content">${text(route,'Back to top','กลับด้านบน')} ↑</a></div></footer>
    <script type="module" src="${asset(route,'/src/scripts/coda.js')}"></script></body></html>`;
}
