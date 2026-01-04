# D&D 3D Explainer with React Three Fiber

An interactive 3D visual guide to Dungeons & Dragons, built with the modern "wow" stack for web graphics.

![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-black?style=for-the-badge&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎮 Features

- **3D Floating Dice** — All the sacred polyhedra (d4, d6, d8, d12, d20) rendered as actual 3D meshes
- **Interactive Dice Rolling** — Click to roll with spinning animation
- **Particle Systems** — Magic sparkle effects using Drei's `<Sparkles>`
- **Star Field Background** — Procedural star background
- **Orbit Controls** — Drag to rotate camera around the scene
- **Distortion Materials** — Metallic, slightly morphing surfaces
- **Smooth UI Animations** — Framer Motion for all transitions

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/kunalnano/dnd-r3f-explainer.git
cd dnd-r3f-explainer

# Install dependencies
npm install

# Run dev server
npm run dev
```

Opens at `http://localhost:5173`

## 🛠 Tech Stack

| Library | Purpose | Why It's Great |
|---------|---------|----------------|
| **React Three Fiber** | React renderer for Three.js | Write 3D scenes as JSX components |
| **Drei** | R3F helper components | Pre-built Float, Stars, Sparkles, OrbitControls, etc. |
| **Three.js** | 3D graphics engine | The foundation — WebGL abstraction |
| **Framer Motion** | UI animations | Declarative animations with `<motion.div>` |
| **Tailwind CSS** | Styling | Utility-first CSS |
| **Vite** | Build tool | Fast HMR, ESM-native bundling |

## 📁 Project Structure

```
dnd-r3f-project/
├── src/
│   ├── App.jsx          # Main component with 3D scene + UI
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind imports + base styles
├── index.html           # HTML shell
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS for Tailwind
```

## 🎲 Key Concepts: React Three Fiber

### The Canvas

Everything 3D lives inside `<Canvas>`:

```jsx
import { Canvas } from '@react-three/fiber'

<Canvas>
  {/* 3D stuff goes here */}
</Canvas>
```

### Meshes = Geometry + Material

```jsx
<mesh position={[0, 0, 0]}>
  <icosahedronGeometry args={[0.8]} />  {/* Shape */}
  <meshStandardMaterial color="red" />   {/* Surface */}
</mesh>
```

### useFrame = Animation Loop

```jsx
import { useFrame } from '@react-three/fiber'

function SpinningCube() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += 0.01
  })
  
  return <mesh ref={meshRef}>...</mesh>
}
```

### Drei Helpers

Drei provides tons of pre-built components:

```jsx
import { Float, Stars, Sparkles, OrbitControls } from '@react-three/drei'

// Floating animation
<Float speed={2} rotationIntensity={0.5}>
  <mesh>...</mesh>
</Float>

// Star background
<Stars radius={100} count={3000} />

// Particle effects
<Sparkles count={200} scale={10} color="purple" />

// Mouse camera control
<OrbitControls enableZoom={false} autoRotate />
```

## 🎨 Dice Geometries in Three.js

| Dice | Three.js Geometry | Faces |
|------|-------------------|-------|
| d4 | `TetrahedronGeometry` | 4 triangles |
| d6 | `BoxGeometry` | 6 squares |
| d8 | `OctahedronGeometry` | 8 triangles |
| d12 | `DodecahedronGeometry` | 12 pentagons |
| d20 | `IcosahedronGeometry` | 20 triangles |

## 🔧 Extending This Project

### Add Physics-Based Dice Rolling

```bash
npm install @react-three/rapier
```

```jsx
import { Physics, RigidBody } from '@react-three/rapier'

<Physics>
  <RigidBody type="dynamic">
    <mesh>
      <icosahedronGeometry />
      <meshStandardMaterial />
    </mesh>
  </RigidBody>
</Physics>
```

### Add Post-Processing Effects

```bash
npm install @react-three/postprocessing
```

```jsx
import { EffectComposer, Bloom } from '@react-three/postprocessing'

<EffectComposer>
  <Bloom luminanceThreshold={0.5} intensity={1.5} />
</EffectComposer>
```

### Add 3D Text

```jsx
import { Text3D, Center } from '@react-three/drei'

<Center>
  <Text3D font="/fonts/helvetiker_regular.typeface.json">
    Roll for Initiative
    <meshStandardMaterial color="gold" />
  </Text3D>
</Center>
```

## 📚 Learning Resources

- **React Three Fiber Docs**: https://docs.pmnd.rs/react-three-fiber
- **Drei (R3F Helpers)**: https://github.com/pmndrs/drei
- **Three.js Fundamentals**: https://threejs.org/manual/
- **Bruno Simon's Course**: https://threejs-journey.com (paid, but excellent)
- **Framer Motion**: https://www.framer.com/motion/

## 🎯 Why This Stack?

**React Three Fiber** is the cutting-edge way to do 3D on the web because:

1. **Declarative** — Write 3D scenes as React components, not imperative code
2. **Ecosystem** — Hooks, state management, component libraries all work
3. **Performance** — Automatic render loop optimization, pointer events, etc.
4. **Drei** — Massive library of pre-built helpers (Float, Sparkles, etc.)
5. **Rapier** — Easy physics integration

**Compared to alternatives:**

| Approach | Pros | Cons |
|----------|------|------|
| Raw Three.js | Full control | Verbose, imperative |
| React Three Fiber | Declarative, React ecosystem | Learning curve |
| Babylon.js | Built-in features | Different paradigm |
| PlayCanvas | Editor-based | Less code-first |
| Spline | Visual tool | Less flexible |

## 📝 License

MIT — do whatever you want with it.

---

Built with 🎲 by exploring the intersection of gaming and web tech.
