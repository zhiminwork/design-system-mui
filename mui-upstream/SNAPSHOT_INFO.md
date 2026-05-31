# MUI Upstream Snapshot

- **Source:** https://github.com/mui/material-ui
- **Version:** 9.0.1
- **Packages included:**
  - mui-material
  - mui-system
  - mui-utils
  - mui-private-theming
  - mui-styled-engine
  - mui-lab
  - mui-types

## Updating this snapshot

To pull a newer version of MUI:
1. Clone: `git clone --depth=1 https://github.com/mui/material-ui.git /tmp/mui-source`
2. Delete old packages: `rm -rf mui-upstream/mui-*`
3. Re-copy packages (see setup steps in repo root README)
4. Update the version in this file and commit
