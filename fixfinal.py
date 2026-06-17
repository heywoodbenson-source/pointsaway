with open('src/PointsAway.jsx') as f:
    content = f.read()

# Fix: only match city context when a specific destination is selected
old = 'const match = Object.keys(CITY_GUIDES).find(c=>form.destination?.toLowerCase().includes(c.toLowerCase())||c.toLowerCase().includes(form.destination?.toLowerCase()));'
new = 'const match = form.destination ? Object.keys(CITY_GUIDES).find(c=>form.destination?.toLowerCase().includes(c.toLowerCase())||c.toLowerCase().includes(form.destination?.toLowerCase())) : null;'
c = content.count(old)
content = content.replace(old, new, 1)
print(f"Match fix: {c}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)