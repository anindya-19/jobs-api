const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};
//Get a single job based on the job id
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  //   user: { userId }: It goes into req.user (attached by your auth middleware) and grabs the userId.
  // params: { id: jobId }: It goes into req.params, grabs the id from the URL, and renames it to jobId for clarity.

  if (!job) {
    throw new NotFoundError(`No job found with the id ${userId}`);
  }
  res.status(StatusCodes.OK).json(job);
};
const createJob = async (req, res) => {
  //console.log(req.user.userId);

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//update a job or patch
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or position fields cannot be empty");
  }

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { returnDocument: "after", runValidators: true },
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json(job);
};

//To delete a job
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Job was deleted successfully" });
};
module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
