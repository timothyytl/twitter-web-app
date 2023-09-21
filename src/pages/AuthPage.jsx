import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { Button, Col, Image, Modal, Row, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/AuthProvider"

export default function AuthPage() {
  const loginImage =
    "https://img.freepik.com/premium-vector/new-twitter-logo-x-2023-twitter-x-logo-vector-download_691560-10794.jpg"

  const [modalShow, setModalShow] = useState(null)
  const handleShowSignUp = () => setModalShow("SignUp")
  const handleShowLogin = () => setModalShow("Login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const auth = getAuth()
  const { currentUser } = useContext(AuthContext)
  const provider = new GoogleAuthProvider()

  useEffect(() => {
    if (currentUser) navigate("/profile")
  }, [currentUser, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await signInWithEmailAndPassword(auth, username, password)
      console.log(res.user)
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => setModalShow(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(auth, username, password)
      console.log(res.user)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Row>
      <Col
        sm={6}
        className="d-flex justify-content-center align-items-center bg-black"
      >
        <Image src={loginImage} width="450px" fluid />
      </Col>
      <Col sm={6} className="p-4 bg-black">
        <i
          className="bi bi-twitter"
          style={{ fontSize: 50, color: "dodgerblue" }}
        ></i>
        <p className="mt-5" style={{ fontSize: 64, color: "white" }}>
          <strong>Happening Now</strong>
        </p>
        <h2 className="my-5" style={{ fontSize: 31, color: "white" }}>
          <strong>Join today.</strong>
        </h2>
        <Col sm={5} className="d-grid gap-2">
          <Button
            className="rounded-pill border-white bg-light text-dark"
            onClick={handleGoogleLogin}
          >
            <i className="bi bi-google mx-2"></i>
            <strong>Sign up with Google</strong>
          </Button>
          <Button
            className="rounded-pill border-white bg-light text-dark"
            variant="outline-dark"
          >
            <i className="bi bi-apple mx-2"></i>{" "}
            <strong>Sign up with Apple</strong>
          </Button>
          <Button
            className="rounded-pill border-white bg-light text-dark"
            variant="outline-dark"
          >
            <i className="bi bi-facebook mx-2"></i>{" "}
            <strong>Sign up with Facebook</strong>
          </Button>
          <p style={{ textAlign: "center", color: "white" }}>or</p>
          <Button className="rounded-pill" onClick={handleShowSignUp}>
            Create an account
          </Button>
          <p style={{ fontSize: "12px", color: "gray" }}>
            By signing up, you agree to the{" "}
            <span style={{ color: "dodgerblue" }}>Terms of Service</span> and{" "}
            <span style={{ color: "dodgerblue" }}>Privacy Policy</span>,
            including <span style={{ color: "dodgerblue" }}>Cookie Use.</span>
          </p>
          <p className="mt-5 text-white">
            <strong>Already have an account?</strong>
          </p>
          <Button
            className="rounded-pill"
            variant="outline-primary"
            onClick={handleShowLogin}
          >
            <strong>Sign in</strong>
          </Button>
        </Col>
        <Modal
          show={modalShow !== null}
          onHide={handleClose}
          animation={false}
          centered
          style={{
            backgroundColor: "rgba(91, 112, 131, 0.4)",
          }}
        >
          <Modal.Body>
            <h2
              className="mb-4 d-flex justify-content-center"
              style={{ fontWeight: "bold", margin: "20px 0" }}
            >
              {modalShow === "SignUp"
                ? "Create your account"
                : "Log in to your account"}
            </h2>
            <Form
              className="d-grid gap-2 px-5"
              onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <p style={{ fontSize: "12px", color: "gray" }}>
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use. TimTweets may use your contact
                information, including your email address and phone number for
                purposes outlined in our Privacy Policy, like keeping your
                account secure and personalising our services, including ads.
                Learn more. Others will be able to find you by email or phone
                number, when provided, unless you choose otherwise here.
              </p>
              <Button className="rounded-pill" type="submit">
                {modalShow === "SignUp" ? "Sign Up" : "Log in"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  )
}
