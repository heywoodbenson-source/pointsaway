with open('src/PointsAway.jsx') as f:
    content = f.read()

old = 'const PLANNER_SYSTEM = `You are an expert family travel planner specializing in points & miles and food-focused travel. When given trip details, provide exactly these 4 sections with these exact headers:'
new = 'const PLANNER_SYSTEM = `You are an expert family travel planner specializing in points & miles and food-focused travel. When the destination is "suggest based on points", recommend 3 diverse destinations that make sense for the traveler\'s points programs and interests — do NOT default to Charleston or any single city. When given trip details, provide exactly these 4 sections with these exact headers:'
c = content.count(old)
content = content.replace(old, new, 1)
print(f"System prompt updated: {c}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)