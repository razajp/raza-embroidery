import React, { useState } from 'react'
import TargetCalculatorModal from './components/TargetCalculatorModal'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-md w-full max-w-md text-center border border-gray-300">
        <h1 className="text-3xl font-bold mb-2 text-[#0a6465] tracking-wide drop-shadow-sm">Dashboard</h1>
        <p className="text-gray-600 mb-5">Calculate stitching targets quickly</p>

        <button
          onClick={() => setOpen(true)}
          className="px-8 py-3 bg-[#127475]/90 text-white rounded-2xl hover:bg-[#127475] active:scale-95 transition-all shadow-sm"
        >
          Calculate Target
        </button>
      </div>

      {open && <TargetCalculatorModal onClose={() => setOpen(false)} />}
    </div>
  )
}