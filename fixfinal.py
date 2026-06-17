with open('src/PointsAway.jsx') as f:
    content = f.read()

# Line 1787 closes the detail panel div, line 1788 closes outer div
# We need to add } after line 1787's </div> to close the conditional
old = '      </div>\n    </div>\n  );\n}\n\n// ─── TRANSFER BONUS TRACKER'
new = '      </div>}\n    </div>\n  );\n}\n\n// ─── TRANSFER BONUS TRACKER'
c = content.count(old)
content = content.replace(old, new, 1)
print(f"Fixed closing brace: {c}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)