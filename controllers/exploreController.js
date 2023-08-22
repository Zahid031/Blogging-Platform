const Flash = require('../utils/Flash')
const Post = require('../models/Post')

exports.exploreGetController = async(req, res, next) => {

    try {
        let posts = await Post.find()
        res.render("pages/explorer/explorer", {
          tittle: "Explore All Posts",
          filter: "week",
          flashMessage: Flash.getMessage(req),
          posts
        });
    } catch (e) {
        console.log('Can not get params');
        next(e)
    }

    
}