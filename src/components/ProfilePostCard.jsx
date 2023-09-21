import { useContext, useState } from "react"
import { Button, Col, Image, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import {
  deletePost,
  likePost,
  removeLikeFromPost,
} from "../features/posts/postsSlice"
import { AuthContext } from "./AuthProvider"
import UpdatePostModal from "./UpdatePostModal"

export default function ProfilePostCard({ post }) {
  const { content, id: postId, imageUrl } = post
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(post.likes || [])
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser.uid

  // user has liked the post if their id is in the likes array
  const isLiked = likes.includes(userId)

  const pic =
    "https://scontent.fkul10-1.fna.fbcdn.net/v/t39.30808-6/376831954_650089940547765_6510600357603845271_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=o8g5RDIIsDcAX_mn9R1&_nc_ht=scontent.fkul10-1.fna&oh=00_AfA3z4c_EdXcB1NaBlBRMpzMUePY6_w4HqnUbRGqbJgulg&oe=650EA84F"

  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const handleShowUpdateModal = () => setShowUpdateModal(true)
  const handleCloseUpdateModal = () => setShowUpdateModal(false)

  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes())

  const addToLikes = () => {
    setLikes([...likes, userId])
    dispatch(likePost({ userId, postId }))
  }

  const removeFromLikes = () => {
    setLikes(likes.filter((id) => id !== userId))
    dispatch(removeLikeFromPost({ userId, postId }))
  }

  const handleDelete = () => {
    dispatch(deletePost({ userId, postId }))
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
        <Image src={imageUrl} style={{ width: 150 }} />
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
          <Button variant="light">
            <i
              className="bi bi-pencil-square"
              onClick={handleShowUpdateModal}
            ></i>
          </Button>
          <Button variant="light" onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </Button>
          <UpdatePostModal
            show={showUpdateModal}
            handleClose={handleCloseUpdateModal}
            postId={postId}
            originalPostContent={content}
          />
        </div>
      </Col>
    </Row>
  )
}
