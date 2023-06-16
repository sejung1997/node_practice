const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");

//게시글 목록 페이지
router.get("/", async (req, res) => {
  const posts = await Post.find({});
  return res.status(200).json(Object.values(posts));
});

//게시글 상세 페이지
router.get("/:postId", async (req, res) => {
  const id = req.params.postId;
  const [existsPost] = await Post.find({ _id: Object(id) });
  console.log(existsPost, "existsPost");
  // if ([existsPost].length) {
  //   const searchReslut = [existsPost].map((search) => {
  //     return {
  //       postId: id,
  //       title: search.title,
  //       content: search.content,
  //       user: search.user,
  //       day: search.day,
  //     };
  //   });
  //   res.json({ searchReslut });
  // } else {
  //   return res.status(400).json({ message: "데이터형식을 확인해주세요" });
  // }
  if (!existsPost._id) return res.status(400).json({ message: "존재하지 않는 게시물입니다." });
  return res.status(200).json(Object.values(existsPost));
});

//게시글 생성
router.post("/", async (req, res) => {
  const { title, content, user, password } = req.body;
  //작성 시간
  const day = new Date();

  await Post.create({ title, content, user, password, day });
  return res.json({ message: "게시판을 생성하였습니다." });
});

//게시글 수정
router.put("/:postId", async (req, res) => {
  const id = req.params.postId;
  const { content, password } = req.body;
  const [existsPost] = await Post.find({ _id: Object(id) });
  if (existsPost.password !== password) res.status(400).json({ message: "비밀번호가 틀렸습니다." });
  await Post.updateOne({ _id: Object(id) }, { $set: { content } });

  res.status(200).json({ message: "게시물을 수정하였습니다." });
});

//게시글 삭제
router.delete("/:postId", async (req, res) => {
  const id = req.params.postId;
  const { password } = req.body;
  const [existsPost] = await Post.find({ _id: Object(id) });
  if (existsPost.password !== password) res.status(400).json({ message: "비밀번호가 틀렸습니다." });

  await Post.deleteOne({ _id: Object(id) });
  res.status(200).json({ message: "게시글을 삭제하였습니다." });
});

module.exports = router;
