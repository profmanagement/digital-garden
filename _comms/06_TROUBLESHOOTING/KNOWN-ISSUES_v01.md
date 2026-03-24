# Known Issues — Quick Reference

Scan this list before writing or editing any shell/bash code. If a symptom matches, read the detail section before proceeding.

---

## Issue Index (quick scan)

| # | Symptom | Root cause | Fix |
|---|---------|------------|-----|
| 1 | `xargs: unmatched single quote` in GitHub Actions | `xargs` used for whitespace trimming breaks on apostrophes | Replace `xargs` with `sed` |
| 2 | File with spaces in name silently skipped in notes listing | `awk '{print $2}'` splits on whitespace, truncates path | Replace with `sed 's/^[^ ]* //'` |

---

## Issue Details

---

### Issue 1 — `xargs` breaks on apostrophes in field values

**Symptom:** GitHub Actions build fails with:
```
xargs: unmatched single quote; by default quotes are special to xargs unless you use the -0 option
```

**Root cause:** The `get_field` helper uses `xargs` to strip leading/trailing whitespace. `xargs` parses its input for shell quoting, so any apostrophe (e.g. `It's`, `don't`) in a YAML field value causes it to fail.

**Affected code pattern:**
```bash
grep -m1 "^$2:" "$1" | sed "s/^$2:[[:space:]]*//" | tr -d '"' | xargs
```

**Fix — replace `xargs` with `sed`:**
```bash
grep -m1 "^$2:" "$1" | sed "s/^$2:[[:space:]]*//" | tr -d '"' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'
```

**First occurred:** 2026-03-24 · triggered by note with `description: It's not a question of if software will break, but when.`

---

### Issue 2 — Filenames with spaces silently skipped in notes listing

**Symptom:** A new note exists in `content/en/notes/` but does not appear on the homepage index after deploy. No error is thrown — the note is silently dropped.

**Root cause:** The sort pipeline emits lines like:
```
2026-03-24 content/en/notes/We are all maintenance engineers now.md
```
Then `awk '{print $2}'` treats whitespace as a field delimiter, so `$2` is only `content/en/notes/We`. The resulting path doesn't exist, and `[ -f "$f" ] || continue` silently skips it.

**Affected code pattern:**
```bash
done | sort -rk1 | awk '{print $2}'
```

**Fix — strip only the leading date field:**
```bash
done | sort -rk1 | sed 's/^[^ ]* //'
```

**First occurred:** 2026-03-24 · triggered by note `We are all maintenance engineers now.md`

---

*Created: 2026-03-24 17:00:00 · v01*
