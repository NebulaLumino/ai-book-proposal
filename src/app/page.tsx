"use client";
import { useState } from "react";

export default function BookProposalPage() {
  const [bookTitle, setBookTitle] = useState("");
  const [genre, setGenre] = useState("Non-fiction");
  const [targetReader, setTargetReader] = useState("");
  const [uniqueAngle, setUniqueAngle] = useState("");
  const [compTitles, setCompTitles] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!bookTitle.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookTitle, genre, targetReader, uniqueAngle, compTitles }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-300 mb-2">AI Book Proposal</h1>
        <p className="text-slate-400 mb-8">Create professional book proposals for publishers and agents</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Book Title *</label>
              <input value={bookTitle} onChange={e => setBookTitle(e.target.value)} placeholder="Your book title"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Genre</label>
              <select value={genre} onChange={e => setGenre(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500">
                {["Non-fiction","Memoir","Business","Self-help","Narrative non-fiction","Self-help"].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Target Reader</label>
              <input value={targetReader} onChange={e => setTargetReader(e.target.value)} placeholder="Who is this book for?"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Unique Angle</label>
              <input value={uniqueAngle} onChange={e => setUniqueAngle(e.target.value)} placeholder="What makes this book different?"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Comparable Titles</label>
              <input value={compTitles} onChange={e => setCompTitles(e.target.value)} placeholder="Books like this one"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500" />
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Writing proposal..." : "Write Book Proposal"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-teal-300 mb-4">Book Proposal</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">{output}</pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">Proposal will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
