/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RootState } from "../../../../../store";
import * as client from "../../client";

function getAnswerDisplay(question: any, answer: any) {
  if (answer == null) return "—";
  if (question.type === "MULTIPLE_CHOICE") {
    const choice = question.choices?.find((c: any) => c.text === answer || c._id === answer);
    return choice?.text ?? String(answer);
  }
  return String(answer);
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

export default function QuizTake() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accessInput, setAccessInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    (async () => {
      const q = await client.findQuizById(qid as string);
      setQuiz(q);
      const qs = await client.findQuestionsForQuiz(qid as string);
      setQuestions(qs);
      const [last, countData] = await Promise.all([
        client.getLastAttempt(qid as string),
        client.getAttemptCount(qid as string),
      ]);
      setLastAttempt(last);
      setAttemptCount(countData?.count ?? 0);
    })();
  }, [qid]);

  if (!quiz) return <div className="p-4">Loading...</div>;

  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const attemptsRemaining = maxAttempts - attemptCount;
  const needsAccessCode = !!quiz.accessCode;

  if (needsAccessCode && !accessGranted) {
    return (
      <div className="p-4" style={{ maxWidth: "400px" }}>
        <h4>Access Code Required</h4>
        <FormControl
          type="password"
          placeholder="Enter access code"
          value={accessInput}
          onChange={(e) => setAccessInput(e.target.value)}
          className="mb-2"
        />
        {accessError && <div className="text-danger small mb-2">{accessError}</div>}
        <Button
          variant="danger"
          onClick={() => {
            if (accessInput === quiz.accessCode) {
              setAccessGranted(true);
              setAccessError("");
            } else {
              setAccessError("Incorrect access code.");
            }
          }}
        >
          Submit
        </Button>
      </div>
    );
  }

  if (!submitted && attemptsRemaining <= 0 && lastAttempt) {
    const prevAnswers: Record<string, any> = {};
    lastAttempt.answers?.forEach((a: any) => { prevAnswers[a.questionId] = a.answer; });

    return (
      <div className="p-4" style={{ maxWidth: "700px" }}>
        <h3>{quiz.title}</h3>
        <div className="alert alert-secondary">
          No attempts remaining. Score from last attempt: <strong>{lastAttempt.score}</strong>
        </div>
        {questions.map((q: any, idx: number) => {
          const ans = prevAnswers[q._id];
          const correct = isCorrect(q, ans);
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
              <p className="small text-muted mb-0">Your answer: <strong>{getAnswerDisplay(q, ans)}</strong></p>
            </div>
          );
        })}
        <Button variant="outline-secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  if (submitted && lastAttempt) {
    const prevAnswers: Record<string, any> = {};
    lastAttempt.answers?.forEach((a: any) => { prevAnswers[a.questionId] = a.answer; });
    const totalPts = questions.reduce((s, q) => s + q.points, 0);

    return (
      <div className="p-4" style={{ maxWidth: "700px" }}>
        <h3>{quiz.title}</h3>
        <div className="alert alert-success mb-3">
          Quiz submitted! Score: <strong>{lastAttempt.score} / {totalPts}</strong>
          {attemptsRemaining - 1 > 0 && (
            <span className="ms-3 text-muted small">
              {attemptsRemaining - 1} attempt(s) remaining
            </span>
          )}
        </div>
        {questions.map((q: any, idx: number) => {
          const ans = prevAnswers[q._id];
          const correct = isCorrect(q, ans);
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
              <p className="small text-muted mb-0">Your answer: <strong>{getAnswerDisplay(q, ans)}</strong></p>
            </div>
          );
        })}
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
            Back to Quizzes
          </Button>
          {attemptsRemaining - 1 > 0 && (
            <Button
              variant="danger"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setCurrentIndex(0);
              }}
            >
              Retake Quiz
            </Button>
          )}
        </div>
      </div>
    );
  }

  const oneAtATime = quiz.oneQuestionAtATime;
  const displayedQuestions = oneAtATime ? [questions[currentIndex]].filter(Boolean) : questions;

  const handleSubmit = async () => {
    const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    const attempt = await client.submitAttempt(qid as string, answersArray);
    setLastAttempt(attempt);
    setAttemptCount(attemptCount + 1);
    setSubmitted(true);
  };

  return (
    <div id="wd-quiz-take" className="p-3" style={{ maxWidth: "700px" }}>
      <h3>{quiz.title}</h3>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      {attemptsRemaining <= maxAttempts && (
        <div className="text-muted small mb-3">
          Attempt {attemptCount + 1} of {maxAttempts}
        </div>
      )}

      {displayedQuestions.map((q: any) => {
        const globalIdx = oneAtATime ? currentIndex : questions.indexOf(q);
        const isLocked = quiz.lockQuestionsAfterAnswering && answers[q._id] !== undefined;

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
                    disabled={isLocked}
                    checked={answers[q._id] === choice.text}
                    onChange={() => setAnswers({ ...answers, [q._id]: choice.text })}
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
                    disabled={isLocked}
                    checked={answers[q._id] === val}
                    onChange={() => setAnswers({ ...answers, [q._id]: val })}
                  />
                ))}
              </div>
            )}

            {q.type === "FILL_BLANK" && (
              <FormControl
                placeholder="Your answer"
                disabled={isLocked}
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
    </div>
  );
}
