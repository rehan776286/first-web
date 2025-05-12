import review from "../model/reviewsModel.js";

const likeRouter = async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.id;

  try {
    const reviews = await review.findById(reviewId);
    if (!reviews) {
      return res.json({ success: false, message: "review not found" });
    }
    const alreadyLikes = reviews.likes.includes(userId);
    if (alreadyLikes) {
      reviews.likes = reviews.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      console.log(reviews.likes);
    } else {
      reviews.likes.push(userId);
    }

    reviews.totallike = reviews.likes.length;
    await reviews.save();
    return res.json({ success: true, message: "like successed" });
  } catch (error) {
    return res.json({ success: false, message: `likeRouter failed ${error}` });
  }
};

export default likeRouter;
