const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comments.js");

//특정 게시물의 댓글 목록
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId });
  res.status(200).json(comments);
});

//댓글 생성
router.post("/", async (req, res) => {
  const { content, user, password, postId } = req.body;

  const day = new Date();
  await Comment.create({ content, user, password, day, postId });
  res.status(200).json({ message: "댓글을 생성하였습니다." });
});

//댓글 수정
router.put("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const { content, password } = req.body;
  console.log("comments", content, password);

  // 댓글 존재하는지 확인
  const [existsComment] = await Comment.find({ _id: Object(commentId) });
  if (!existsComment) res.status(400).json({ message: "존재하지 않는 댓글 입니다." });
  if (existsComment.password !== password) res.status(400).json({ message: "비밀번호가 틀렸습니다." });

  await Comment.updateOne({ _id: Object(commentId) }, { $set: { content } });
  res.status(200).json({ message: "댓글을 수정하였습니다." });
});

//댓글 삭제
router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const { password } = req.body;
  const [existsComment] = await Comment.find({ _id: Object(commentId) });
  if (!existsComment) res.status(400).json({ message: "존재하지 않는 댓글 입니다." });
  if (existsComment.password !== password) res.status(400).json({ message: "비밀번호가 틀렸습니다." });

  await Comment.deleteOne({ _id: Object(commentId) });
  res.status(200).json({ message: "댓글을 삭제하였습니다." });
});

module.exports = router;
