/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaArrowRight, FaPencilAlt } from "react-icons/fa";
import * as client from "../../client";

function scoreAnswers(questions: any[], answers: Record<string, any>) {
  let score = 0;
  for (const q of questions) {
    const ans = answers[q._id];
    if (q.type === "MULTIPLE_CHOICE") {
      const correct = q.choices?.find((c: any) => c.isCorrect);
      if (correct && (ans === correct._id || ans === correct.text)) score += q.points;
    } else if (q.type === "TRUE_FALSE") {
      if (String(ans).toLowerCase() === String(q.correctAnswer).toLowerCase()) score += q.points;
    } else if (q.type === "FILL_BLANK") {
      if (q.choices?.some((c: any) => c.text.toLowerCase() === String(ans).toLowerCase())) score += q.points;
    }
  }
  return score;
}

function isCorrect(question: any, answer: any) {
  if (question.type === "MULTIPLE_CHOICE") {
    const correct = question.choices?.find((c: any) => c.isCorrect);
    return correct && (answer === correct._id || answer === correct.text);
  }
  if (question.type === "TRUE_FALSE")
    return String(answer).toLowerCase() === String(question.correctAnswer).toLowerCase();
  if (question.type === "FILL_BLANK")
    return question.choices?.some((c: any) => c.text.toLowerCase() === String(answer).toLowerCase());
  return false;
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const q = await client.findQuizById(qid as string);
      setQuiz(q);
      const qs = await client.findQuestionsForQuiz(qid as string);
      setQuestions(qs);
    })();
  }, [qid]);

  const handleSubmit = () => {
    const computed = scoreAnswers(questions, answers);
    setScore(computed);
    setSubmitted(true);
  };

  if (!quiz) return <div className="p-4">Loading...</div>;

  const oneAtATime = quiz.oneQuestionAtATime;
  const displayedQuestions = oneAtATime ? [questions[currentIndex]].filter(Boolean) : questions;

  return (
    <div id="wd-quiz-preview" className="p-3" style={{ maxWidth: "700px" }}>
      <div className="alert alert-warning small mb-3">
        This is a preview of the published version of the quiz
      </div>

      <h3>{quiz.title}</h3>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}

      {!submitted ? (
        <>
          {displayedQuestions.map((q: any, idx: number) => {
            const globalIdx = oneAtATime ? currentIndex : idx;
            return (
              <div key={q._id} className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Question {globalIdx + 1}</span>
                  <span>{q.points} pts</span>
                </div>
                <p className="mt-2">{q.question}</p>

                {q.type === "MULTIPLE_CHOICE" && (
                  <div>
                    {q.choices?.map((choice: any) => (
                      <Form.Check
                        key={choice._id}
                        type="radio"
                        name={`q-${q._id}`}
                        label={choice.text}
                        checked={answers[q._id] === choice._id}
                        onChange={() => setAnswers({ ...answers, [q._id]: choice._id })}
                      />
                    ))}
                  </div>
                )}

                {q.type === "TRUE_FALSE" && (
                  <div>
                    {["true", "false"].map((val) => (
                      <Form.Check
                        key={val}
                        type="radio"
                        name={`q-${q._id}`}
                        label={val.charAt(0).toUpperCase() + val.slice(1)}
                        checked={answers[q._id] === val}
                        onChange={() => setAnswers({ ...answers, [q._id]: val })}
                      />
                    ))}
                  </div>
                )}

                {q.type === "FILL_BLANK" && (
                  <FormControl
                    placeholder="Your answer"
                    value={answers[q._id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                  />
                )}
              </div>
            );
          })}

          {oneAtATime && (
            <div className="d-flex justify-content-between mb-3">
              <Button
                variant="outline-secondary"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                <FaArrowLeft className="me-1" />Back
              </Button>
              {currentIndex < questions.length - 1 ? (
                <Button variant="outline-primary" onClick={() => setCurrentIndex(currentIndex + 1)}>
                  Next<FaArrowRight className="ms-1" />
                </Button>
              ) : (
                <Button variant="danger" onClick={handleSubmit}>Submit Quiz</Button>
              )}
            </div>
          )}

          {!oneAtATime && (
            <div className="d-flex justify-content-end">
              <Button variant="danger" onClick={handleSubmit}>Submit Quiz</Button>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="alert alert-info mb-3">
            Score: {score} / {questions.reduce((s, q) => s + q.points, 0)}
          </div>
          {questions.map((q: any, idx: number) => {
            const correct = isCorrect(q, answers[q._id]);
            return (
              <div
                key={q._id}
                className={`border rounded p-3 mb-3 ${correct ? "border-success bg-success bg-opacity-10" : "border-danger bg-danger bg-opacity-10"}`}
              >
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Question {idx + 1} {correct ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</span>
                  <span>{q.points} pts</span>
                </div>
                <p className="mt-2">{q.question}</p>
                <p className="small text-muted mb-0">Your answer: <strong>{String(answers[q._id] ?? "—")}</strong></p>
              </div>
            );
          })}
        </div>
      )}

      <hr />
      <Button
        variant="outline-secondary"
        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
      >
        <FaPencilAlt className="me-1" />Keep Editing This Quiz
      </Button>
    </div>
  );
}
