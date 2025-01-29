import {
  saveTestResult,
  getResultsByUser,
} from "../repositories/testResults.repository.js";

export const submitTest = async (req, res) => {
  try {
    const testResult = await saveTestResult(req.body);
    res.status(201).json(testResult);
  } catch (error) {
    console.error("Error saving test result:", error);
    res.status(500).json({ error: "Failed to save test result" });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await getResultsByUser(parseInt(userId));
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({ error: "Failed to fetch user results" });
  }
};
