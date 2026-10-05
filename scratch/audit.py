import os
import json

base_dir = r"c:\Users\it\Desktop\My projects\Website for a company"

results = []
for item in os.listdir(base_dir):
    full_path = os.path.join(base_dir, item)
    if os.path.isdir(full_path):
        has_git = os.path.exists(os.path.join(full_path, ".git"))
        has_pkg = os.path.exists(os.path.join(full_path, "package.json"))
        has_index = os.path.exists(os.path.join(full_path, "index.html"))
        
        # Check subfolder index.html if any (e.g. dist/index.html or build/index.html or public/index.html)
        has_dist_index = os.path.exists(os.path.join(full_path, "dist", "index.html"))
        has_build_index = os.path.exists(os.path.join(full_path, "build", "index.html"))
        has_public_index = os.path.exists(os.path.join(full_path, "public", "index.html"))

        pkg_framework = None
        if has_pkg:
            try:
                with open(os.path.join(full_path, "package.json"), "r", encoding="utf-8") as f:
                    pkg_data = json.load(f)
                    deps = {**pkg_data.get("dependencies", {}), **pkg_data.get("devDependencies", {})}
                    if "react" in deps:
                        pkg_framework = "React"
                    elif "vue" in deps:
                        pkg_framework = "Vue"
                    elif "vite" in deps:
                        pkg_framework = "Vite"
                    else:
                        pkg_framework = "Node/npm"
            except Exception as e:
                pkg_framework = "Error parsing pkg"

        results.append({
            "folder": item,
            "has_git": has_git,
            "has_pkg": has_pkg,
            "framework": pkg_framework,
            "has_index": has_index,
            "has_dist_index": has_dist_index,
            "has_build_index": has_build_index,
            "has_public_index": has_public_index
        })

print(json.dumps(results, indent=2))
