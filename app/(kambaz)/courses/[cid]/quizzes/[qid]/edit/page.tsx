/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Button, Form, FormControl, FormSelect, Nav,
} from "react-bootstrap";
import { FaPlus, FaTrash, FaCheckCircle, FaBan } from "react-icons/fa";
import * as client from "../../client";
import { updateQuiz } from "../../reducer";

const DEFAULT_QUIZ = {
  title: "Unnamed Quiz",
  description: "",
  quizType: "GRADED_QUIZ",
  assignmentGroup: "QUIZZES",
  points: 0,
  shuffleAnswers: true,
  timeLimit: 20,
  multipleAttempts: false,
  howManyAttempts: 1,
  showCorrectAnswers: "IMMEDIATELY",
  accessCode: "",
  oneQuestionAtATime: true,
  webcamRequired: false,
  lockQuestionsAfterAnswering: false,
  dueDate: "",
  availableDate: "",
  untilDate: "",
  published: false,
};

function QuestionEditor({
  question,
  onSave,
  onCancel,
}: {
  question: any;
  onSave: (q: any) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<any>({ ...question });

  const addChoice = () => {
    setQ({ ...q, choices: [...(q.choices || []), { _id: crypto.randomUUID(), text: "", isCorrect: false }] });
  };

  const removeChoice = (id: string) => {
    setQ({ ...q, choices: q.choices.filter((c: any) => c._id !== id) });
  };

  const setCorrect = (id: string) => {
    setQ({ ...q, choices: q.choices.map((c: any) => ({ ...c, isCorrect: c._id === id })) });
  };

  return (
    <div className="border rounded p-3 mb-3 bg-light">
      <div className="d-flex gap-2 mb-3 align-items-center">
        <FormControl
          value={q.title}
          placeholder="Question Title"
          onChange={(e) => setQ({ ...q, title: e.target.value })}
          style={{ maxWidth: "200px" }}
        />
        <FormSelect
          value={q.type}
          onChange={(e) => setQ({ ...q, type: e.target.value })}
          style={{ maxWidth: "200px" }}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True / False</option>
          <option value="FILL_BLANK">Fill in the Blank</option>
        </FormSelect>
        <div className="ms-auto d-flex align-items-center gap-1">
          <span className="fw-bold">pts:</span>
          <FormControl
            type="number"
            min={0}
            value={q.points}
            onChange={(e) => setQ({ ...q, points: Number(e.target.value) })}
            style={{ width: "70px" }}
          />
        </div>
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Question</Form.Label>
        <FormControl
          as="textarea"
          rows={3}
          value={q.question}
          onChange={(e) => setQ({ ...q, question: e.target.value })}
        />
      </Form.Group>

      {q.type === "MULTIPLE_CHOICE" && (
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Answers</Form.Label>
          {(q.choices || []).map((choice: any) => (
            <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
              <Form.Check
                type="radio"
                name={`correct-${q._id}`}
                checked={!!choice.isCorrect}
                onChange={() => setCorrect(choice._id)}
                title="Mark as correct"
              />
              <FormControl
                value={choice.text}
                placeholder="Answer text"
                onChange={(e) =>
                  setQ({
                    ...q,
                    choices: q.choices.map((c: any) =>
                      c._id === choice._id ? { ...c, text: e.target.value } : c
                    ),
                  })
                }
              />
              <FaTrash
                className="text-secondary"
                role="button"
                onClick={() => removeChoice(choice._id)}
              />
            </div>
          ))}
          <Button variant="link" className="p-0 mt-1" onClick={addChoice}>
            <FaPlus className="me-1" /> Add Another Answer
          </Button>
        </Form.Group>
      )}

      {q.type === "TRUE_FALSE" && (
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Correct Answer</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="True"
              name={`tf-${q._id}`}
              checked={q.correctAnswer === "true"}
              onChange={() => setQ({ ...q, correctAnswer: "true" })}
            />
            <Form.Check
              type="radio"
              label="False"
              name={`tf-${q._id}`}
              checked={q.correctAnswer === "false"}
              onChange={() => setQ({ ...q, correctAnswer: "false" })}
            />
          </div>
        </Form.Group>
      )}

      {q.type === "FILL_BLANK" && (
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Possible Correct Answers</Form.Label>
          {(q.choices || []).map((choice: any) => (
            <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
              <FormControl
                value={choice.text}
                placeholder="Possible answer"
                onChange={(e) =>
                  setQ({
                    ...q,
                    choices: q.choices.map((c: any) =>
                      c._id === choice._id ? { ...c, text: e.target.value } : c
                    ),
                  })
                }
              />
              <FaTrash
                className="text-secondary"
                role="button"
                onClick={() => removeChoice(choice._id)}
              />
            </div>
          ))}
          <Button variant="link" className="p-0 mt-1" onClick={addChoice}>
            <FaPlus className="me-1" /> Add Another Answer
          </Button>
        </Form.Group>
      )}

      <div className="d-flex gap-2">
        <Button variant="outline-secondary" size="sm" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" size="sm" onClick={() => onSave(q)}>Update Question</Button>
      </div>
    </div>
  );
}

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({ ...DEFAULT_QUIZ });
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const data = await client.findQuizById(qid as string);
      if (data) setQuiz({ ...DEFAULT_QUIZ, ...data });
      const qs = await client.findQuestionsForQuiz(qid as string);
      setQuestions(qs);
    })();
  }, [qid]);

  const saveDetails = async (publish = false) => {
    const updated = await client.updateQuiz({ ...quiz, published: publish || quiz.published });
    dispatch(updateQuiz(updated));
    if (publish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${qid}`);
    }
  };

  const addNewQuestion = async () => {
    const newQ = await client.createQuestion(qid as string, {
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      question: "",
      points: 1,
      choices: [],
      correctAnswer: null,
    });
    setQuestions([...questions, newQ]);
    setEditingId(newQ._id);
  };

  const saveQuestion = async (q: any) => {
    const updated = await client.updateQuestion(q);
    setQuestions(questions.map((existing) => existing._id === q._id ? updated : existing));
    setEditingId(null);
    const refreshedQuiz = await client.findQuizById(qid as string);
    if (refreshedQuiz) setQuiz({ ...DEFAULT_QUIZ, ...refreshedQuiz });
  };

  const cancelQuestion = async (q: any) => {
    if (!q.question && !q.title) {
      await client.deleteQuestion(q._id);
      setQuestions(questions.filter((existing) => existing._id !== q._id));
    }
    setEditingId(null);
  };

  const removeQuestion = async (questionId: string) => {
    if (!confirm("Delete this question?")) return;
    await client.deleteQuestion(questionId);
    setQuestions(questions.filter((q) => q._id !== questionId));
    const refreshedQuiz = await client.findQuizById(qid as string);
    if (refreshedQuiz) setQuiz({ ...DEFAULT_QUIZ, ...refreshedQuiz });
  };

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-end mb-2 text-muted small gap-3">
        <span>Points {totalPoints}</span>
        <span>{quiz.published ? <><FaCheckCircle className="text-success me-1" />Published</> : <><FaBan className="text-danger me-1" />Not Published</>}</span>
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active={activeTab === "details"} onClick={() => setActiveTab("details")}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "questions"} onClick={() => setActiveTab("questions")}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "details" && (
        <Form style={{ maxWidth: "700px" }}>
          <Form.Group className="mb-3">
            <FormControl
              value={quiz.title}
              placeholder="Quiz Title"
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quiz Instructions</Form.Label>
            <FormControl
              as="textarea"
              rows={4}
              placeholder="Description / instructions"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </Form.Group>

          <div className="d-flex gap-3 mb-3 flex-wrap">
            <Form.Group style={{ flex: 1, minWidth: "200px" }}>
              <Form.Label>Quiz Type</Form.Label>
              <FormSelect value={quiz.quizType} onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </FormSelect>
            </Form.Group>
            <Form.Group style={{ flex: 1, minWidth: "200px" }}>
              <Form.Label>Assignment Group</Form.Label>
              <FormSelect value={quiz.assignmentGroup} onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECT">PROJECT</option>
              </FormSelect>
            </Form.Group>
          </div>

          <fieldset className="border rounded p-3 mb-3">
            <legend className="float-none w-auto px-2 fw-bold small">Options</legend>
            <Form.Check
              className="mb-2"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />
            <div className="d-flex align-items-center mb-2 gap-2">
              <Form.Check
                label="Time Limit"
                checked={quiz.timeLimit > 0}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })}
              />
              {quiz.timeLimit > 0 && (
                <>
                  <FormControl
                    type="number"
                    min={1}
                    value={quiz.timeLimit}
                    onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })}
                    style={{ width: "80px" }}
                  />
                  <span>Minutes</span>
                </>
              )}
            </div>
            <Form.Check
              className="mb-2"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
            />
            {quiz.multipleAttempts && (
              <div className="d-flex align-items-center gap-2 ms-4 mb-2">
                <Form.Label className="mb-0">How many attempts:</Form.Label>
                <FormControl
                  type="number"
                  min={1}
                  value={quiz.howManyAttempts}
                  onChange={(e) => setQuiz({ ...quiz, howManyAttempts: Number(e.target.value) })}
                  style={{ width: "80px" }}
                />
              </div>
            )}
          </fieldset>

          <Form.Group className="mb-3">
            <Form.Label>Show Correct Answers</Form.Label>
            <FormSelect value={quiz.showCorrectAnswers} onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}>
              <option value="IMMEDIATELY">Immediately</option>
              <option value="AFTER_DUE_DATE">After Due Date</option>
              <option value="NEVER">Never</option>
            </FormSelect>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Access Code</Form.Label>
            <FormControl
              value={quiz.accessCode}
              placeholder="Leave blank for no access code"
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
            />
          </Form.Group>

          <div className="d-flex gap-3 mb-3 flex-wrap">
            <Form.Check
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
            />
            <Form.Check
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
            />
            <Form.Check
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
            />
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <FormControl
              type="datetime-local"
              value={quiz.dueDate}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </Form.Group>
          <div className="d-flex gap-3 mb-3">
            <Form.Group style={{ flex: 1 }}>
              <Form.Label>Available From</Form.Label>
              <FormControl
                type="datetime-local"
                value={quiz.availableDate}
                onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group style={{ flex: 1 }}>
              <Form.Label>Until</Form.Label>
              <FormControl
                type="datetime-local"
                value={quiz.untilDate}
                onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
              />
            </Form.Group>
          </div>

          <hr />
          <div className="d-flex gap-2 justify-content-end">
            <Button variant="outline-secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
              Cancel
            </Button>
            <Button variant="outline-secondary" onClick={() => saveDetails(false)}>
              Save
            </Button>
            <Button variant="danger" onClick={() => saveDetails(true)}>
              Save & Publish
            </Button>
          </div>
        </Form>
      )}

      {activeTab === "questions" && (
        <div style={{ maxWidth: "700px" }}>
          <div className="d-flex justify-content-end mb-2 text-muted">
            Points {totalPoints}
          </div>

          {questions.map((q: any) =>
            editingId === q._id ? (
              <QuestionEditor
                key={q._id}
                question={q}
                onSave={saveQuestion}
                onCancel={() => cancelQuestion(q)}
              />
            ) : (
              <div key={q._id} className="border rounded p-3 mb-2 d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-bold">{q.title || "Untitled"}</div>
                  <div className="text-muted small">{q.type?.replace(/_/g, " ")} · {q.points} pts</div>
                  {q.question && <div className="small mt-1">{q.question}</div>}
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" size="sm" onClick={() => setEditingId(q._id)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => removeQuestion(q._id)}>
                    <FaTrash />
                  </Button>
                </div>
              </div>
            )
          )}

          <div className="d-flex justify-content-center my-3">
            <Button variant="outline-secondary" onClick={addNewQuestion}>
              <FaPlus className="me-1" /> New Question
            </Button>
          </div>

          <hr />
          <div className="d-flex gap-2 justify-content-end">
            <Button variant="outline-secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => saveDetails(false)}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
