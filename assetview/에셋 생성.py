import os
import json

ASSETS_DIR = "assets"

paths = []
for root, dirs, files in os.walk(ASSETS_DIR):
    for file in files:
        if file.endswith('.png') or file.endswith('.wav'):
            rel_path = os.path.relpath(os.path.join(root, file), ASSETS_DIR)
            rel_path = rel_path.replace('\\', '/')
            paths.append(rel_path)

with open('assets_list.json', 'w', encoding='utf-8') as f:
    json.dump(paths, f, ensure_ascii=False, indent=2)

print(f"총 {len(paths)}개의 에셋 목록이 assets_list.json에 성공적으로 저장되었습니다!")