const comment = require('../models/commentModal');
const blog = require('../models/postModal');

const addComment = async (req, res) => {
    try {
        const blogid = req.query.id;
        
        
        const blog = await blog.findOne({ _id: blogid })
        if (!blog) {
            const { comment } = req.body
            const Comment = await comment.create({
                user_id: req.user._id,
                blogid: blogid,
                comment: comment
            })
            return res.status(200).send({
                success: true,
                messsge: "Comment has done.....!",
                Comment
            })
        } else {
            return res.status(501).send({
                success: false,
                messsge: "Your post id is wrong",
            })
        }
    } catch (error) {
        return res.status(501).send({
            success: false,
            err: error
        })
    }
}


module.exports = {
    addComment,
}