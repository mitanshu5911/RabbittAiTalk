import multer from 'multer';
import csv from "csv-parser";
import fs from 'fs';
import { setCSVData, getCSVData } from '../utils/csvStore.js';
import { groq } from '../utils/groqClient.js';

const upload = multer({ dest: "uploads/" });

export const uploadMiddleware = upload.single("file");

export const uploadCSV = (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            setCSVData(results);

            res.json({
                message: "CSV uploaded successfully",
                rows: results.length,
                columns: Object.keys(results[0]),
            });
        })
};


export const askQuestion = async (req, res) => {
  const { question } = req.body;
  const csvData = getCSVData();

  if (!csvData.length) {
    return res.json({ answer: "No CSV uploaded" });
  }

  try {
    const sampleData = csvData.slice(0, 50);

    const prompt = `
You are a hotel data analyst.

Dataset:
${JSON.stringify(sampleData)}

User Question:
${question}

Respond ONLY in valid JSON in this format:

{
  "answer": "short business explanation",
  "chart": {
    "type": "bar | line | pie",
    "title": "chart title",
    "labels": ["x1","x2","x3"],
    "values": [10,20,30]
  }
}

Rules:
- Always return valid JSON
- Do not include any text outside JSON
- If a chart is not possible return empty labels and values
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 400
    });

    let aiResponse = completion.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(aiResponse);
    } catch {
      parsed = {
        answer: aiResponse,
        chart: {
          type: null,
          title: "",
          labels: [],
          values: []
        }
      };
    }

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI processing failed" });
  }
};