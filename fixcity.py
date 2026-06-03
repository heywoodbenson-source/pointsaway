with open('src/PointsAway.jsx') as f:
    content = f.read()

content = content.replace(
    'function CityGuides({ onPlanTrip })',
    'function CityGuides({ onPlanTrip, isMobile })',
    1
)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)

print("Fixed:", 'function CityGuides({ onPlanTrip, isMobile })' in content)
