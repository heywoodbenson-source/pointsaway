with open('src/PointsAway.jsx') as f:
    content = f.read()

import re
# Find all function components and check if they use isMobile without receiving it as a prop
functions = list(re.finditer(r'function (\w+)\(', content))
for i, m in enumerate(functions):
    name = m.group(1)
    start = m.start()
    end = functions[i+1].start() if i+1 < len(functions) else len(content)
    block = content[start:end]
    uses_mobile = 'isMobile' in block
    has_prop = 'isMobile' in block[:100]  # in function signature
    if uses_mobile and not has_prop:
        print(f"MISSING isMobile prop: {name}")
