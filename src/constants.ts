export const LANGUAGE_STORAGE_KEY = 'pavilion-locale'
export const BODHI_GITHUB_URL = 'https://github.com/bigduu/Bodhi-AI'
export const BODHI_RELEASES_URL = 'https://github.com/bigduu/Bodhi-AI/releases'
export const BODHI_LATEST_RELEASE_URL = 'https://github.com/bigduu/Bodhi-AI/releases/latest'

// Language-neutral tech tokens for the home-page marquee ticker (all real: bamboo=Rust,
// lotus=React/Vite, bodhi=Tauri, bodhi-server=Go/PostgreSQL, plus WebSocket,
// legacy SSE fallback, MCP, and workflow features).
export const techStack = [
  'Rust', 'React', 'Vite', 'Tauri', 'WebSocket', 'SSE fallback', 'MCP',
  'Workflow', 'Schedule', 'Local-first', 'TypeScript', 'Go', 'PostgreSQL',
]

export const quickstartCode = String.raw`# clone the public stack side-by-side
mkdir bodhi-stack && cd bodhi-stack
git clone https://github.com/bigduu/Bamboo-agent.git bamboo
git clone https://github.com/bigduu/Lotus.git lotus
git clone https://github.com/bigduu/Bodhi-AI.git bodhi

# terminal 1: bamboo runtime
cd bamboo
cargo run --bin bamboo -- serve --port 9562 --bind 127.0.0.1 --data-dir /tmp/bamboo-data

# terminal 2: lotus ui
cd ../lotus
npm install
npm run dev

# terminal 3: bodhi desktop shell
cd ../bodhi
npm install
npm run tauri:dev`

export const repoGuideCode = String.raw`Bodhi   https://github.com/bigduu/Bodhi-AI
Lotus   https://github.com/bigduu/Lotus
Bamboo  https://github.com/bigduu/Bamboo-agent
Pavilion  https://github.com/bigduu/Pavilion
Bodhi Server  https://github.com/bigduu/bodhi-server
Jiandu  https://github.com/bigduu/Jiandu
Nova  https://github.com/bigduu/Nova
Lotus Next  https://github.com/bigduu/lotus-next
Magpie  https://github.com/bigduu/Magpie`

export const apiCode = String.raw`# core runtime
POST /api/v1/chat
POST /api/v1/execute/{session_id}
POST /api/v1/stop/{session_id}
GET  /api/v1/history/{session_id}

# realtime: one shared WebSocket is the default
GET  /v2/stream

# legacy realtime: initial-connect fallback or explicit opt-out only
GET  /api/v1/stream
GET  /api/v1/events/{session_id}

# sessions and schedules
GET|POST          /api/v1/sessions
PATCH|DELETE      /api/v1/sessions/{session_id}
GET|POST          /api/v1/schedules
PATCH|DELETE      /api/v1/schedules/{schedule_id}
POST              /api/v1/schedules/{schedule_id}/run
GET               /api/v1/schedules/{schedule_id}/sessions

# mcp
GET|POST          /api/v1/mcp/servers
POST              /api/v1/mcp/servers/import
POST              /api/v1/mcp/servers/{id}/connect
POST              /api/v1/mcp/servers/{id}/disconnect
POST              /api/v1/mcp/servers/{id}/refresh
GET               /api/v1/mcp/tools

# provider-compatible prefixes
POST /openai/v1/chat/completions
POST /openai/v1/responses
POST /anthropic/v1/messages
POST /gemini/v1beta/models/{model}:generateContent`
