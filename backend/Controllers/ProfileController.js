const Profile = require("../Model/ProfileModel");

// Create a new profile
const createProfile = async (req, res, next) => {
  console.log("Creating profile...");
  const { email, link } = req.body;

  let newProfile;
  try {
    newProfile = new Profile({ email, link });
    await newProfile.save(); // Save the new document in the DB
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating profile" });
  }

  return res.status(201).json({ profile: newProfile });
};

// Get profile link by email
const getLinkByEmail = async (req, res, next) => {
  const { email } = req.params;

  let profile;
  try {
    profile = await Profile.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error retrieving profile" });
  }

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  return res.status(200).json({ link: profile.link });
};

// Update profile link by email
const updateLinkByEmail = async (req, res, next) => {
  const { email } = req.params;
  const { link } = req.body;

  let updatedProfile;
  try {
    updatedProfile = await Profile.findOneAndUpdate(
      { email: email },
      { link: link },
      { new: true }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating profile" });
  }

  if (!updatedProfile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  return res.status(200).json({ profile: updatedProfile });
};

exports.createProfile = createProfile;
exports.getLinkByEmail = getLinkByEmail;
exports.updateLinkByEmail = updateLinkByEmail;
