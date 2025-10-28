# MCP Tools - Analytics and Registry Management

This directory contains tools for managing and analyzing MCP (Model Context Protocol) server usage across all your projects. The goal is to provide data-driven insights that help you make informed decisions about model fine-tuning, skill development, and workflow optimization.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Universal MCP Registry Setup](#universal-mcp-registry-setup)
- [Analytics Tool](#analytics-tool)
- [Usage Tracking](#usage-tracking)
- [Schemas](#schemas)
- [Examples](#examples)
- [Workflows](#workflows)

## Overview

### The Problem

When working with multiple LLMs and projects, you need to understand:
- Which MCP tools you actually use most often
- What patterns emerge in your workflows
- Where to focus optimization efforts
- What skills to develop or fine-tune models on

### The Solution

This toolkit provides:

1. **Universal MCP Registry** - Single source of truth for all MCP server configurations
2. **Security Wall** - Approval workflow for vetting new tools
3. **Usage Tracking** - Automatic logging of tool usage across projects
4. **Analytics Engine** - Aggregation and insights from usage data
5. **Toolkit System** - Project-specific tool combinations spawned from registry

## Quick Start

### 1. Initialize the Registry

```bash
./mcp-tools/analytics init
```

This creates the registry structure at `~/.mcp-registry/`:

```
~/.mcp-registry/
├── security-wall.json          # Approval rules
├── tools/
│   ├── pending/                # Awaiting review
│   ├── approved/               # Vetted tools
│   └── rejected/               # Failed security
├── toolkits/                   # Curated combinations
├── skills/                     # Evolved patterns
├── usage-logs/                 # Aggregated data
└── examples/                   # Usage examples
```

### 2. Configure MCP Servers

Create or edit `~/.claude.json`:

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "$HOME"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

This configuration works with:
- Claude Desktop (native GUI app)
- Claude Code CLI (terminal tool)
- Cline (VS Code extension)
- Other MCP-compatible tools

### 3. Track Usage in Your Projects

Create `mcp-usage.log` in each project to track tool usage. See [examples/mcp-usage.log](examples/mcp-usage.log) for format.

### 4. Aggregate and Analyze

```bash
# Aggregate data from all projects
./mcp-tools/analytics aggregate

# View comprehensive report
./mcp-tools/analytics report

# Show top 10 tools
./mcp-tools/analytics top 10

# Show usage patterns
./mcp-tools/analytics patterns
```

## Universal MCP Registry Setup

### Configuration Hierarchy

MCP servers can be configured at multiple levels:

1. **System Level**: `~/.claude.json` - Universal registry for all projects
2. **User Level**: `~/.config/claude/mcp.json` - User-specific overrides
3. **Project Level**: `.mcp.json` - Project-specific configurations

Projects can **spawn toolkits** from the registry rather than duplicating configurations.

### Example: Grant Writing Toolkit

Instead of copying MCP configs to every grant project:

**~/.claude.json** (Universal Registry):
```json
{
  "mcpServers": {
    "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem"] },
    "git": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-git"] },
    "puppeteer": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-puppeteer"] },
    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] }
  }
}
```

**~/.mcp-registry/toolkits/grant-writing.json** (Toolkit Definition):
```json
{
  "id": "grant-writing",
  "requiredTools": ["filesystem", "git"],
  "recommendedTools": ["puppeteer", "github"],
  "systemPrompt": "Grant writing workflow. No emojis in commits."
}
```

**Project .mcp-toolkit.json** (Spawned Configuration):
```json
{
  "toolkit": "grant-writing",
  "customizations": {
    "git": {
      "committer": "Captain Code <captaincode@bmoregrant.ai>"
    }
  }
}
```

### Security Wall

Before tools are available in the registry, they go through approval:

**~/.mcp-registry/security-wall.json**:
```json
{
  "approvalRules": {
    "requireManualReview": true,
    "trustedSources": ["@modelcontextprotocol/*", "@anthropic/*"],
    "blockedPatterns": ["*eval*", "*exec*", "*shell*"]
  }
}
```

**Workflow**:
1. New tool added to `tools/pending/`
2. Security review performed
3. Move to `tools/approved/` or `tools/rejected/`
4. Approved tools available to all projects

## Analytics Tool

The `analytics` CLI tool provides usage insights across all your projects.

### Commands

```bash
# Initialize registry structure
./mcp-tools/analytics init

# Scan for usage logs
./mcp-tools/analytics scan [path]

# Aggregate usage data
./mcp-tools/analytics aggregate [path]

# Display comprehensive report
./mcp-tools/analytics report

# Show top N tools
./mcp-tools/analytics top [N]

# Show usage patterns
./mcp-tools/analytics patterns

# Show help
./mcp-tools/analytics help
```

### Example Report Output

```
=================================================================
                   MCP Tool Usage Analytics
             Last Updated: 2025-10-28T16:30:00Z
          Total Projects: 3 | Total Events: 247
=================================================================

Top Tools by Usage:
-----------------------------------------------------------------
 1. git                   89 uses (36.0%)  ██████████████████
    Success rate:  98.9% | Projects: bmoregrant, youth-media

 2. filesystem            67 uses (27.1%)  █████████████
    Success rate: 100.0% | Projects: bmoregrant, youth-media, personal-site

 3. puppeteer             45 uses (18.2%)  █████████
    Success rate:  94.2% | Projects: bmoregrant, personal-site

=================================================================
Common Patterns:
-----------------------------------------------------------------
  • filesystem-write-then-git-commit: 45 occurrences
    Projects: bmoregrant, youth-media

  • html-edit-then-puppeteer-screenshot: 23 occurrences
    Projects: bmoregrant, personal-site

=================================================================
Insights:
-----------------------------------------------------------------
  ✓ Your top 3 tools (git, filesystem, puppeteer)
    account for 81.3% of all usage.
    Consider fine-tuning your model on these workflows.

  💡 Detected 12 usage patterns across projects.
    Consider creating composite skills for frequent patterns.

=================================================================
```

### Key Insights Provided

1. **Tool Usage**: Which tools you use most often
2. **Success Rates**: Reliability of each tool
3. **Pattern Detection**: Common workflow sequences
4. **Cross-Project Analysis**: What's used across multiple projects
5. **Optimization Opportunities**: Where to focus fine-tuning efforts

## Usage Tracking

### Automatic Tracking (Future)

Future versions will automatically log tool usage. For now, create logs manually.

### Manual Tracking

Create `mcp-usage.log` in your project root:

```json
{
  "project": "my-project",
  "toolkit": "web-development",
  "toolUsage": [
    {
      "timestamp": "2025-10-28T14:30:00Z",
      "tool": "filesystem",
      "action": "write",
      "context": "Updated homepage content",
      "success": true,
      "executionTime": 145
    }
  ],
  "patterns": [
    {
      "pattern": "edit-commit-push",
      "frequency": 12,
      "confidence": 0.95
    }
  ]
}
```

See [schemas/usage-log.json](schemas/usage-log.json) for complete schema.

## Schemas

JSON schemas for validation and documentation:

- **tool-definition.json** - MCP server tool definitions
- **usage-log.json** - Project usage log format

These schemas ensure consistency across all projects and enable automated validation.

## Examples

Complete examples provided:

- **mcp-usage.log** - Sample project usage log
- **tool-puppeteer.json** - Example tool definition
- **toolkit-grant-writing.json** - Example toolkit configuration

## Workflows

### Daily Workflow

```bash
# Morning: Start work on a project
cd ~/my-project

# Your LLM uses MCP servers from ~/.claude.json
# Usage is automatically logged to mcp-usage.log

# Evening: Review what you used
~/bmoregrant/mcp-tools/analytics aggregate
~/bmoregrant/mcp-tools/analytics report
```

### Weekly Workflow

```bash
# Review top tools
~/bmoregrant/mcp-tools/analytics top 10

# Check for emerging patterns
~/bmoregrant/mcp-tools/analytics patterns

# Make decisions:
# - Which tools to include in fine-tuned models
# - What skills to develop
# - Where to optimize workflows
```

### Adding New Tools

```bash
# 1. Add to pending
mkdir -p ~/.mcp-registry/tools/pending
cat > ~/.mcp-registry/tools/pending/newtool.json <<EOF
{
  "id": "newtool",
  "status": "pending",
  "definition": {
    "command": "npx",
    "args": ["-y", "@scope/newtool"]
  }
}
EOF

# 2. Security review (manual)
# Check source, dependencies, permissions

# 3. Approve
mv ~/.mcp-registry/tools/pending/newtool.json \
   ~/.mcp-registry/tools/approved/newtool.json

# Edit and set status to "approved"

# 4. Add to ~/.claude.json
# Now available to all projects
```

## Architecture Comparison

### Remote Container (Claude Code Web)

Current architecture (this session):

```
┌─────────────────────┐
│  Remote Container   │
│  (cloud_default)    │
│                     │
│  Captain Code runs  │
│  here in isolation  │
│                     │
│  Can access:        │
│  - Git repo clone   │
│  - GitHub via proxy │
│    (port 60006)     │
│                     │
│  Cannot access:     │
│  - Your local files │
│  - ~/.claude.json   │
└─────────────────────┘
```

### Local LLM Setup

How you would set this up locally:

```
┌──────────────────────────────────────┐
│  Your Local Machine                  │
│                                      │
│  ~/.claude.json ◄─── Universal MCP  │
│  ~/.mcp-registry/   Registry         │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ Local LLM (Ollama/LMStudio)    │ │
│  │ Reads ~/.claude.json           │ │
│  └────────────────────────────────┘ │
│             │                        │
│             ▼                        │
│  ┌────────────────────────────────┐ │
│  │ Project: ~/bmoregrant/         │ │
│  │ .mcp-toolkit.json (spawned)    │ │
│  │ mcp-usage.log (tracked)        │ │
│  └────────────────────────────────┘ │
│             │                        │
│             ▼                        │
│  ┌────────────────────────────────┐ │
│  │ GitHub (via git)               │ │
│  │ Push/pull directly             │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Use Cases

### 1. Model Fine-Tuning Decisions

**Question**: "What should I include when fine-tuning my local model?"

**Answer**: Run `analytics report` to see:
- You use `git` 247 times (34.2% of usage)
- You use `filesystem` 189 times (26.1%)
- You use `puppeteer` 98 times (13.6%)

**Decision**: Fine-tune on git and filesystem workflows first. Add puppeteer if model size permits.

### 2. Skill Development

**Question**: "What composite skills should I develop?"

**Answer**: Run `analytics patterns` to see:
- "edit-commit-screenshot" pattern appears 45 times
- "read-analyze-suggest" pattern appears 32 times

**Decision**: Create composite skills for these frequent sequences.

### 3. Workflow Optimization

**Question**: "Where are bottlenecks in my workflow?"

**Answer**: Check success rates in report:
- `puppeteer` has 94.2% success (6 failures)
- `fetch` has 67% success (high failure rate)

**Decision**: Investigate fetch failures. May need better error handling or different tool.

### 4. Context Optimization

**Question**: "What context should I prioritize?"

**Answer**: Cross-reference top tools with project types:
- Grant writing projects: heavy filesystem + git usage
- Web projects: add puppeteer + fetch
- Data projects: add database tools

**Decision**: Create project-type specific toolkits with relevant context.

## Installation for System-Wide Use

To use the analytics tool from anywhere:

```bash
# Create a symlink in your PATH
sudo ln -s /home/user/bmoregrant/mcp-tools/analytics /usr/local/bin/mcp-analytics

# Or add to your PATH in ~/.bashrc or ~/.zshrc
echo 'export PATH="$PATH:/home/user/bmoregrant/mcp-tools"' >> ~/.bashrc
source ~/.bashrc

# Now use from anywhere
mcp-analytics report
```

## Future Enhancements

Potential improvements:

1. **Automatic Usage Logging** - MCP middleware to auto-log all tool usage
2. **Pattern Recognition** - ML-based pattern detection
3. **Skill Evolution** - Automatic skill creation from patterns
4. **Dashboard UI** - Web-based analytics dashboard
5. **Cost Tracking** - Track API costs per tool
6. **Performance Profiling** - Identify slow tools
7. **Recommendation Engine** - Suggest tools for specific tasks

## Contributing

This is a working prototype. To improve it:

1. Add more example toolkits
2. Enhance pattern recognition
3. Improve security wall rules
4. Add visualization tools
5. Create auto-logging middleware

## License

Part of the bmoregrant project. Use freely for your own MCP analytics needs.

## Support

For questions or issues, see the main bmoregrant project README or open an issue on GitHub.

---

Built by Captain Code for data-driven MCP workflow optimization.
