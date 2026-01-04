import React, { useState, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Float, 
  Text3D, 
  Center,
  Sparkles,
  Stars,
  MeshDistortMaterial,
  Environment,
  PerspectiveCamera,
  Html
} from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// D4 - Tetrahedron
function D4({ position, color = "#10b981" }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.015
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <tetrahedronGeometry args={[0.7]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.1} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

// D6 - Cube
function D6({ position, color = "#3b82f6" }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.008
    meshRef.current.rotation.y += 0.012
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.8 + 1) * 0.2
  })

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <MeshDistortMaterial color={color} speed={3} distort={0.05} metalness={0.7} roughness={0.3} />
      </mesh>
    </Float>
  )
}

// D8 - Octahedron
function D8({ position, color = "#a855f7" }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.012
    meshRef.current.rotation.y += 0.01
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2.2 + 2) * 0.2
  })

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} castShadow>
        <octahedronGeometry args={[0.7]} />
        <MeshDistortMaterial color={color} speed={2.5} distort={0.08} metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  )
}

// D12 - Dodecahedron
function D12({ position, color = "#f97316" }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.009
    meshRef.current.rotation.y += 0.014
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.6 + 3) * 0.2
  })

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} castShadow>
        <dodecahedronGeometry args={[0.7]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.06} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

// D20 - Icosahedron (The Big One)
function D20({ position, color = "#ef4444", isRolling = false, scale = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    const speed = isRolling ? 0.15 : 0.01
    meshRef.current.rotation.x += speed
    meshRef.current.rotation.y += speed * 1.3
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + 4) * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={isRolling ? 2 : 0.4} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow scale={scale}>
        <icosahedronGeometry args={[0.8]} />
        <MeshDistortMaterial 
          color={color} 
          speed={isRolling ? 10 : 2} 
          distort={isRolling ? 0.3 : 0.1} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
    </Float>
  )
}

// Magic Particles
function MagicParticles({ count = 200, visible = true }) {
  if (!visible) return null
  
  return (
    <>
      <Sparkles count={count} scale={15} size={3} speed={0.4} color="#a855f7" />
      <Sparkles count={count / 2} scale={12} size={2} speed={0.6} color="#3b82f6" />
      <Sparkles count={count / 3} scale={10} size={4} speed={0.3} color="#f97316" />
    </>
  )
}

// 3D Scene
function Scene({ activeTab, isRolling }) {
  const showDice = activeTab === 2
  const showMagic = activeTab === 4 || activeTab === 0
  const diceScale = showDice ? 1.3 : 0.8
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#a855f7" />
      
      {/* Background */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Dice */}
      <group scale={diceScale}>
        <D4 position={[-4, 0, 0]} />
        <D6 position={[-2, 0.5, 0]} />
        <D8 position={[0, 0, 0]} />
        <D12 position={[2, 0.5, 0]} />
        <D20 position={[4, 0, 0]} isRolling={isRolling} scale={1.2} />
      </group>
      
      {/* Magic particles */}
      <MagicParticles count={300} visible={showMagic} />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  )
}

// UI Components
function TabButton({ active, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
        active 
          ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-orange-500/30' 
          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

function ContentPanel({ activeTab, diceResult, isRolling, onRoll }) {
  const classes = [
    { name: 'Fighter', color: '#ef4444', icon: '⚔️', desc: 'Masters of martial combat' },
    { name: 'Wizard', color: '#a855f7', icon: '🔮', desc: 'Scholarly magic users' },
    { name: 'Rogue', color: '#6b7280', icon: '🗡️', desc: 'Stealthy skill experts' },
    { name: 'Cleric', color: '#eab308', icon: '✨', desc: 'Divine healers & warriors' },
  ]

  const abilities = [
    { name: 'STR', full: 'Strength', color: '#ef4444' },
    { name: 'DEX', full: 'Dexterity', color: '#22c55e' },
    { name: 'CON', full: 'Constitution', color: '#f97316' },
    { name: 'INT', full: 'Intelligence', color: '#3b82f6' },
    { name: 'WIS', full: 'Wisdom', color: '#06b6d4' },
    { name: 'CHA', full: 'Charisma', color: '#ec4899' },
  ]

  const panels = {
    0: (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">What is D&D?</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '🎭', title: 'Collaborative Story', desc: 'Players create characters together' },
            { icon: '🧙', title: 'Dungeon Master', desc: 'One person runs the world' },
            { icon: '🎲', title: 'Dice + Fate', desc: 'Random chance meets skill' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="bg-slate-700/50 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(100, 100, 255, 0.2)' }}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-sm">{item.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="bg-slate-700/30 rounded-xl p-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-slate-300">
            <span className="text-blue-400">DM describes</span> → 
            <span className="text-green-400"> Players act</span> → 
            <span className="text-yellow-400"> Roll dice</span> → 
            <span className="text-purple-400"> DM narrates</span>
          </p>
        </motion.div>
      </div>
    ),
    1: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Build Your Character</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2 text-green-400">① Choose Class</h3>
            {classes.map((cls, i) => (
              <motion.div 
                key={cls.name} 
                className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-2 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-xl">{cls.icon}</span>
                <div>
                  <span className="font-medium" style={{ color: cls.color }}>{cls.name}</span>
                  <p className="text-xs text-slate-400">{cls.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div>
            <h3 className="font-bold mb-2 text-blue-400">② Six Abilities</h3>
            <div className="grid grid-cols-2 gap-2">
              {abilities.map((ab, i) => (
                <motion.div 
                  key={ab.name} 
                  className="bg-slate-700/50 rounded-lg p-2 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded" 
                    style={{ backgroundColor: ab.color, color: '#000' }}
                  >
                    {ab.name}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{ab.full}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">The Sacred Polyhedra</h2>
        <p className="text-slate-400 text-sm">The glowing dice behind you are your tools of fate</p>
        
        <motion.button
          onClick={onRoll}
          disabled={isRolling}
          className={`px-10 py-5 rounded-2xl font-bold text-xl ${
            isRolling 
              ? 'bg-slate-600' 
              : 'bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-lg hover:shadow-orange-500/50'
          }`}
          whileHover={!isRolling ? { scale: 1.1 } : {}}
          whileTap={!isRolling ? { scale: 0.95 } : {}}
          animate={isRolling ? { rotate: [0, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
        >
          {isRolling ? '🎲 Rolling...' : '🎲 Roll D20'}
        </motion.button>

        <AnimatePresence>
          {diceResult && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`text-5xl font-bold ${
                diceResult === 20 ? 'text-green-400' : diceResult === 1 ? 'text-red-400' : 'text-white'
              }`}
            >
              {diceResult === 20 ? '🎉 NAT 20!' : diceResult === 1 ? '💀 NAT 1...' : diceResult}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 mt-4">
          <p className="text-sm font-mono">
            <span className="text-yellow-400">d20</span> + 
            <span className="text-green-400"> modifier</span> + 
            <span className="text-purple-400"> proficiency</span> ≥ 
            <span className="text-red-400"> DC</span>
          </p>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">⚔️ Combat</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Action', icon: '🗡️', desc: 'Attack, Cast, Dash', color: 'from-red-600 to-red-800' },
            { name: 'Move', icon: '🏃', desc: 'Up to 30ft', color: 'from-green-600 to-green-800' },
            { name: 'Bonus', icon: '⚡', desc: 'Quick abilities', color: 'from-blue-600 to-blue-800' },
          ].map((action, i) => (
            <motion.div 
              key={i} 
              className={`bg-gradient-to-br ${action.color} rounded-xl p-4 text-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.08, rotate: [-1, 1, -1, 0] }}
            >
              <div className="text-2xl mb-1">{action.icon}</div>
              <h3 className="font-bold">{action.name}</h3>
              <p className="text-xs opacity-80">{action.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.div 
            className="bg-red-900/40 border border-red-700/50 rounded-xl p-3"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="font-bold text-red-400">❤️ Hit Points</h4>
            <p className="text-xs text-slate-400">Your health. 0 HP = death saves</p>
          </motion.div>
          <motion.div 
            className="bg-blue-900/40 border border-blue-700/50 rounded-xl p-3"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="font-bold text-blue-400">🛡️ Armor Class</h4>
            <p className="text-xs text-slate-400">How hard to hit. Higher = better</p>
          </motion.div>
        </div>
      </div>
    ),
    4: (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">✨ Magic System</h2>
        <p className="text-slate-400 text-sm">The particles around you visualize magical energy</p>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {[1,1,1,1,2,2,2,3,3].map((level, i) => (
            <motion.div 
              key={i}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                level === 1 ? 'bg-blue-600' : level === 2 ? 'bg-purple-600' : 'bg-pink-600'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.3, rotate: 360 }}
            >
              {level}
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-slate-500">↑ Spell slots by level</p>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { name: 'Verbal', icon: '🗣️', desc: 'Speak words' },
            { name: 'Somatic', icon: '🖐️', desc: 'Hand gestures' },
            { name: 'Material', icon: '💎', desc: 'Components' },
          ].map((comp, i) => (
            <motion.div 
              key={i} 
              className="bg-slate-700/50 rounded-xl p-3"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
            >
              <div className="text-xl">{comp.icon}</div>
              <p className="text-xs font-bold">{comp.name}</p>
              <p className="text-xs text-slate-500">{comp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {panels[activeTab]}
      </motion.div>
    </AnimatePresence>
  )
}


// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [diceResult, setDiceResult] = useState(null)
  const [isRolling, setIsRolling] = useState(false)

  const tabs = ['Overview', 'Characters', 'Dice', 'Combat', 'Magic']

  const handleRoll = () => {
    setIsRolling(true)
    setDiceResult(null)
    setTimeout(() => {
      setDiceResult(Math.floor(Math.random() * 20) + 1)
      setIsRolling(false)
    }, 1500)
  }

  return (
    <div className="w-full h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas className="absolute inset-0">
        <Suspense fallback={null}>
          <Scene activeTab={activeTab} isRolling={isRolling} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full flex flex-col">
          {/* Header */}
          <motion.div 
            className="text-center pt-6 pb-4 pointer-events-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
              Dungeons & Dragons
            </h1>
            <p className="text-slate-400 text-sm mt-1">Drag to orbit • React Three Fiber</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 px-4 flex-wrap pointer-events-auto">
            {tabs.map((tab, i) => (
              <TabButton key={tab} active={activeTab === i} onClick={() => setActiveTab(i)}>
                {tab}
              </TabButton>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center p-6">
            <motion.div 
              className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 max-w-2xl w-full border border-slate-700/50 shadow-2xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ContentPanel 
                activeTab={activeTab} 
                diceResult={diceResult} 
                isRolling={isRolling}
                onRoll={handleRoll}
              />
            </motion.div>
          </div>

          <p className="text-center text-slate-600 text-xs pb-4">
            React Three Fiber + Drei + Framer Motion
          </p>
        </div>
      </div>
    </div>
  )
}
