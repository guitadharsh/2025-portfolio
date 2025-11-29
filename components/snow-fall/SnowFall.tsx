"use client"
import Snowfall from "react-snowfall"

const SnowFall = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Snow */}
      <Snowfall 
        color="white"
        wind={[3, 2]}
      />

      {/* Soft black fade overlay */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}

export default SnowFall
