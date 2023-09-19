import { useEffect, useState } from "react"
import { Button, Col, Image, Row } from "react-bootstrap"
import axios from "axios"
import jwt_decode from "jwt-decode"

export default function ProfilePostCard({ content, postId }) {
  const [likes, setLikes] = useState([])

  const token = localStorage.getItem("authToken")
  const decode = jwt_decode(token)
  const userId = decode.id

  const pic =
    "https://scontent.fkul10-1.fna.fbcdn.net/v/t39.30808-6/376831954_650089940547765_6510600357603845271_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=o8g5RDIIsDcAX_mn9R1&_nc_ht=scontent.fkul10-1.fna&oh=00_AfA3z4c_EdXcB1NaBlBRMpzMUePY6_w4HqnUbRGqbJgulg&oe=650EA84F"

  const BASE_URL = "http://localhost:3000"

  useEffect(() => {
    fetch(`${BASE_URL}/likes/post/${postId}`)
      .then((res) => res.json())
      .then((data) => setLikes(data))
      .catch((err) => console.error("Error:", err))
  }, [postId])

  const isLiked = likes.some((like) => like.user_id === userId)
  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes())

  const addToLikes = () => {
    axios
      .post(`${BASE_URL}/likes`, {
        user_id: userId,
        post_id: postId,
      })
      .then((res) => {
        setLikes([...likes, { ...res.data, likes_id: res.data.id }])
      })
      .catch((error) => console.error("Error:", error))
  }

  const removeFromLikes = () => {
    const like = likes.find((like) => like.user_id === userId)
    console.log(like)
    if (like) {
      axios
        .put(`${BASE_URL}/likes/${like.likes_id}`)
        .then(() => setLikes(likes.filter((like) => like.user_id !== userId)))
        .catch((error) => console.error("Error:", error))
    }
  }

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>
      <Col>
        <strong>Timothy</strong>
        <span>@codesandtim * May 9</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? (
              <i className="bi bi-heart-fill text-danger"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
            {likes.length}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
        </div>
      </Col>
    </Row>
  )
}
