import React, { useState } from 'react'
import TargetCalculatorModal from './components/TargetCalculatorModal'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/60">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-800 tracking-wide drop-shadow-sm">Dashboard</h1>
        <p className="text-gray-600 mb-6">Calculate stitching targets quickly</p>

        <button
          onClick={() => setOpen(true)}
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
        >
          Calculate Target
        </button>
      </div>

      {open && <TargetCalculatorModal onClose={() => setOpen(false)} />}
    </div>
  )
}