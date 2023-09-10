const { validateJobseekerApplicationData } = require("../../utils/validators");

const Application = require("../../models/application");
const Recruiter = require("../../models/recruiter");

const { Config } = require("../../../configs/config");

class JobseekerCandidateController {
  createApplication = async (req, res, next) => {
    try {
      const { data } = req.body;

      const profile = req.user.jobseeker;
      if (!profile) {
        return res.sendStatus(403);
      }
      const jobseekerId = profile._id.toString();

      if (!profile.referralId) {
        return res.sendStatus(403);
      }
      let recruiterId = null;
      const recruiterData = await Recruiter.findOne({
        referredId: profile.referralId,
      });
      if (recruiterData) {
        recruiterId = recruiterData._id.toString();
      }
      const { applicationData } = data;

      const [validatedApplicationData, applErrors] =
        validateJobseekerApplicationData({
          ...applicationData,
          ...{ jobseeker: jobseekerId, recruiter: recruiterId },
        });

      if (applErrors && applErrors.length > 0) {
        return res.status(400).json({ error: applErrors });
      }

      const newApplication = await new Application({
        ...validatedApplicationData,
        createdAt: new Date(),
      }).save();
      res.status(201).json({
        createdApplication: newApplication,
        user: {
          id: req.user._id,
          email: req.user.email,
          userType: Object.keys(Config.USERTYPES).find(
            (key) => Config.USERTYPES[key] === req.user.userType
          ),
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  uploadResume = async (req, res) => {
    try {
      const string = req.file.path;
      const profile = req.user.jobseeker;

      if (!profile) {
        return res.sendStatus(403);
      }
      if (!string) {
        throw "failed to upload";
      }

      res.status(200).json({
        userId: req.user._id,
        message: "Resume uploaded successfully.",
        file: string,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };
  uploadCoverLetter = async (req, res) => {
    try {
      const string = req.file.path;
      const profile = req.user.jobseeker;

      if (!profile) {
        return res.sendStatus(403);
      }
      if (!string) {
        throw "failed to upload";
      }

      res.status(200).json({
        userId: req.user._id,
        message: "Cover Letter uploaded successfully.",
        file: string,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };
}

module.exports = new JobseekerCandidateController();
