#!/usr/bin/env python3
"""
Automated Google Scholar & ResearchGate Publication Synchronizer
For Md. Al Emran's Portfolio Website.

Fetches publications, citation counts, h-index, and i10-index from
Google Scholar (ID: 6wAa7doAAAAJ) and links ResearchGate (ID: Md-Emran-12).
Updates src/data/initialData.ts and outputs src/data/scholarData.json.
"""

import sys
import os
import re
import json
import urllib.request
from datetime import datetime, timezone
from html import unescape

SCHOLAR_ID = "6wAa7doAAAAJ"
SCHOLAR_URL = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en&cstart=0&pagesize=100"
RESEARCHGATE_URL = "https://www.researchgate.net/profile/Md-Emran-12?ev=hdr_xprf"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE_DIR, "src", "data", "initialData.ts")
SCHOLAR_JSON = os.path.join(BASE_DIR, "src", "data", "scholarData.json")

def normalize_title(title: str) -> str:
    """Normalize a title for robust comparison (lowercase, alphanumeric only)."""
    return re.sub(r'[^a-z0-9]', '', title.lower())

def fetch_scholar_html() -> str:
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }
    req = urllib.request.Request(SCHOLAR_URL, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read().decode("utf-8", errors="ignore")

def parse_scholar_data(html: str):
    # Parse citation metrics
    # Format: [All citations, Since 2019, All h-index, Since 2019, All i10-index, Since 2019]
    metrics_matches = re.findall(r'<td class="gsc_rsb_std">([0-9]+)</td>', html)
    citations = int(metrics_matches[0]) if len(metrics_matches) > 0 else 0
    h_index = int(metrics_matches[2]) if len(metrics_matches) > 2 else 0
    i10_index = int(metrics_matches[4]) if len(metrics_matches) > 4 else 0

    # Parse publications
    rows = re.findall(r'<tr class="gsc_a_tr">(.*?)</tr>', html, re.DOTALL)
    papers = []
    
    for r in rows:
        title_m = re.search(r'<a[^>]*class="gsc_a_at"[^>]*>([^<]+)</a>', r)
        href_m = re.search(r'<a[^>]*href="([^"]+)"[^>]*class="gsc_a_at"', r)
        grays = re.findall(r'<div class="gs_gray">([^<]+)', r)
        cit_m = re.search(r'<a class="gsc_a_ac[^"]*"[^>]*>([0-9]+)</a>', r)
        yr_m = re.search(r'<span class="gsc_a_h[^"]*">([0-9]{4})</span>', r)

        if title_m:
            raw_title = unescape(title_m.group(1).strip())
            href = "https://scholar.google.com" + unescape(href_m.group(1)) if href_m else ""
            authors = unescape(grays[0].strip()) if len(grays) > 0 else "Md. Al Emran et al."
            venue = unescape(grays[1].strip()) if len(grays) > 1 else ""
            paper_citations = int(cit_m.group(1)) if cit_m else 0
            year = int(yr_m.group(1)) if yr_m else datetime.now().year

            # Determine category
            category = "Intelligent Systems & Activity Recognition"
            t_lower = raw_title.lower()
            if any(k in t_lower for k in ["power", "grid", "renewable", "solar", "energy", "inverter"]):
                category = "Smart Grids & Sustainable Power Systems"
            elif any(k in t_lower for k in ["retinal", "eye", "disease", "kidney", "wheat", "medical", "eeg", "ct scan", "mri"]):
                category = "Biomedical Engineering & Applied Machine Learning"
            elif any(k in t_lower for k in ["dwdm", "optical", "network", "telecom"]):
                category = "Optical Networks & DWDM Systems"

            # Determine publication type
            pub_type = "ieee_conference"
            v_lower = venue.lower()
            if any(k in v_lower for k in ["journal", "transactions", "cognitive neurodynamics", "springer", "elsevier", "ieee access"]):
                pub_type = "journal"

            papers.append({
                "title": raw_title,
                "authors": authors,
                "venue": venue or "IEEE International Conference",
                "year": year,
                "type": pub_type,
                "citations": paper_citations,
                "scholarUrl": href,
                "researchGateUrl": RESEARCHGATE_URL,
                "category": category,
            })

    return {
        "citations": citations,
        "hIndex": h_index,
        "i10Index": i10_index,
        "papers": papers,
    }

def update_initial_data(scholar_info):
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        return False

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Update Google Scholar & ResearchGate links if needed
    content = re.sub(
        r'googleScholar:\s*"[^"]*"',
        f'googleScholar: "https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"',
        content
    )
    content = re.sub(
        r'researchGate:\s*"[^"]*"',
        f'researchGate: "{RESEARCHGATE_URL}"',
        content
    )

    # Update metrics in content
    if scholar_info["citations"] > 0:
        content = re.sub(
            r'totalCitationsEstimate:\s*"[^"]*"',
            f'totalCitationsEstimate: "{scholar_info["citations"]}+"',
            content
        )

    # Extract existing publications from initialData.ts
    # Look for: export const initialPortfolioData: PortfolioData = { ... };
    # We can parse the publications block
    existing_titles_set = set()
    for m in re.finditer(r'title:\s*"([^"]+)"', content):
        existing_titles_set.add(normalize_title(m.group(1)))

    newly_added = []
    for p in scholar_info["papers"]:
        norm_t = normalize_title(p["title"])
        if norm_t not in existing_titles_set:
            newly_added.append(p)
            existing_titles_set.add(norm_t)

    print(f"Discovered {len(newly_added)} new papers from Google Scholar.")

    if newly_added:
        # Generate TypeScript object snippets for newly added papers
        snippets = []
        for idx, p in enumerate(newly_added):
            snippet = f"""      {{
        id: "pub-scholar-{int(datetime.now().timestamp())}-{idx}",
        title: {json.dumps(p["title"])},
        authors: {json.dumps(p["authors"])},
        venue: {json.dumps(p["venue"])},
        year: {p["year"]},
        type: {json.dumps(p["type"])},
        status: "published",
        category: {json.dumps(p["category"])},
        citations: {p["citations"]},
        scholarUrl: {json.dumps(p["scholarUrl"])},
        researchGateUrl: {json.dumps(p["researchGateUrl"])},
        abstract: "Indexed in Google Scholar profile of Md. Al Emran."
      }},"""
            snippets.append(snippet)

        insertion = "\n".join(snippets) + "\n"
        # Insert at the beginning of publications: [
        content = re.sub(
            r'(publications:\s*\[\s*)',
            r'\1\n' + insertion,
            content,
            count=1
        )

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    return len(newly_added) > 0

def main():
    print(f"Fetching Google Scholar profile for user={SCHOLAR_ID}...")
    try:
        html = fetch_scholar_html()
        print(f"Successfully fetched {len(html)} bytes of profile HTML.")
    except Exception as e:
        print(f"Error fetching Google Scholar: {e}")
        sys.exit(1)

    parsed = parse_scholar_data(html)
    print(f"Scholar Metrics: {parsed['citations']} Citations | h-index: {parsed['hIndex']} | i10-index: {parsed['i10Index']}")
    print(f"Found {len(parsed['papers'])} papers listed on Google Scholar.")

    # Save scholarData.json
    scholar_payload = {
        "lastSynced": datetime.now(timezone.utc).isoformat(),
        "scholarId": SCHOLAR_ID,
        "scholarUrl": f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en",
        "researchGateUrl": RESEARCHGATE_URL,
        "citations": parsed["citations"],
        "hIndex": parsed["hIndex"],
        "i10Index": parsed["i10Index"],
        "totalPapers": len(parsed["papers"]),
        "papers": parsed["papers"],
    }

    with open(SCHOLAR_JSON, "w", encoding="utf-8") as f:
        json.dump(scholar_payload, f, indent=2, ensure_ascii=False)
    print(f"Saved {SCHOLAR_JSON}")

    # Update initialData.ts
    has_new = update_initial_data(parsed)
    print("initialData.ts updated successfully.")
    print("Done!")

if __name__ == "__main__":
    main()
