#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd "${script_dir}/.." && pwd)"

find "${project_dir}/public/reelay.parts" -type f -name 'part-*' -print0 \
  | sort -z \
  | xargs -0 cat > "${project_dir}/public/reelay.html"

echo "Restored public/reelay.html"
