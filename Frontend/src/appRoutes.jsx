import { BrowserRouter , Routes , Route } from "react-router"
import Login from "./features/auth/pages/login"
import Register from "./features/auth/pages/register"
import Home from "./features/auth/pages/Home"

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

