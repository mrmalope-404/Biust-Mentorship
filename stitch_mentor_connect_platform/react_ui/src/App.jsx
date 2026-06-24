import React, { useEffect, useMemo, useState } from "react";
import { fields as FIELDS, mentors as MENTORS } from "./data";

function clampMentorSelection(available, selected) {
  if (selected && available.some((m) => m.name === selected.name)) return selected;
  return available[0] ?? null;
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-on-surface text-white px-5 py-3 rounded-xl shadow-2xl z-50 font-bold text-sm animate-fade-in-up">
      {message}
    </div>
  );
}

/* ────────────────────────────────────────────
   HEADER (reused across all designs)
   ──────────────────────────────────────────── */
function Header({ active, onNav }) {
  return (
    <header className="w-full sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm transition-all duration-300">
      <nav className="flex justify-between items-center px-margin-desktop h-20 max-w-container-max mx-auto">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-md group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md font-bold text-primary">BIUST Mentorship</span>
            <span className="text-[10px] uppercase tracking-widest text-outline -mt-1">Future Focus Excellence</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button
            className={`pb-1 font-bold font-body-md text-body-md transition-colors duration-200 ${active === "fields" ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"}`}
            onClick={() => onNav("fields")}
          >
            Home
          </button>
          <button
            className={`pb-1 font-body-md text-body-md transition-colors duration-200 ${active === "mentors" ? "text-primary border-b-2 border-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
            onClick={() => onNav("mentors")}
          >
            Mentors
          </button>
          <button
            className={`pb-1 font-body-md text-body-md transition-colors duration-200 ${active === "confirmation" ? "text-primary border-b-2 border-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
            onClick={() => onNav("confirmation")}
          >
            About
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-container transition-colors duration-200 active:scale-95">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant cursor-pointer hover:border-primary transition-all">
            <span className="material-symbols-outlined text-primary">account_circle</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ────────────────────────────────────────────
   STEPPER / PROGRESS TRACKER
   ──────────────────────────────────────────── */
function Stepper({ step, style = "default" }) {
  const steps = [
    { key: "fields", label: "Choose Field", num: "01", desc: "You are here" },
    { key: "mentors", label: "Select Mentor", num: "02", desc: "Browse mentors" },
    { key: "request", label: "Request Mentorship", num: "03", desc: "Provide details" },
    { key: "confirmation", label: "Confirmation", num: "04", desc: "Track request" },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  if (style === "compact") {
    return (
      <div className="w-full max-w-4xl mx-auto mb-section-gap">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-container-highest z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary z-0 transition-all duration-500" style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}></div>
          {steps.map((s, idx) => {
            const isCompleted = idx < stepIndex;
            const isActive = idx === stepIndex;
            const isFuture = idx > stepIndex;
            return (
              <div key={s.key} className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-label-caps font-label-caps text-on-surface-variant">{s.num}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-white border-4 border-white shadow-sm"
                    : isActive
                    ? "w-12 h-12 bg-primary text-white border-4 border-white shadow-xl ring-4 ring-primary-fixed"
                    : "bg-surface-container text-on-surface-variant border-2 border-outline-variant"
                }`}>
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  ) : isActive ? (
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{s.key === "confirmation" ? "verified" : "group"}</span>
                  ) : (
                    <span className="material-symbols-outlined text-[20px]">{s.key === "mentors" ? "group" : s.key === "request" ? "description" : "check_circle"}</span>
                  )}
                </div>
                <span className={`text-body-sm font-semibold ${
                  isActive ? "text-primary font-bold" : isCompleted ? "text-primary" : "text-on-surface-variant"
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default fancy stepper for choose field
  return (
    <div className="lg:col-span-8 relative min-h-[280px] hidden md:block">
      <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 -z-10 overflow-visible" fill="none" viewBox="0 0 800 100">
        <path className="step-path" d="M100,50 C200,50 200,10 350,10 C500,10 500,90 650,90 C800,90 800,50 900,50" stroke="url(#gradient-line)" strokeLinecap="round" strokeWidth="2"></path>
        <defs>
          <linearGradient id="gradient-line" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#0052ff"></stop>
            <stop offset="100%" stopColor="#bacfff"></stop>
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-between items-center relative h-full">
        {steps.map((s, idx) => {
          const isActive = idx === stepIndex;
          const isFuture = idx > stepIndex;
          return (
            <div key={s.key} className={`flex flex-col items-center gap-4 group ${isFuture ? "opacity-40" : isActive ? "" : "opacity-60"}`}>
              <div className="relative">
                {isActive && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-[12px] font-bold rounded-md shadow-lg animate-bounce-subtle">{s.num}</div>
                )}
                {!isActive && !isFuture && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-[12px] font-bold rounded-md shadow-lg">{s.num}</div>
                )}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-primary-container text-white shadow-xl shadow-primary/20 ring-4 ring-primary/10 group-hover:scale-110"
                    : "bg-surface-container text-on-surface-variant border-2 border-dashed border-outline-variant"
                }`}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {s.key === "fields" ? "explore" : s.key === "mentors" ? "group" : s.key === "request" ? "description" : "check_circle"}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className={`font-label-bold text-label-bold ${isActive ? "text-on-surface" : "text-on-surface-variant"}`}>{s.label}</p>
                <p className="text-[12px] font-bold text-primary">{isActive ? "You are here" : s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   SCREEN 1: CHOOSE FIELD (landing.png)
   ──────────────────────────────────────────── */
function FieldStep({ selectedField, onSelectField, onNav }) {
  return (
    <main className="min-h-screen">
      {/* Hero Section & Stepper */}
      <section className="hero-gradient pt-section-gap pb-12 px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight mb-6">
              Find your mentor.<br/>
              Shape your <span className="text-primary-container relative">future.<span className="absolute bottom-1 left-0 w-full h-1 bg-primary/20 -z-10"></span></span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Connect with experienced BIUST professionals and accelerate your personal and career growth.
            </p>
          </div>
          <Stepper step="fields" />
        </div>
      </section>

      {/* Grid Content Section */}
      <section className="py-16 px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-outline-variant"></div>
          <div className="text-center">
            <span className="material-symbols-outlined text-primary mb-2 block text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Choose your field of interest</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Select a field to explore mentors in that area.</p>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-outline-variant"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIELDS.map((f) => {
            const isSelected = f.id === selectedField;
            return (
              <button
                key={f.id}
                className={`group relative bg-white rounded-xl p-6 text-left cursor-pointer transition-all hover:-translate-y-1 ${
                  isSelected
                    ? "border-2 border-primary shadow-xl shadow-primary/5"
                    : "border border-outline-variant shadow-sm hover:border-primary-container hover:shadow-lg"
                }`}
                onClick={() => onSelectField(f.id)}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary text-white p-1 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </div>
                  </div>
                )}
                <div className={`w-16 h-16 rounded-full ${f.color} flex items-center justify-center mb-6`}>
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{f.id}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 min-h-[42px]">{f.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className={`font-label-bold text-label-bold ${isSelected ? "text-primary" : f.id === "Engineering" ? "text-orange-600" : f.id === "Natural & Applied Sciences" ? "text-emerald-600" : "text-purple-600"}`}>{f.n} mentors</span>
                  <span className={`material-symbols-outlined group-hover:translate-x-1 transition-transform ${isSelected ? "text-primary" : f.id === "Engineering" ? "text-orange-600" : f.id === "Natural & Applied Sciences" ? "text-emerald-600" : "text-purple-600"}`}>arrow_forward</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA Bar */}
      <section className="max-w-container-max mx-auto px-margin-desktop mb-16">
        <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-8 md:flex items-center justify-between gap-8">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <h4 className="font-label-bold text-label-bold text-on-surface mb-1">Vetted. Trusted. Committed to your success.</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-lg">All mentors are vetted BIUST alumni and professionals committed to helping you succeed through personalized guidance.</p>
            </div>
          </div>
          <div className="flex items-center gap-8 shrink-0">
            <div className="hidden lg:flex items-center -space-x-4">
              {MENTORS.slice(0, 3).map((m, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                  <img className="w-full h-full object-cover" src={m.img} alt={m.name} />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[12px] font-bold">+20</div>
            </div>
            <button
              className="w-full md:w-auto px-8 py-4 bg-primary-container text-white rounded-lg font-label-bold text-label-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary transition-all hover:scale-[1.02] active:scale-95 group"
              onClick={() => onNav("mentors")}
            >
              Explore Mentors
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 text-outline">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <p className="text-[12px] font-body-sm">Your information is secure and will only be used for mentorship purposes.</p>
        </div>
      </section>
    </main>
  );
}

/* ────────────────────────────────────────────
   SCREEN 2: SELECT MENTOR (screen.png)
   ──────────────────────────────────────────── */
function MentorStep({
  selectedField,
  selectedMentor,
  onSelectMentor,
  selectedSkills,
  setSelectedSkills,
  availabilityOnly,
  setAvailabilityOnly,
  search,
  setSearch,
  onReset,
  onNav,
}) {
  const mentorCandidates = useMemo(() => {
    const q = search.trim().toLowerCase();
    const s = selectedSkills;
    const av = availabilityOnly;
    return MENTORS.filter((m) => m.f === selectedField)
      .filter((m) => !av || m.av)
      .filter((m) => !s.length || m.sk.some((k) => s.includes(k)))
      .filter((m) => {
        const h = [m.name, m.r, m.d, m.sk.join(" "), m.bio].join(" ").toLowerCase();
        return !q || h.includes(q);
      });
  }, [availabilityOnly, search, selectedField, selectedSkills]);

  const effectiveMentor = useMemo(
    () => clampMentorSelection(mentorCandidates, selectedMentor),
    [mentorCandidates, selectedMentor]
  );

  useEffect(() => {
    if (!effectiveMentor) return;
    if (!selectedMentor || selectedMentor.name !== effectiveMentor.name) {
      onSelectMentor(effectiveMentor);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveMentor?.name]);

  useEffect(() => {
    if (!mentorCandidates.length) return;
    const exists = effectiveMentor && mentorCandidates.some((m) => m.name === effectiveMentor.name);
    if (!exists) {
      onSelectMentor(mentorCandidates[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorCandidates.length]);

  function toggleSkill(value) {
    setSelectedSkills((prev) => {
      const has = prev.includes(value);
      if (has) return prev.filter((x) => x !== value);
      return [...prev, value];
    });
  }

  const detail = effectiveMentor;

  return (
    <>
      {/* Progress Steps - compact horizontal */}
      <section className="max-w-[1440px] mx-auto px-6 pt-10 pb-4">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Select your mentor</h2>
          <p className="text-slate-500 font-medium">Choose from verified BIUST professionals</p>
        </div>
        {/* Progress Steps */}
        <div className="flex items-center justify-center max-w-2xl mx-auto mb-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2 shadow-lg shadow-blue-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m4.5 12.75 6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="text-xs font-bold text-slate-900">Field</span>
          </div>
          <div className="h-0.5 w-16 bg-primary mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2 shadow-lg shadow-blue-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="text-xs font-bold text-slate-900">Select Mentor</span>
          </div>
          <div className="h-0.5 w-16 bg-slate-200 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center mb-2 bg-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="text-xs font-bold text-slate-400">Request</span>
          </div>
          <div className="h-0.5 w-16 bg-slate-200 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center mb-2 bg-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="text-xs font-bold text-slate-400">Confirmation</span>
          </div>
        </div>
      </section>

      {/* Main Content - 3 Column Layout */}
      <main className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Filters */}
          <aside className="col-span-12 lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Filters</h3>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>

            {/* Field */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3">Field</label>
              <div className="relative">
                <select className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg appearance-none text-slate-700 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={selectedField} onChange={(e) => {}} disabled>
                  <option>{selectedField}</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3">Expertise</label>
              <div className="space-y-3">
                {["AI / Machine Learning", "Web Development", "Data Science", "Cybersecurity", "Mobile Development"].map((skill) => {
                  const val = skill.split(" / ")[0];
                  return (
                    <label key={skill} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedSkills.includes(val)}
                        onChange={() => toggleSkill(val)}
                      />
                      <span className="text-sm font-medium text-slate-700">{skill}</span>
                    </label>
                  );
                })}
                <button className="text-sm text-slate-500 font-bold flex items-center gap-1 hover:text-blue-600 mt-1">
                  Show more <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3">Availability</label>
              <div className="space-y-3">
                {["All", "Available now", "Weekends", "Online only"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="avail" className="w-5 h-5 border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={opt === "Available now" ? availabilityOnly : opt === "All" && !availabilityOnly}
                      onChange={() => setAvailabilityOnly(opt === "Available now")}
                    />
                    <span className="text-sm font-medium text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3">Rating</label>
              <div className="flex gap-2">
                {["All", "4⭐ & up", "3⭐ & up"].map((r) => (
                  <button key={r} className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200">{r}</button>
                ))}
              </div>
            </div>

            <button className="w-full py-3 text-slate-500 font-bold border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors" onClick={onReset}>
              Clear filters
            </button>
          </aside>

          {/* MIDDLE COLUMN: Mentor Grid */}
          <div className="col-span-12 lg:col-span-6">
            {/* Search */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-grow">
                <input className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Search mentors..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <div className="relative">
                <select className="pl-4 pr-10 py-3 border border-slate-200 rounded-lg bg-white appearance-none font-medium text-slate-700 focus:ring-2 focus:ring-blue-500">
                  <option>Sort by</option>
                </select>
                <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <button className="p-3 border border-slate-200 rounded-lg bg-white">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 0V21m6-8.25V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 0V21m6-8.25V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 0V21" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
            </div>

            {/* Mentor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {mentorCandidates.length ? (
                mentorCandidates.map((m, i) => {
                  const isSelected = detail && m.name === detail.name;
                  return (
                    <button
                      key={m.name}
                      className={`bg-white rounded-xl p-6 relative text-left transition-all ${
                        isSelected
                          ? "border-2 border-blue-600 shadow-sm ring-4 ring-blue-50"
                          : "border border-slate-200 shadow-sm hover:shadow-md"
                      }`}
                      onClick={() => onSelectMentor(m)}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="m4.5 12.75 6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden">
                            <img className="w-full h-full object-cover" src={m.img} alt={m.name} />
                          </div>
                          <span className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${m.av ? "bg-green-500" : "bg-yellow-500"}`}></span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="font-extrabold text-slate-900">{m.name}</h4>
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path></svg>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">{m.r}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs font-bold text-yellow-500">⭐ {m.rating}</span>
                            <span className="text-[10px] text-slate-400">({m.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {m.sk.slice(0, 4).map((sk) => (
                          <span key={sk} className={`px-2 py-1 text-[10px] font-bold rounded ${
                            sk === "AI/ML" || sk === "Python" || sk === "NLP" || sk === "LLMs"
                              ? "bg-blue-50 text-blue-600"
                              : sk === "Data Science" || sk === "SQL"
                              ? "bg-green-50 text-green-600"
                              : sk === "Web Dev" || sk === "React" || sk === "Node.js"
                              ? "bg-purple-50 text-purple-600"
                              : sk === "Security" || sk === "Network" || sk === "Linux"
                              ? "bg-red-50 text-red-600"
                              : "bg-blue-50 text-blue-600"
                          }`}>{sk}</span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">{m.bio}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${m.av ? "bg-green-500" : "bg-yellow-500"}`}></span>
                          <span className={`text-[11px] font-bold ${m.av ? "text-green-600" : "text-yellow-600"}`}>{m.a === "Available now" ? "Available now" : m.a}</span>
                          <span className="text-[10px] text-slate-400 font-medium ml-2">Online</span>
                        </div>
                        <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                          View Profile <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full p-10 text-center bg-white border border-slate-200 rounded-xl">
                  <h3 className="font-bold text-lg text-slate-700 mb-2">No mentors found</h3>
                  <p className="text-sm text-slate-500">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="p-2 text-slate-400 border border-slate-200 rounded-lg hover:bg-slate-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
              <button className="w-10 h-10 bg-blue-600 text-white font-bold rounded-lg">1</button>
              <button className="w-10 h-10 text-slate-600 font-bold hover:bg-slate-50 rounded-lg">2</button>
              <button className="w-10 h-10 text-slate-600 font-bold hover:bg-slate-50 rounded-lg">3</button>
              <span className="px-2 text-slate-400">...</span>
              <button className="w-10 h-10 text-slate-600 font-bold hover:bg-slate-50 rounded-lg">7</button>
              <button className="p-2 text-slate-400 border border-slate-200 rounded-lg hover:bg-slate-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Selected Mentor Detail */}
          <aside className="col-span-12 lg:col-span-3">
            {detail ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden sticky top-24">
                {/* Detail Header */}
                <div className="relative h-64 bg-slate-900 flex items-center justify-center p-8">
                  <div className="absolute inset-0 opacity-40 overflow-hidden">
                    <div className="w-full h-full opacity-20" style={{ backgroundImage: "radial-gradient(circle, #0052ff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  </div>
                  <button className="absolute top-4 right-4 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </button>
                  <div className="relative z-10">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 p-1">
                      <div className="w-full h-full rounded-full bg-slate-400 overflow-hidden">
                        <img className="w-full h-full object-cover" src={detail.imgLarge || detail.img} alt={detail.name} />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-slate-900 rounded-full"></span>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <h3 className="text-xl font-extrabold text-slate-900">{detail.name}</h3>
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path></svg>
                  </div>
                  <p className="text-xs text-slate-500 font-bold mb-3 uppercase tracking-wide">{detail.r}</p>
                  <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-700 mb-6">
                    <div className="flex items-center gap-1"><span className="text-yellow-500">⭐ {detail.rating}</span> ({detail.reviews} reviews)</div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div>{detail.ca} mentees</div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${detail.av ? "bg-green-50 border border-green-100" : "bg-amber-50 border border-amber-100"}`}>
                      <span className={`w-2 h-2 rounded-full ${detail.av ? "bg-green-500 animate-pulse" : "bg-yellow-500"} ${detail.av ? "animate-pulse" : ""}`}></span>
                      <span className={`text-[11px] font-extrabold ${detail.av ? "text-green-700" : "text-amber-700"}`}>{detail.a === "Available now" ? "Available now" : detail.a}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-extrabold text-slate-600">Online</div>
                  </div>

                  {/* Expertise & About */}
                  <div className="text-left space-y-6">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 mb-3 uppercase tracking-wider">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {detail.sk.map((sk) => (
                          <span key={sk} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">{sk}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 mb-2 uppercase tracking-wider">About</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{detail.about}</p>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-center">
                        <div className="text-sm font-extrabold text-slate-900">{detail.yearsExp}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase">Years exp.</div>
                      </div>
                      <div className="text-center border-x border-slate-200 px-2">
                        <div className="text-sm font-extrabold text-slate-900">{detail.reviews}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-extrabold text-slate-900">{detail.successRate}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase">Success rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 space-y-3">
                    <button
                      className="w-full py-4 bg-blue-600 text-white font-extrabold rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      onClick={() => onNav("request")}
                    >
                      Send Mentorship Request
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                    <button className="w-full py-3 bg-white text-slate-700 font-bold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      Save Mentor
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <p className="text-slate-500">Select a mentor to view details</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}

/* ────────────────────────────────────────────
   SCREEN 3: REQUEST MENTORSHIP (form page)
   ──────────────────────────────────────────── */
function RequestStep({ selectedMentor, form, setForm, onSubmit, onUpdateToast }) {
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Request Mentorship</h2>
          <p className="text-slate-500 font-medium">Tell us about yourself</p>
        </div>
        <Stepper step="request" style="compact" />
      </section>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); onUpdateToast("Request sent!"); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required value={form.n} onChange={(e) => setForm({ ...form, n: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Year of Study</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={form.y} onChange={(e) => setForm({ ...form, y: e.target.value })}>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                  <option>4th</option>
                  <option>Grad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Program</label>
                <input className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required value={form.p} onChange={(e) => setForm({ ...form, p: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Meeting</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={form.m} onChange={(e) => setForm({ ...form, m: e.target.value })}>
                  <option>Online</option>
                  <option>On campus</option>
                  <option>Email</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Why mentorship?</label>
                <textarea className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]" required value={form.r} onChange={(e) => setForm({ ...form, r: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">3-month goals</label>
                <textarea className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]" value={form.g} onChange={(e) => setForm({ ...form, g: e.target.value })} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div className="flex items-center gap-4">
                {selectedMentor && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                      <img className="w-full h-full object-cover" src={selectedMentor.img} alt={selectedMentor.name} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{selectedMentor.name}</p>
                      <p className="text-xs text-slate-500">{selectedMentor.r}</p>
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="px-8 py-4 bg-blue-600 text-white font-extrabold rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center gap-2">
                Send Request
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

/* ────────────────────────────────────────────
   SCREEN 4: CONFIRMATION (confirmation.png)
   ──────────────────────────────────────────── */
function ConfirmationStep({ onGoFields, selectedMentor }) {
  return (
    <>
      {/* TopNavBar - same as choose field but lighter */}
      <main className="flex-grow container mx-auto px-margin-desktop py-12 max-w-container-max">
        {/* Progress Stepper - compact with all 4 done */}
        <Stepper step="confirmation" style="compact" />

        {/* Success Content */}
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-fixed-dim blur-3xl opacity-20 rounded-full"></div>
              <div className="relative w-32 h-32 bg-surface-container-lowest border-2 border-primary-fixed rounded-full flex items-center justify-center text-primary shadow-xl animate-glow-green">
                <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Request Sent Successfully!</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
                Your mentorship request has been submitted. The mentor will review your profile and goals. You'll receive a notification once they've accepted.
              </p>
            </div>
          </div>

          {/* Request Summary Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-8 text-left shadow-sm">
            <h2 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider mb-6">Summary of Request</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0">
                  <img className="w-full h-full object-cover" src={selectedMentor?.img || ""} alt={selectedMentor?.name || "Mentor"} />
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-primary">Mentor</p>
                  <p className="font-headline-md text-[18px] text-on-surface">{selectedMentor?.name || "—"}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{selectedMentor?.r || ""}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-label-bold text-label-bold text-on-surface-variant mb-1">Focus Area</p>
                  <span className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-body-sm text-[12px] font-semibold">
                    {selectedMentor?.sk?.slice(0, 2).join(" & ") || "General"}
                  </span>
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-on-surface-variant mb-1">Estimated Response</p>
                  <p className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">schedule</span>
                    Within 2-3 business days
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant">
              <p className="font-label-bold text-label-bold text-on-surface-variant mb-2">Message Included</p>
              <p className="font-body-md text-body-md text-on-surface italic bg-surface-container-low p-4 rounded-lg border-l-4 border-primary">
                "I'm really interested in learning how to scale distributed systems. Your experience at Google is exactly what I hope to learn from as I start my final year project..."
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <button
              className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-lg font-label-bold text-label-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all duration-300 shadow-lg active:scale-95"
              onClick={() => onGoFields()}
            >
              View My Requests
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button
              className="w-full md:w-auto px-8 py-4 bg-surface-container-lowest border border-primary text-primary rounded-lg font-label-bold text-label-bold hover:bg-surface-container transition-all duration-300 active:scale-95"
              onClick={() => onGoFields()}
            >
              Back to Dashboard
            </button>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant pt-4">
            Need help? <a className="text-primary underline font-semibold" href="#">Contact Support</a>
          </p>
        </div>
      </main>
    </>
  );
}

/* ────────────────────────────────────────────
   FOOTER
   ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="w-full py-section-gap bg-surface-dim mt-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-label-bold text-label-bold text-primary">BIUST Mentorship</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 BIUST Mentorship. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:underline decoration-primary transition-all" href="#">Privacy Policy</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:underline decoration-primary transition-all" href="#">Terms of Service</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:underline decoration-primary transition-all" href="#">Support</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:underline decoration-primary transition-all" href="#">Contact Us</a>
        </div>
        <div className="flex items-center gap-4">
          <a className="p-2 text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
          <a className="p-2 text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────
   APP ROOT
   ──────────────────────────────────────────── */
export default function App() {
  const [activeStep, setActiveStep] = useState("fields");
  const [toast, setToast] = useState("");

  const [selectedField, setSelectedField] = useState("Computing & Informatics");
  const [selectedMentor, setSelectedMentor] = useState(MENTORS[0]);

  const [selectedSkills, setSelectedSkills] = useState(["AI"]);
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    n: "Kabelo M.",
    y: "2nd",
    p: "Computer Science",
    m: "Online",
    r: "I want to build a portfolio and prepare for tech internships.",
    g: "Complete 2 projects and improve interview skills.",
  });

  function msg(m) {
    setToast(m);
    window.setTimeout(() => setToast(""), 2500);
  }

  function go(tab) {
    setActiveStep(tab);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSelectField(fid) {
    setSelectedField(fid);
    msg(`Exploring ${fid}`);
    go("mentors");
  }

  function resetFilters() {
    setSelectedSkills(["AI"]);
    setAvailabilityOnly(false);
    setSearch("");
  }

  return (
    <>
      <Header active={activeStep} onNav={go} />

      {activeStep === "fields" && (
        <FieldStep selectedField={selectedField} onSelectField={handleSelectField} onNav={go} />
      )}

      {activeStep === "mentors" && (
        <MentorStep
          selectedField={selectedField}
          selectedMentor={selectedMentor}
          onSelectMentor={(m) => setSelectedMentor(m)}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          availabilityOnly={availabilityOnly}
          setAvailabilityOnly={setAvailabilityOnly}
          search={search}
          setSearch={setSearch}
          onReset={resetFilters}
          onUpdateToast={msg}
          onNav={go}
        />
      )}

      {activeStep === "request" && (
        <RequestStep
          selectedMentor={selectedMentor}
          form={form}
          setForm={setForm}
          onSubmit={() => {
            go("confirmation");
          }}
          onUpdateToast={msg}
        />
      )}

      {activeStep === "confirmation" && (
        <ConfirmationStep
          onGoFields={() => {
            setSelectedSkills(["AI"]);
            setAvailabilityOnly(false);
            setSearch("");
            go("fields");
          }}
          selectedMentor={selectedMentor}
        />
      )}

      <Footer />
      <Toast message={toast} />
    </>
  );
}