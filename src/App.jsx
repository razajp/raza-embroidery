import React, { useState } from 'react'
import TargetCalculatorModal from './components/TargetCalculatorModal'
import SalarySlipGeneratorModal from './components/SalarySlipGeneratorModal' // <--- Naya component import karein

export default function App() {
  // Dono modals ke liye alag state banayi hai
  const [openTarget, setOpenTarget] = useState(false)
  const [openSalary, setOpenSalary] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-md w-full max-w-md text-center border border-gray-300">
        
        <h1 className="text-3xl font-bold mb-2 text-[#0a6465] tracking-wide drop-shadow-sm">Dashboard</h1>
        <p className="text-gray-600 mb-6">Select a tool to proceed</p>

        {/* Buttons Container */}
        <div className="flex flex-col gap-3"> 
          
          {/* Button 1: Target Calculator */}
          <button
            onClick={() => setOpenTarget(true)}
            className="w-full px-8 py-3 bg-[#127475]/90 text-white rounded-2xl hover:bg-[#127475] active:scale-[0.98] transition-all shadow-sm font-medium"
          >
            Calculate Target
          </button>

          {/* Button 2: Salary Generator (Same Style) */}
          <button
            onClick={() => setOpenSalary(true)}
            className="w-full px-8 py-3 bg-[#127475]/90 text-white rounded-2xl hover:bg-[#127475] active:scale-[0.98] transition-all shadow-sm font-medium"
          >
            Generate Salary Slips
          </button>

        </div>
      </div>

      {/* Modals rendering logic */}
      {openTarget && <TargetCalculatorModal onClose={() => setOpenTarget(false)} />}
      {openSalary && <SalarySlipGeneratorModal onClose={() => setOpenSalary(false)} />}
    </div>
  )
}