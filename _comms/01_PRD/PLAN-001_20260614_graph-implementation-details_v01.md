# PLAN-001: Graph View Implementation Details

**Refs:** TASK-001, PRD-001  
**Status:** Design Phase  
**Technical Scope:** Architecture, data structures, build integration

---

## Architecture Overview

```
Build Time (GitHub Actions):
  Parse markdown → Extract wikilinks → Build graph JSON
  
Runtime (Browser):
  Load graph.json → Render with Vis.js → Click to navigate
```

---

## 1. Wikilink Parser (Bash)

### Extraction Logic

```bash
extract_wikilinks() {
  local file="$1"
  local source_slug=$(basename "${file%.md}")
  
  # Extract [[...]] patterns
  grep -oE '\[\[[^]]+\]\]' "$file" | \
    sed 's/\[\[//;s/\]\]//' | \
    while read link; do
      # Skip external links
      [[ "$link" =~ ^http ]] && continue
      [[ "$link" =~ \.(pdf|docx)$ ]] && continue
      
      # Extract slug (before | and #)
      target="${link%%|*}"
      target="${target%%#*}"
      
      echo "$source_slug $target"
    done
}
```

---

## 2. Graph Data Structure

```json
{
  "nodes": [
    {
      "id": "20260614_slug",
      "label": "Note Title",
      "category": "PKM",
      "type": "evergreen",
      "url": "20260614_slug.html"
    }
  ],
  "links": [
    {"source": "20260614_a", "target": "20260614_b"}
  ]
}
```

---

## 3. Graph Generation (GitHub Actions)

Add to deploy.yml after note generation:

```bash
generate_graph() {
  local lang="$1"
  local graph_file="_site/${lang}/graph-data.json"
  
  # Collect note metadata
  declare -A notes
  for f in content/${lang}/notes/*.md; do
    slug=$(basename "${f%.md}")
    title=$(grep "^title:" "$f" | sed 's/^title:[[:space:]]*//' | tr -d '"')
    category=$(grep "^category:" "$f" | sed 's/^category:[[:space:]]*//' | tr -d '"')
    type=$(grep "^type:" "$f" | sed 's/^type:[[:space:]]*//' | tr -d '"')
    status=$(grep "^status:" "$f" | sed 's/^status:[[:space:]]*//' | tr -d '"')
    
    [ "$status" = "draft" ] && continue
    notes["$slug"]="$title|$category|$type"
  done
  
  # Build JSON
  {
    echo "{\"nodes\": ["
    first=true
    for slug in "${!notes[@]}"; do
      IFS='|' read -r title category type <<< "${notes[$slug]}"
      [[ "$first" == true ]] || echo ","
      printf '{\"id\": \"%s\", \"label\": \"%s\", \"category\": \"%s\", \"type\": \"%s\", \"url\": \"%s.html\"}' \
        "$slug" "$title" "$category" "$type" "$slug"
      first=false
    done
    echo "], \"links\": ["
    
    # Extract links from all notes
    first=true
    for f in content/${lang}/notes/*.md; do
      slug=$(basename "${f%.md}")
      status=$(grep "^status:" "$f" | sed 's/^status:[[:space:]]*//' | tr -d '"')
      [ "$status" = "draft" ] && continue
      
      extract_wikilinks "$f" | while read source target; do
        [[ -n "${notes[$target]}" ]] || continue
        [[ "$first" == true ]] || echo ","
        printf '{\"source\": \"%s\", \"target\": \"%s\"}' "$source" "$target"
        first=false
      done
    done
    echo "]}"
  } > "$graph_file"
}

generate_graph "en"
generate_graph "de"
```

---

## 4. Frontend: Vis.js Integration

### HTML Template (add to note footer)

```html
<button id="graph-btn" class="graph-btn" title="Show graph">📊 Graph</button>

<div id="graph-modal" class="graph-modal" style="display:none;">
  <div class="graph-container">
    <div id="graph-network"></div>
    <div class="graph-legend">
      <p><span class="dot seedling">●</span> Seedling</p>
      <p><span class="dot growing">●</span> Growing</p>
      <p><span class="dot evergreen">●</span> Evergreen</p>
    </div>
  </div>
  <button id="graph-close" class="graph-close">✕</button>
</div>
```

### JavaScript (graph-init.js)

```javascript
(function() {
  const currentSlug = document.body.dataset.slug || '';
  const btn = document.getElementById('graph-btn');
  const modal = document.getElementById('graph-modal');
  const closeBtn = document.getElementById('graph-close');
  
  async function initGraph() {
    const res = await fetch('graph-data.json');
    const data = await res.json();
    
    const nodes = new vis.DataSet(
      data.nodes.map(n => ({
        id: n.id,
        label: n.label,
        color: n.category === 'PKM' ? '#4a8a7e' : '#999',
        font: { size: currentSlug === n.id ? 18 : 14 },
        borderWidth: currentSlug === n.id ? 3 : 1
      }))
    );
    
    const edges = new vis.DataSet(data.links);
    const network = new vis.Network(
      document.getElementById('graph-network'),
      { nodes, edges },
      { physics: true }
    );
    
    network.on('click', e => {
      if (e.nodes.length) {
        const node = data.nodes.find(n => n.id === e.nodes[0]);
        if (node) window.location.href = node.url;
      }
    });
  }
  
  btn?.addEventListener('click', () => {
    modal.style.display = 'flex';
    initGraph();
  });
  
  closeBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
})();
```

---

## 5. CSS Styling

```css
.graph-btn {
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  text-decoration: none;
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.graph-btn:hover {
  color: var(--text);
}

.graph-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.graph-container {
  background: var(--bg);
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

#graph-network {
  flex: 1;
}

.graph-legend {
  padding: 0.75rem 1rem;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 1.5rem;
  font-size: 0.8rem;
}

.graph-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .graph-container { height: 80vh; }
  .graph-legend { flex-direction: column; }
}
```

---

## 6. Implementation Steps

### Step 1: Wikilink Parser (15 min)
- Add `extract_wikilinks()` bash function to deploy.yml
- Test on 2-3 notes manually

### Step 2: Graph Generation (30 min)
- Add `generate_graph()` function to deploy.yml
- Generate JSON files for EN and DE
- Validate JSON output with `jq`

### Step 3: Frontend Integration (30 min)
- Add HTML button and modal to note footer template
- Add CSS styling to style.css
- Create graph-init.js with Vis.js code

### Step 4: Vis.js Library (10 min)
- Add CDN link to note footer HTML
- OR host locally in _site/

### Step 5: Testing & Optimization (15 min)
- Test on 5+ notes
- Check mobile responsiveness
- Verify console for errors

---

## 7. Files to Modify/Create

| File | Action |
|------|--------|
| `.github/workflows/deploy.yml` | Add graph generation + Vis.js CDN |
| `style.css` | Add graph styling |
| `_site/graph-init.js` | Create initialization script |
| `_site/en/graph-data.json` | Generated |
| `_site/de/graph-data.json` | Generated |

---

## 8. Edge Cases

- Skip `[[http://...]]` links
- Skip `[[file.pdf]]` references  
- Skip `[[slug#anchor]]` (use slug only)
- Skip `[[slug\|label]]` (use slug only)
- Exclude draft notes
- Skip non-existent target notes

---

## 9. Build Time Impact

Estimated: **+1-2 seconds** per build

---

## 10. Success Criteria

✅ Graph renders without errors  
✅ Node clicks navigate correctly  
✅ Current note highlighted  
✅ Mobile responsive  
✅ <1s load time  

---

*Created: 2026-06-14 22:40:00 · v01*
