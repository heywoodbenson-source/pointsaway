with open('src/PointsAway.jsx') as f:
    content = f.read()

fixes = [
    # Fix 1: Tracker detail panel - flex column, hidden until tapped
    (
        'flex:1,overflowY:"auto",padding:isMobile?"14px 16px":"22px 26px",display:!showDetail&&isMobile?"none":"block"',
        'flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 26px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column"'
    ),
    # Fix 2: Transfer sidebar - proper flex sizing
    (
        'display:showDetail&&isMobile?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",maxHeight:isMobile?"45%":"100%"',
        'display:showDetail&&isMobile?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",flex:isMobile?"1 0 auto":"0 0 260px"'
    ),
    # Fix 3: Transfer detail panel - flex column, hidden until tapped
    (
        'padding:isMobile?"14px 16px":"22px 28px",display:!showDetail&&isMobile?"none":"block"',
        'padding:isMobile?"16px":"22px 28px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column"'
    ),
    # Fix 4: Trip Planner - show placeholder when no destination selected
    (
        'placeholder="Where to?"',
        'placeholder="Suggest based on my points"'
    ),
    # Fix 5: City grid - single column on mobile
    (
        'gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))"',
        'gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(280px,1fr))"'
    ),
    # Fix 6: City grid - less padding on mobile
    (
        'padding:"32px 36px"',
        'padding:isMobile?"16px":"32px 36px"'
    ),
]

results = []
for old, new in fixes:
    count = content.count(old)
    content = content.replace(old, new, 1)
    results.append((count, old[:50]))

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)

for count, label in results:
    print(f"  {'✓' if count > 0 else '✗'} {label[:50]}")
print("Done")
