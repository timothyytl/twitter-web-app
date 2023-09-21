import { useContext, useEffect } from "react"
import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsByUser } from "../features/posts/postsSlice"
import { AuthContext } from "./AuthProvider"
import ProfilePostCard from "./ProfilePostCard"

export default function ProfileMidBody() {
  const url =
    "https://scontent.fkul10-1.fna.fbcdn.net/v/t39.30808-6/376823331_650142013875891_7827868240536458414_n.png?_nc_cat=101&ccb=1-7&_nc_sid=52f669&_nc_ohc=QYqbuNMD27oAX-8iaBE&_nc_ht=scontent.fkul10-1.fna&oh=00_AfCh1TVG7nRFStJ-7AlKNcRNC7avTgL6r9rBkdlg0rKxWA&oe=650D462C"
  const pic =
    "https://scontent.fkul10-1.fna.fbcdn.net/v/t39.30808-6/376831954_650089940547765_6510600357603845271_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=o8g5RDIIsDcAX_mn9R1&_nc_ht=scontent.fkul10-1.fna&oh=00_AfA3z4c_EdXcB1NaBlBRMpzMUePY6_w4HqnUbRGqbJgulg&oe=650EA84F"

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.posts)
  const loading = useSelector((state) => state.posts.loading)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    dispatch(fetchPostsByUser(currentUser.uid))
  }, [dispatch, currentUser])

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>

      <p
        className="mt-5"
        style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
      >
        Timothy
      </p>
      <p style={{ marginBottom: "2px" }}>@codesandtim</p>
      <p>Transitioning to software development</p>
      <p>Software Developer</p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>
      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="replies">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="highlights">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="media">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="likes">Likes</Nav.Link>
        </Nav.Item>
      </Nav>
      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )}
      {posts.map((post) => (
        <ProfilePostCard key={post.id} post={post} />
      ))}
    </Col>
  )
}
