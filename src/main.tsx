
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import CharPage from './pages/char/CharPage'

function Root() {
  return (
    <BrowserRouter>
      <div style={{padding:'16px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto'}}>
        <header style={{display:'flex', gap:12, alignItems:'center', marginBottom:16}}>
          <h1 style={{margin:0, fontSize:20}}>TeyvatLab</h1>
          <nav style={{display:'flex', gap:12}}>
            <Link to="/">首页</Link>
            <Link to="/char/flins">菲林斯</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/char/:name" element={<CharPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)
