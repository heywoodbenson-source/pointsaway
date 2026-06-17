with open('src/PointsAway.jsx') as f:
    content = f.read()

content = content.replace(
    'API_URL = "https://api.anthropic.com/v1/messages";',
    'API_URL = "/api/chat";',
    1
)
print("Done:", '/api/chat' in content)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)