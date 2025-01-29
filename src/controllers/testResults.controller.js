import {
  saveTestResult,
  getResultsByUser,
} from "../repositories/testResults.repository.js";
import { testResultSchema } from "../validators/testResults.validator.js";

export const submitTest = async (req, res) => {
  try {
    testResultSchema.parse(req.body);

    const testResult = await saveTestResult(req.body);

    res.status(201).json(testResult);
  } catch (error) {
    console.error("Error saving test result:", error);

    if (error.errors) {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    }

    res.status(500).json({ error: "Failed to save test result" });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);

    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const results = await getResultsByUser(parsedUserId);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({ error: "Failed to fetch user results" });
  }
};
