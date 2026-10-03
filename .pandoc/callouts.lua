-- callouts.lua — render Obsidian callouts (> [!type] Title) as styled divs

local function split_marker(inlines)
  local first = inlines[1]
  if not first or first.t ~= "Str" then return nil end
  local kind = first.text:match("^%[!([%w%-]+)%]$")
  if not kind then return nil end
  return kind:lower()
end

function BlockQuote(el)
  local first = el.content[1]
  if not first or (first.t ~= "Para" and first.t ~= "Plain") then return nil end
  local kind = split_marker(first.content)
  if not kind then return nil end

  local title, body = pandoc.List(), pandoc.List()
  local in_title = true
  for i = 2, #first.content do
    local inl = first.content[i]
    if in_title and (inl.t == "SoftBreak" or inl.t == "LineBreak") then
      in_title = false
    elseif in_title then
      title:insert(inl)
    else
      body:insert(inl)
    end
  end
  while #title > 0 and title[1].t == "Space" do title:remove(1) end
  if #title == 0 then title:insert(pandoc.Str(kind:sub(1, 1):upper() .. kind:sub(2))) end

  local blocks = pandoc.List()
  blocks:insert(pandoc.Div({ pandoc.Para(title) }, pandoc.Attr("", { "callout-title" })))
  if #body > 0 then blocks:insert(pandoc.Para(body)) end
  for i = 2, #el.content do blocks:insert(el.content[i]) end
  return pandoc.Div(blocks, pandoc.Attr("", { "callout", "callout-" .. kind }))
end
