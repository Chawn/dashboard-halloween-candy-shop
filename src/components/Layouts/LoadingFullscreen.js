import React, {useState, useEffect} from 'react'

const LoadingFullscreen = () => {
  const [showLinkHome, setShowLinkHome] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setShowLinkHome(true);
    }, 10000)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-[#131820c9] opacity-100 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
      { 
        showLinkHome && 
          <div className='w-1/3 text-center text-gray-200 absolute justify-center top-[60%] text-xl '>
            <p className="mb-4">
              หากรอนานเกินไป
            </p>
            <p className="mb-4">
              โปรดตรวจสอบสัญญาณอินเตอร์เน็ต, VPN, หรือลองเปิดเว็บใหม่อีกครั้ง
            </p>
            <p className="mb-4">
              หากยังใช้งานไม่ได้โปรดแจ้งให้เราทราบที่ไลน์ <a href="https://lin.ee/rR9g3UJ" rel="noreferrer" target="_blank"> @pramoolquick</a>
            </p>
            <p className="mb-4">
              <a href="/" rel="noreferrer" className='btn btn-rose text-base'>ไปยังหน้าแรก</a>
            </p>
          </div>
      }
  </div>
  )
}

export default LoadingFullscreen