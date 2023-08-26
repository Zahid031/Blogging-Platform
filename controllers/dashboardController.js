const { validationResult } = require("express-validator");
const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");
const errorFormatter = require("../utils/validationErrorFormatter");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.dashboardGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({
      user: req.user._id,
    })
      .populate({
        path: "posts",
        select: "tittle thumbnail",
      })
      .populate({
        path: "bookmarks",
        select: "tittle thumbnail",
      });
    if (profile) {
      return res.render("pages/dashboard/dashboard", {
        tittle: "My Dashboard",
        flashMessage: Flash.getMessage(req),
        posts: profile.posts,
        bookmarks: profile.bookmarks,
      });
    }

    res.redirect("/dashboard/create-profile");
  } catch (e) {
    next(e);
  }
};

exports.createProfileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/dashboard/edit-profile");
    }
    res.render("pages/dashboard/create-profile", {
      tittle: "Create Your Profile",
      flashMessage: Flash.getMessage(req),
      error: {},
    });
  } catch (error) {
    next(error);
  }
};

exports.createProfilePostController = async (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.render("pages/dashboard/create-profile", {
      tittle: "Create Your Profile",
      flashMessage: Flash.getMessage(req),
      error: errors.mapped(),
    });
  }

  let { name, tittle, bio, website, facebook, twitter, github } = req.body;

  try {
    let profile = new Profile({
      user: req.user._id,
      name,
      tittle,
      bio,
      profilePics: req.user.profilePics,
      links: {
        website: website || "",
        facebook: facebook || "",
        twitter: twitter || "",
        github: github || "",
      },
      posts: [],
      bookmarks: [],
    });

    let createdProfile = await profile.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { profile: createdProfile._id } }
    );

    req.flash("success", "Profile Created Successfully!");
    res.redirect("/dashboard");
  } catch (e) {
    next(e);
  }
};
exports.editProfileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.redirect("/dashboard/create-profile");
    }

    res.render("pages/dashboard/edit-profile", {
      tittle: "Edit Your Profile",
      error: {},
      flashMessage: Flash.getMessage(req),
      profile,
    });
  } catch (e) {
    next(e);
  }
};
exports.editProfilePostController = async (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter);
  let { name, tittle, bio, website, facebook, twitter, github } = req.body;

  if (!errors.isEmpty()) {
    return res.render("pages/dashboard/create-profile", {
      tittle: "Create Your Profile",
      flashMessage: Flash.getMessage(req),
      error: errors.mapped(),
      profile: {
        name,
        tittle,
        bio,
        links: {
          website,
          facebook,
          twitter,
          github,
        },
      },
    });
  }

  try {
    let profile = {
      name,
      tittle,
      bio,
      links: {
        website: website || "",
        facebook: facebook || "",
        twitter: twitter || "",
        github: github || "",
      },
    };

    let updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profile },
      { new: true }
    );
    req.flash("success", "Profile Updated Successfully");
    res.render("pages/dashboard/edit-profile", {
      tittle: "Edit Your Profile",
      error: {},
      flashMessage: Flash.getMessage(req),
      profile: updatedProfile,
    });
  } catch (e) {
    next(e);
  }
};

exports.bookmarksGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id }).populate({
      path: "bookmarks",
      model: "Post",
      select: "tittle thumbnail",
    });
    res.render("pages/dashboard/bookmarks", {
      tittle: "My Bookmarks",
      flashMessage: Flash.getMessage(req),
      posts: profile.bookmarks,
    });
  } catch (e) {
    next(e);
  }
};

exports.commentsGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    let comments = await Comment.find({ post: { $in: profile.posts } })
      .populate({
        path: "post",
        select: "tittle",
      })
      .populate({
        path: "user",
        select: "username profilePics",
      })
      .populate({
        path: "replies.user",
        select: "username profilePics",
      });
    res.render("pages/dashboard/comments", {
      tittle: "My Recent Comments",
      flashMessage: Flash.getMessage(req),
      comments,
    });
  } catch (e) {
    next(e);
  }
};
