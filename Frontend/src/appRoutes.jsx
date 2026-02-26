import { BrowserRouter , Routes , Route } from "react-router"
import Login from "./features/auth/pages/login"
import Register from "./features/auth/pages/register"
import Home from "./features/auth/pages/Home"
import Feed from "./features/posts/pages/Feed"

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

