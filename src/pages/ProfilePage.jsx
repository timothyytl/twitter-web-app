import { getAuth } from "firebase/auth"
import { useContext, useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ProfileSideBar from "../components/ProfileSideBar"
import ProfileMidBody from "../components/ProfileMidBody"
import { AuthContext } from "../components/AuthProvider"

export default function ProfilePage() {
  const auth = getAuth()
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser) navigate("/login")
    navigate("/login")
  }, [currentUser, navigate])

  if (!currentUser) navigate("/login")
  const handleLogout = () => auth.signOut()

  return (
    <>
      <Container>
        <Row>
          <ProfileSideBar handleLogout={handleLogout} />
          <ProfileMidBody />
        </Row>
      </Container>
    </>
  )
}
