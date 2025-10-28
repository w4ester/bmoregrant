#!/usr/bin/env bash

# MCP Registry Setup Script
# Initializes the universal MCP registry for use across all projects and LLMs

set -euo pipefail

REGISTRY_DIR="${HOME}/.mcp-registry"
CLAUDE_CONFIG="${HOME}/.claude.json"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}MCP Registry Setup${NC}"
echo "This script will set up a universal MCP registry at ${REGISTRY_DIR}"
echo ""

# Check if registry already exists
if [[ -d "${REGISTRY_DIR}" ]]; then
    echo -e "${YELLOW}Warning: Registry already exists at ${REGISTRY_DIR}${NC}"
    read -p "Do you want to continue? This will preserve existing files. (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Initialize registry using analytics tool
echo -e "${BLUE}Initializing registry structure...${NC}"
./analytics init

# Create example tool definitions
echo -e "${BLUE}Creating example tool definitions...${NC}"

mkdir -p "${REGISTRY_DIR}/tools/approved"

# Filesystem tool
cat > "${REGISTRY_DIR}/tools/approved/filesystem.json" <<'EOF'
{
  "id": "filesystem",
  "status": "approved",
  "definition": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
  },
  "metadata": {
    "name": "Filesystem Access",
    "description": "Read and write files in the project directory",
    "category": "filesystem",
    "tags": ["file", "read", "write", "directory"]
  },
  "security": {
    "approvedBy": "user",
    "approvedAt": "2025-10-28T00:00:00Z",
    "securityNotes": "Official MCP server. Scoped to project directory for safety."
  }
}
EOF

# Git tool
cat > "${REGISTRY_DIR}/tools/approved/git.json" <<'EOF'
{
  "id": "git",
  "status": "approved",
  "definition": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-git"]
  },
  "metadata": {
    "name": "Git Version Control",
    "description": "Git operations for version control",
    "category": "vcs",
    "tags": ["git", "version-control", "commit", "push"]
  },
  "security": {
    "approvedBy": "user",
    "approvedAt": "2025-10-28T00:00:00Z",
    "securityNotes": "Official MCP server. Safe for git operations."
  }
}
EOF

echo -e "${GREEN}✓ Example tools created${NC}"

# Check if ~/.claude.json exists
if [[ -f "${CLAUDE_CONFIG}" ]]; then
    echo -e "${YELLOW}~/.claude.json already exists${NC}"
    echo "Please manually add MCP servers to your existing configuration."
    echo ""
    echo "Example configuration to add:"
    cat <<'EOF'

{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "$HOME"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
EOF
else
    echo -e "${BLUE}Creating ~/.claude.json...${NC}"
    cat > "${CLAUDE_CONFIG}" <<'EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "$HOME"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  },
  "globalSettings": {
    "autoLoadMCP": true,
    "defaultTimeout": 30000
  }
}
EOF
    echo -e "${GREEN}✓ Created ~/.claude.json${NC}"
fi

# Create example toolkit
echo -e "${BLUE}Creating example toolkit...${NC}"

mkdir -p "${REGISTRY_DIR}/toolkits"

cat > "${REGISTRY_DIR}/toolkits/basic-development.json" <<'EOF'
{
  "id": "basic-development",
  "name": "Basic Development Toolkit",
  "description": "Essential tools for software development",
  "requiredTools": ["filesystem", "git"],
  "recommendedTools": [],
  "systemPrompt": "You are a development assistant. Use filesystem for file operations and git for version control."
}
EOF

echo -e "${GREEN}✓ Example toolkit created${NC}"

# Add analytics to PATH suggestion
echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "Registry location: ${REGISTRY_DIR}"
echo "Claude config: ${CLAUDE_CONFIG}"
echo ""
echo "Next steps:"
echo ""
echo "1. Review and customize ~/.claude.json with your MCP servers"
echo ""
echo "2. Add analytics tool to your PATH:"
echo "   echo 'export PATH=\"\$PATH:$(pwd)\"' >> ~/.bashrc"
echo "   source ~/.bashrc"
echo ""
echo "3. Start tracking usage in your projects by creating mcp-usage.log files"
echo ""
echo "4. Aggregate and view analytics:"
echo "   ./analytics aggregate"
echo "   ./analytics report"
echo ""
echo "For more information, see mcp-tools/README.md"
