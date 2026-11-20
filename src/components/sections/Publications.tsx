import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Publication, PublicationType } from '../../types/portfolio';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  Calendar, 
  FileText, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Award
} from 'lucide-react';

export const Publications: React.FC = () => {
  const { data } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);

  // Extract unique categories and years
  const categories = useMemo(() => {
    const cats = new Set<string>();
    data.publications.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [data.publications]);

  const years = useMemo(() => {
    const yrs = new Set<number>();
    data.publications.forEach(p => yrs.add(p.year));
    return Array.from(yrs).sort((a, b) => b - a);
  }, [data.publications]);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return data.publications.filter(pub => {
      // Type filter
      if (selectedType === 'journal' && pub.type !== 'journal') return false;
      if (selectedType === 'ieee_conference' && pub.type !== 'ieee_conference') return false;
      if (selectedType === 'under_review' && pub.status !== 'under_review') return false;

      // Year filter
      if (selectedYear !== 'all' && pub.year.toString() !== selectedYear) return false;

      // Category filter
      if (selectedCategory !== 'all' && pub.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = pub.title.toLowerCase().includes(query);
        const matchAuthors = pub.authors.toLowerCase().includes(query);
        const matchVenue = pub.venue.toLowerCase().includes(query);
        const matchDoi = pub.doi?.toLowerCase().includes(query) || false;
        const matchCategory = pub.category.toLowerCase().includes(query);
        const matchKeywords = pub.keywords?.some(k => k.toLowerCase().includes(query)) || false;
        return matchTitle || matchAuthors || matchVenue || matchDoi || matchCategory || matchKeywords;
      }

      return true;
    });
  }, [data.publications, selectedType, selectedYear, selectedCategory, searchQuery]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyBibtex = (pub: Publication) => {
    const bibtex = pub.bibtex || `@inproceedings{emran${pub.year}${pub.id},\n  title={${pub.title}},\n  author={${pub.authors}},\n  booktitle={${pub.venue}},\n  year={${pub.year}}${pub.doi ? `,\n  doi={${pub.doi}}` : ''}\n}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => {
      setCopiedBibtexId(null);
    }, 2500);
  };

  // Helper for authors text highlighting
  const renderAuthors = (authors: string) => {
    const parts = authors.split(/(Md\. Al Emran)/g);
    return parts.map((part, index) => 
      part === 'Md. Al Emran' ? (
        <strong key={index} className="text-brand-600 dark:text-brand-400 font-semibold underline decoration-brand-500/40 underline-offset-2">
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <section id="publications" className="py-20 bg-slate-100/60 dark:bg-navy-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Scholarly Output & Peer Review</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Research Publications
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            A comprehensive catalog of peer-reviewed journal papers (Springer, Elsevier), IEEE conference proceedings, and accepted manuscripts.
          </p>
        </div>

        {/* Google Scholar & ResearchGate Live Sync & Verification Bar */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-sky-500/5 to-emerald-500/10 border border-brand-500/20 dark:border-brand-500/20 backdrop-blur-md shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Left: Scholar Metrics & Auto-Sync Status */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Live Synced via Google Scholar & GitHub Actions
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                New papers added to Google Scholar (<code className="font-mono text-brand-600 dark:text-brand-400 font-semibold">6wAa7doAAAAJ</code>) are automatically integrated into this portfolio catalog.
              </p>
            </div>

            {/* Right: Quick Action Links */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="https://scholar.google.com/citations?user=6wAa7doAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white dark:bg-navy-900 border border-brand-500/30 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 text-xs font-semibold shadow-sm transition-all"
              >
                <Award className="w-3.5 h-3.5 text-brand-500" />
                <span>Google Scholar</span>
                <span className="px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 font-mono text-[10px]">
                  56+ Cites • h-5
                </span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://www.researchgate.net/profile/Md-Emran-12?ev=hdr_xprf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white dark:bg-navy-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-xs font-semibold shadow-sm transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>ResearchGate</span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10px]">
                  Md-Emran-12
                </span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 shadow-sm mb-8 space-y-4">
          
          {/* Top row: Search input & counts */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, keyword, or DOI..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
              <span>Showing:</span>
              <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
                {filteredPublications.length} of {data.publications.length} Papers
              </span>
            </div>
          </div>

          {/* Bottom row: Filter chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-navy-900 text-xs">
            <span className="text-slate-400 flex items-center space-x-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </span>

            {/* Type buttons */}
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-850'
              }`}
            >
              All Types ({data.publications.length})
            </button>

            <button
              onClick={() => setSelectedType('journal')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedType === 'journal'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-850'
              }`}
            >
              Journals (Springer & Elsevier) ({data.publications.filter(p => p.type === 'journal').length})
            </button>

            <button
              onClick={() => setSelectedType('ieee_conference')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedType === 'ieee_conference'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-850'
              }`}
            >
              IEEE Conferences ({data.publications.filter(p => p.type === 'ieee_conference').length})
            </button>

            <button
              onClick={() => setSelectedType('under_review')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedType === 'under_review'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-850'
              }`}
            >
              Under Review ({data.publications.filter(p => p.status === 'under_review').length})
            </button>

            {/* Year selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="ml-auto px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Years</option>
              {years.map(y => (
                <option key={y} value={y.toString()}>{y}</option>
              ))}
            </select>

            {/* Category selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Research Areas</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Publications List */}
        {filteredPublications.length === 0 ? (
          <div className="text-center py-12 p-8 rounded-2xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No publications match your criteria</h3>
            <p className="text-sm text-slate-500 mt-1">Try clearing your search query or reset filter settings.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedYear('all');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((pub, idx) => (
              <div
                key={pub.id}
                className="p-6 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 hover:border-brand-500/30 dark:hover:border-brand-500/30 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  
                  {/* Left: Badges & Info */}
                  <div className="space-y-2.5 flex-1">
                    
                    {/* Status & Type Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Publication Type */}
                      <span className={`text-[11px] font-mono uppercase font-semibold px-2.5 py-0.5 rounded-full ${
                        pub.type === 'journal'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : pub.type === 'under_review'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                      }`}>
                        {pub.type === 'journal' ? 'Journal Article' : pub.type === 'under_review' ? 'Under Review' : 'IEEE Conference'}
                      </span>

                      {/* Status */}
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        pub.status === 'published'
                          ? 'bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300'
                          : pub.status === 'accepted'
                          ? 'bg-brand-500/15 text-brand-600 dark:text-brand-300 font-semibold'
                          : 'bg-amber-500/15 text-amber-600 dark:text-amber-300'
                      }`}>
                        {pub.status === 'published' ? 'Published' : pub.status === 'accepted' ? 'Accepted (In Press)' : 'Under Review'}
                      </span>

                      {/* Year */}
                      <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{pub.year}</span>
                      </span>

                      {/* Category */}
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        • {pub.category}
                      </span>

                      {/* Special role badges */}
                      {pub.isCorrespondingAuthor && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          Corresponding Author
                        </span>
                      )}

                      {pub.isUndergradThesis && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          B.Sc. Thesis Work
                        </span>
                      )}
                    </div>

                    {/* Paper Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {pub.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {renderAuthors(pub.authors)}
                    </p>

                    {/* Venue & Publisher info */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {pub.venue}
                      </span>
                      {pub.publisher && (
                        <span>• Publisher: {pub.publisher}</span>
                      )}
                      {pub.impactFactor && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                          [{pub.impactFactor}]
                        </span>
                      )}
                    </div>

                    {/* Abstract toggleable */}
                    {pub.abstract && (
                      <div className="pt-1">
                        <button
                          onClick={() => toggleAbstract(pub.id)}
                          className="inline-flex items-center space-x-1 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 font-medium"
                        >
                          <span>{expandedAbstracts[pub.id] ? 'Hide Abstract' : 'View Abstract'}</span>
                          {expandedAbstracts[pub.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {expandedAbstracts[pub.id] && (
                          <div className="mt-2 p-3.5 rounded-xl bg-slate-50 dark:bg-navy-900/90 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200/80 dark:border-navy-800">
                            {pub.abstract}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Actions: DOI, Scholar, BibTeX */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                    {/* Citations pill if > 0 */}
                    {pub.citations !== undefined && pub.citations > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {pub.citations} Citations
                      </span>
                    )}

                    {/* Google Scholar direct paper link */}
                    {pub.scholarUrl && (
                      <a
                        href={pub.scholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30 transition-all"
                        title="View on Google Scholar"
                      >
                        <span>Scholar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {/* Clickable DOI */}
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/30 transition-all"
                        title={`Open DOI: ${pub.doi}`}
                      >
                        <span>DOI: {pub.doi.length > 20 ? `${pub.doi.substring(0, 20)}...` : pub.doi}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {/* Copy BibTeX */}
                    <button
                      onClick={() => copyBibtex(pub)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-navy-800 transition-all"
                      title="Copy BibTeX Citation"
                    >
                      {copiedBibtexId === pub.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>BibTeX</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
